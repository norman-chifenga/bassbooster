const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack');
const path = require('path')

module.exports = {
    entry: { 
        script: path.resolve(__dirname, '../src/main.js')},

    output:
    {   
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),        
        clean: true,//no more old files
    },
    optimization: {
        minimize: true
    },
    // devtool: 'source-map',
    plugins:
    [ 
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../src/assets/icons'),    
                to: 'assets/icons'
                }
            ]
        }),
        new webpack.ProvidePlugin({
            $: require.resolve('jquery'),
            jQuery: require.resolve('jquery'),            
            'window.jQuery': 'jquery'
        }),
        new HtmlWebpackPlugin({  
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.html'),          
            minify: true
        }),
        new MiniCSSExtractPlugin()
    ],
    module:
    {
        rules:
        [
            // HTML
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                ['babel-loader']
            },

            // CSS
            {
                test: /\.css$/,
                use:
                [
                    MiniCSSExtractPlugin.loader,'css-loader', 
                    
                ]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: './assets/image/[name][ext]',
                },
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {   name:'name.[hash:8].[ext]',
                            name:'assets/fonts/[name].[hash:8].[ext]',
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            },

            // Shaders
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                use: [
                    'raw-loader',
                    'glslify-loader',
                ]
            }
        ]
    }
}
