// Imports: Dependencies
// const path = require('path');
// require("babel-register");
// Webpack Configuration
const config = {

    // Entry
    entry: './clientapp/src/index.js',
    // Output
    // output: {
    //     path: path.resolve(__dirname, 'PATH TO SEND BUNDLED/TRANSPILED CODE'),
    //     filename: 'bundle.js',
    // },
    // Loaders
    module: {
        rules : [
            // JavaScript/JSX Files
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // CSS Files
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    // Plugins
    plugins: [],
    watch: true
};
// Exports
module.exports = config;