const path = require("path");

module.exports = {
	mode: process.env.NODE_ENV ?? "development",
	entry: "./src/entryPoint.tsx",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: "ts-loader",
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "bundle.js",
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"], // Add this line to resolve file extensions
	},
};
