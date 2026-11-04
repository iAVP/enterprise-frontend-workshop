function hasJsDoc(context, node) {
    return context.sourceCode.getJSDocComment(node) !== null;
}

export default {
    meta: {
        type: "problem",
        docs: {
            description: "require JSDoc for declarations and members in configuration constants"
        },
        schema: [],
        messages: {
            missingJsDoc: "Add a JSDoc comment describing this declaration or member."
        }
    },
    create(context) {
        function check(node) {
            if (!hasJsDoc(context, node)) {
                context.report({
                    node,
                    messageId: "missingJsDoc"
                });
            }
        }

        return {
            TSInterfaceDeclaration: check,
            TSTypeAliasDeclaration: check,
            TSPropertySignature: check,
            TSMethodSignature: check,
            TSIndexSignature: check,
            VariableDeclaration(node) {
                if (node.kind === "const") {
                    check(node);
                }
            },
            Property(node) {
                if (node.parent.type === "ObjectExpression") {
                    check(node);
                }
            }
        };
    }
};
