const {
    addDecoratorsLegacy,
    override,
    disableEsLint,
    addBabelPlugins,
    addBabelPresets,
    fixBabelImports,
    addLessLoader,
} = require("customize-cra");

module.exports = {
    webpack: override(
        addDecoratorsLegacy(),
        disableEsLint(),
        ...addBabelPlugins(
            "babel-plugin-styled-components"
        ),
        fixBabelImports("react-app-rewire-mobx", {
            libraryDirectory: "",
            camel2DashComponentName: false
        }),
    )
};