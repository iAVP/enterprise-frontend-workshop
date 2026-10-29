import nx from "@nx/eslint-plugin";

export default [
    ...nx.configs["flat/base"],
    ...nx.configs["flat/typescript"],
    ...nx.configs["flat/javascript"],
    {      "ignores": [
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
                                "tag:base"
                            ]
                        },
                        {
                            sourceTag: "tag:facades",
                            onlyDependOnLibsWithTags: [
                                "tag:dal",
                                "tag:base",
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
        // Override or add rules here
        rules: {}
    }
];
