import react from "eslint-plugin-react";
import globals from "globals";

export default [{
    plugins: {
        react,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
                experimentalObjectRestSpread: true,
            },
        },
    },

    rules: {
        "react/react-in-jsx-scope": "off",
        indent: ["error", 4],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        noEmpty: ["off", { "allowEmptyCatch": true }]
    },
},

{
    ignores: ["**/public/*"],
}
];