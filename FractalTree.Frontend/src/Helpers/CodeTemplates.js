
// Contains boilerplate for each language
export default {
    python: () => `print("${t("TEMPLATE_GREETING")}")`,
    javascript: () => `console.log("${t("TEMPLATE_GREETING")}");`,
    html: () => `<!-- html, body, and head tags are optional in Fractal Tree -->\n<h1>${t("TEMPLATE_GREETING")}</h1>`,
    jsx: () => `// Main() is always the root React component in Fractal Tree, don't remove it\nfunction Main() {\n    return (<h1>${t("TEMPLATE_GREETING")}</h1>);\n}`,
};