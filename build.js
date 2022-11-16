const path = require("path")
const fs = require("fs")

const rootDir = path.resolve(__dirname)
const commonConfig = {
  mode: "production",
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      root: "react-dom",
    },
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["css-loader"],
      }
    ]
  }
}

const componentDir = "src/components"
const componentNames = fs
  .readdirSync(path.resolve(componentDir), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)
const componentMap = componentNames.reduce((prev, name) => {
  prev[name] = `./${componentDir}/${name}/index.jsx`
  return prev
}, {})

const componentConfig = {
  ...commonConfig,
  entry: {
    ...componentMap,
  },
  output: {
    path: path.resolve(rootDir, "lib"),
    filename: "[name]/index.js",
    library: {
      type: "commonjs2"
    }
  }
}

module.exports = [componentConfig]