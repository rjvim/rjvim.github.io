module.exports = function (context, options) {
  return {
    name: 'postcss-tailwindcss-loader',
    // https://github.com/facebook/docusaurus/issues/2961
    configurePostCss(postcssOptions) {
      postcssOptions.plugins.push(require('tailwindcss'));
      postcssOptions.plugins.push(require('autoprefixer'));
      return postcssOptions;
    },
  };
};
