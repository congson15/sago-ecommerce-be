const { override, fixBabelImports, addPostcssPlugins } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addPostcssPlugins([require('tailwindcss')])
)