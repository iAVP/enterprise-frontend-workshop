export default {
    meta: {
        type: "layout",
        docs: {
            description: "require arrow functions to fit on a single line"
        },
        schema: [],
        messages: {
            singleLine: "Arrow functions must be written on a single line."
        }
    },
    create(context) {
        return {
            ArrowFunctionExpression(node) {
                if (node.loc.start.line !== node.loc.end.line) {
                    context.report({
                        node,
                        messageId: "singleLine"
                    });
                }
            }
        };
    }
};
