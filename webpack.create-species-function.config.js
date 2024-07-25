const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/create-species.entrypoint.ts',
    target: 'node',
    externals: [nodeExternals()],
    mode: 'production',
    optimization: {
        usedExports: true,
        minimize: true,
        sideEffects: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                    compress: {
                        drop_console: false, // Keep console.log statements
                    },
                    format: {
                        beautify: true, // Make the output readable
                        comments: true, // Keep comments in the output
                    },
                },
                extractComments: false, // Do not extract comments into a separate file
            })
        ]
    },
    module: {
        rules: [

            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: [/node_modules/],

            },

        ],

    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            'src': path.resolve(__dirname, 'src')
        },

    },
    output: {
        path: path.resolve(__dirname, 'dist', 'create-species-lambda',),
        filename: 'entrypoint.js',
        libraryTarget: 'commonjs2',
    },

};
