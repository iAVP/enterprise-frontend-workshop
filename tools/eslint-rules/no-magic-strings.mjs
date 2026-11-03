const testTitleMethods = new Set(["describe", "it", "test", "context", "suite"]);

function isModuleSpecifier(node) {
    return (
        (node.parent.type === "ImportDeclaration" ||
            node.parent.type === "ExportNamedDeclaration" ||
            node.parent.type === "ExportAllDeclaration") &&
        node.parent.source === node
    );
}

function isPropertyKey(node) {
    return (
        (node.parent.type === "Property" ||
            node.parent.type === "PropertyDefinition" ||
            node.parent.type === "MethodDefinition") &&
        node.parent.key === node
    );
}

function isDecoratorMetadata(node) {
    let current = node;

    while (current.parent) {
        if (current.parent.type === "Decorator") {
            return true;
        }

        if (
            current.parent.type === "Program" ||
            current.parent.type === "FunctionDeclaration" ||
            current.parent.type === "FunctionExpression" ||
            current.parent.type === "ArrowFunctionExpression"
        ) {
            return false;
        }

        current = current.parent;
    }

    return false;
}

function isTestTitle(node) {
    const call = node.parent;

    return (
        call.type === "CallExpression" &&
        call.arguments[0] === node &&
        call.callee.type === "Identifier" &&
        testTitleMethods.has(call.callee.name)
    );
}

function isTypeLiteral(node) {
    return node.parent.type === "TSLiteralType";
}

function isDirective(node) {
    return (
        node.parent.type === "ExpressionStatement" &&
        node.parent.expression === node &&
        node.parent.directive !== undefined
    );
}

export default {
    meta: {
        type: "problem",
        docs: {
            description: "require runtime string values to be declared as shared constants"
        },
        schema: [],
        messages: {
            noMagicString: "Do not use a magic string. Declare it in the shared definitions constants."
        }
    },
    create(context) {
        function checkString(node) {
            if (
                isModuleSpecifier(node) ||
                isPropertyKey(node) ||
                isDecoratorMetadata(node) ||
                isTestTitle(node) ||
                isTypeLiteral(node) ||
                isDirective(node)
            ) {
                return;
            }

            context.report({
                node,
                messageId: "noMagicString"
            });
        }

        return {
            Literal(node) {
                if (typeof node.value === "string") {
                    checkString(node);
                }
            },
            TemplateLiteral(node) {
                if (node.expressions.length === 0) {
                    checkString(node);
                }
            }
        };
    }
};
