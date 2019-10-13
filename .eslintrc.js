module.exports = {
	extends: [
		"airbnb",
		"plugin:@typescript-eslint/recommended",
		"prettier/@typescript-eslint",
		"plugin:react/recommended",
		"plugin:prettier/recommended",
		"plugin:jsx-a11y/recommended",
		"prettier",
		"prettier/react"
	],
	plugins: [
		"@typescript-eslint",
		"react",
		"prettier",
		"jsx-a11y"
	],
	rules:{
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
		"prettier/prettier": [
			"error",
			{
				tabWidth: 4,
				useTabs: true
			}
		]
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		sourceType: "module",
		ecmaFeatures: {
			jsx: true
		},
		project: "./tsconfig.dev.json"
	},
	globals: {
		document: true
	},
	settings: {
		react: {
			createClass: "createReactClass", // Regex for Component Factory to use,
												// default to "createReactClass"
			pragma: "React",  // Pragma to use, default to "React"
			version: "detect", // React version. "detect" automatically picks the version you have installed.
								// You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
								// default to latest and warns if missing
								// It will default to "detect" in the future
			flowVersion: "0.53" // Flow version
		},
		"import/resolver": {
			node:{},
			webpack: {
				config: "webpack.config.dev.ts"
			}
		},
		propWrapperFunctions: [
			// The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
			"forbidExtraProps",
			{property: "freeze", object: "Object"},
			{property: "myFavoriteWrapper"}
		],
		linkComponents: [
			// Components used as alternatives to <a> for linking, eg. <Link to={ url } />
			"Hyperlink",
			{name: "Link", linkAttribute: "to"}
		]
	}
}