import * as path from "path";
import * as webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

const ASSET_PATH = process.env.ASSET_PATH || "/";

const config: webpack.Configuration = {
	mode: "development",
	entry: "./src/client/index.tsx",
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				enforce: "pre",
				loader: "eslint-loader",
				test: /\.tsx?$/,
				exclude: [/node_modules/],
				options: {
					emitErrors: true
				}
			},
			{
				loader: "ts-loader",
				test: /\.tsx?$/,
				exclude: [/node_modules/],
				options: {
					configFile: "tsconfig.dev.json"
				}
			}
		]
	},
	devServer: {
		historyApiFallback:{
			disableDotRule: true
		},
		inline: true,
		open: true,
		host: "localhost",
		port: 8080,
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				//pathRewrite: {'^/api' : ''},
				secure: false,
				logLevel: "debug"
			}
		}
	},
	resolve: {
		modules: ["node_modules", "src"],
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
	},
	output: {
		publicPath: ASSET_PATH,
		filename: "static/js/bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.ASSET_PATH": JSON.stringify(ASSET_PATH)
		}),
		new HtmlWebpackPlugin({
			template: "./src/client/index.html",
			filename: "./index.html"
		})
	]
};

export default config;