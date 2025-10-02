// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      // Disable some strict Vue rules for development
      "@typescript-eslint/no-explicit-any": "off",
      "vue/html-self-closing": "off",
      "vue/attributes-order": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/multiline-html-element-content-newline": "off",
    },
  }
);
