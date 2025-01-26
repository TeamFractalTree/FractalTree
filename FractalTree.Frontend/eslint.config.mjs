import react from "eslint-plugin-react";
import globals from "globals";


export default [
    react.configs.flat.recommended,
    react.configs.flat["jsx-runtime"],

    {
        files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
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
            indent: ["error", 4],
            quotes: ["error", "double"],
            semi: ["error", "always"],
            "no-empty": ["off", { "allowEmptyCatch": true }],
            "no-undef": ["off"],
            "react/prop-types": 0,
            "react/no-children-prop": 0
        },
    },
    {
        ignores: ["public/*"],
    }
];