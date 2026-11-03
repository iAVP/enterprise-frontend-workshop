import nx from "@nx/eslint-plugin";
import oneDefinitionPerFile from "./tools/eslint-rules/one-definition-per-file.mjs";
import singleLineArrowFunction from "./tools/eslint-rules/single-line-arrow-function.mjs";
import noMagicStrings from "./tools/eslint-rules/no-magic-strings.mjs";

export default [
    ...nx.configs["flat/base"],
    ...nx.configs["flat/typescript"],
    ...nx.configs["flat/javascript"],
    {
      "ignores": [
        "**/dist",
        "**/out-tsc",
        "**/vitest.config.*.timestamp*"
      ]
    },
    {
        files: [
            "**/*.ts",
            "**/*.tsx",
            "**/*.js",
            "**/*.jsx"
        ],
        rules: {
            "@nx/enforce-module-boundaries": [
                "error",
                {
                    enforceBuildableLibDependency: true,
                    allow: [
                        "^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$"
                    ],
                    depConstraints: [
                        {
                            sourceTag: "level:app",
                            onlyDependOnLibsWithTags: [
                                "tag:facades",
                                "tag:definitions",
                                "tag:base",
                                "tag:ui",
                                "level:mock",
                                "level:personal-finance-pages"
                            ]
                        },
                        {
                            sourceTag: "tag:facades",
                            onlyDependOnLibsWithTags: [
                                "tag:dal",
                                "tag:base",
                                "level:mock",
                                "tag:definitions"
                            ]
                        },{
                            sourceTag: "level:mock",
                            onlyDependOnLibsWithTags: [
                                "tag:dal",
                                "tag:base",
                                "tag:definitions"
                            ]
                        },
                        {
                            sourceTag: "tag:ui",
                            onlyDependOnLibsWithTags: [
                                "tag:facades",
                                "tag:base",
                                "level:mock",
                                "tag:definitions"
                            ]
                        },
                        {
                            sourceTag: "tag:definitions",
                            onlyDependOnLibsWithTags: [
                                "tag:base"
                            ]
                        },
                        {
                            sourceTag: "tag:dal",
                            onlyDependOnLibsWithTags: [
                                "tag:base",
                                "tag:definitions"
                            ]
                        },
                        {
                            sourceTag: "tag:base",
                            onlyDependOnLibsWithTags: []
                        },
                        {
                            sourceTag: "level:personal-finance-pages",
                            onlyDependOnLibsWithTags: [
                                "tag:ui",
                                "tag:facades",
                                "tag:base",
                                "level:mock",
                                "tag:definitions"
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        files: [
            "**/*.ts",
            "**/*.tsx",
            "**/*.cts",
            "**/*.mts",
            "**/*.js",
            "**/*.jsx",
            "**/*.cjs",
            "**/*.mjs"
        ],
        plugins: {
            workshop: {
                rules: {
                    "one-definition-per-file": oneDefinitionPerFile,
                    "single-line-arrow-function": singleLineArrowFunction,
                    "no-magic-strings": noMagicStrings
                }
            }
        },
        rules: {
            "no-var": "error",
            "prefer-const": [
                "error",
                {
                    destructuring: "all"
                }
            ],
            "curly": [
                "error",
                "all"
            ],
            "complexity": [
                "error",
                12
            ],
            "max-lines": [
                "error",
                {
                    max: 400,
                    skipBlankLines: true,
                    skipComments: true
                }
            ]
        }
    },
    {
        files: [
            "apps/**/src/**/*.{ts,tsx,js,jsx}",
            "libs/**/src/**/*.{ts,tsx,js,jsx}",
            "common/**/*.{ts,tsx,js,jsx}"
        ],
        rules: {
            "@typescript-eslint/no-magic-numbers": [
                "error",
                {
                    ignore: [-1, 0, 1],
                    ignoreArrayIndexes: true,
                    ignoreDefaultValues: true,
                    ignoreClassFieldInitialValues: true,
                    ignoreEnums: true,
                    ignoreNumericLiteralTypes: true,
                    enforceConst: true
                }
            ],
            "workshop/no-magic-strings": "error"
        }
    },
    {
        files: [
            "**/*.ts",
            "**/*.tsx",
            "**/*.cts",
            "**/*.mts"
        ],
        rules: {
            "@typescript-eslint/no-explicit-any": "error",
            "workshop/one-definition-per-file": "error"
        }
    },
    {
        files: [
            "apps/**/src/**/*.{ts,tsx,js,jsx}",
            "libs/**/src/**/*.{ts,tsx,js,jsx}",
            "common/**/*.{ts,tsx,js,jsx}"
        ],
        rules: {
            "workshop/single-line-arrow-function": "error"
        }
    },
    {
        files: [
            "libs/shared/definitions/src/lib/constants/constants.ts"
        ],
        rules: {
            "@typescript-eslint/no-magic-numbers": "off",
            "workshop/no-magic-strings": "off"
        }
    }
];
