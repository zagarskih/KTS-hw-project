import { fileURLToPath } from 'url';
import webpack from 'webpack';
import path from 'path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = path.resolve(__dirname, 'src');
const entryPath = path.join(srcPath, 'main.tsx');
const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd ? '[name]__[local]__[hash:base64:5]' : '[hash:base64]',
              namedExport: false,
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ];
};

export default {
  entry: entryPath,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProd ? 'bundle.[contenthash].js' : 'bundle.js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
    alias: {
      components: path.join(srcPath, 'components'),
      config: path.join(srcPath, 'config'),
      styles: path.join(srcPath, 'styles'),
      assets: path.join(srcPath, 'assets'),
      api: path.join(srcPath, 'api'),
      hooks: path.join(srcPath, 'hooks'),
      helpers: path.join(srcPath, 'helpers'),
      stores: path.join(srcPath, 'stores'),
      utils: path.join(srcPath, 'utils'),
      routes: path.join(srcPath, 'routes'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  mode: isProd ? 'production' : 'development',
  target: isProd ? 'browserslist' : 'web',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      favicon: path.resolve(srcPath, 'assets/icons/favicon.svg'),
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, 'tsconfig.app.json'),
      },
      async: !isProd,
    }),
    isProd &&
      new MiniCssExtractPlugin({
        filename: isProd ? '[name].[contenthash].css' : '[name].css',
      }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ].filter(Boolean),
  optimization: {
    minimize: isProd,
  },
};
