#!/usr/bin/env node

import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const root = process.cwd();
const themeFile = 'common/styles/themes.scss';
const scanRoots = ['apps', 'libs', 'common'];
const namedColors = new Set([
	'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black',
	'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse',
	'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue',
	'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgrey', 'darkgreen', 'darkkhaki', 'darkmagenta',
	'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen',
	'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink',
	'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen',
	'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'grey', 'green', 'greenyellow',
	'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush',
	'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow',
	'lightgray', 'lightgrey', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen',
	'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime',
	'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid',
	'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise',
	'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite',
	'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod',
	'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink',
	'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue',
	'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue',
	'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal',
	'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow',
	'yellowgreen', 'transparent', 'currentcolor'
]);

const violations = [];

async function collectScss(directory) {
	let entries;

	try {
		entries = await readdir(directory, { withFileTypes: true });
	} catch {
		return [];
	}

	const files = [];

	for (const entry of entries) {
		const path = join(directory, entry.name);

		if (entry.isDirectory()) {
			if (['node_modules', 'dist', '.git'].includes(entry.name)) {
				continue;
			}

			files.push(...await collectScss(path));
		} else if (entry.isFile() && path.endsWith('.scss')) {
			files.push(path);
		}
	}

	return files;
}

const hexPattern = /#[0-9a-f]{3,8}\b/gi;
const colorFunctionPattern = /\b(?:rgb|rgba|hsl|hls|hsla|hlsa|hwb|lab|lch|oklab|oklch|color|color-mix)\s*\(/gi;
const colorWordPattern = new RegExp(`\\b(?:${[...namedColors].join('|')})\\b`, 'gi');

for (const scanRoot of scanRoots) {
	const files = await collectScss(join(root, scanRoot));

	for (const file of files) {
		const relativePath = relative(root, file).split(sep).join('/');

		if (relativePath === themeFile) {
			continue;
		}

		const source = (await readFile(file, 'utf8')).replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
		const checks = [
			{ pattern: hexPattern, label: 'HEX color literal' },
			{ pattern: colorFunctionPattern, label: 'direct color function' },
			{ pattern: colorWordPattern, label: 'named color literal' }
		];

		for (const check of checks) {
			for (const match of source.matchAll(check.pattern)) {
				const line = source.slice(0, match.index).split(/\n/).length;
				violations.push(`${relativePath}:${line}: ${check.label} "${match[0]}" — use a color token instead`);
			}
			check.pattern.lastIndex = 0;
		}
	}
}

if (violations.length) {
	console.error('SCSS color-token lint failed:');
console.error(violations.join('\n'));
	process.exit(1);
}

console.log('SCSS color-token lint passed. Direct color literals are restricted to common/styles/themes.scss.');
