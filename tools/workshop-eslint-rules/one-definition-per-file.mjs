const declarationTypes = new Set([
    "ClassDeclaration",
    "FunctionDeclaration",
    "TSEnumDeclaration",
    "TSInterfaceDeclaration",
    "TSTypeAliasDeclaration",
    "TSDeclareFunction"
]);

function getDeclarations(statement) {
    if (statement.type === "ExportNamedDeclaration" || statement.type === "ExportDefaultDeclaration") {
        return statement.declaration ? getDeclarations(statement.declaration) : [];
    }

    if (statement.type === "VariableDeclaration") {
        return statement.declarations;
    }

    return declarationTypes.has(statement.type) ? [statement] : [];
}

export default {
    meta: {
        type: "problem",
        docs: {
            description: "enforce exactly one top-level definition per TypeScript file"
        },
        schema: [],
        messages: {
            multipleDefinitions: "A TypeScript file must contain exactly one top-level definition. Move each additional definition to its own file."
        }
    },
    create(context) {
        return {
            Program(node) {
                const declarations = node.body.flatMap(getDeclarations);

                if (declarations.length > 1) {
                    for (const declaration of declarations.slice(1)) {
                        context.report({
                            node: declaration,
                            messageId: "multipleDefinitions"
                        });
                    }
                }
            }
        };
    }
};
