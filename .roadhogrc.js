export default {
  entry: "src/index.js",
  theme: "./src/themes/default.js",
  hash: true,
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        "transform-runtime",
        ["import", {"libraryName": "antd", "style": true}]
      ]
    },
    production: {
      extraBabelPlugins: [
        "transform-runtime",
        ["import", {"libraryName": "antd", "style": true}]
      ]
    }
  },
  proxy: {
    "/api": {
      target: "http://test10.jy365.net/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/api"
      },
      secure: false
    },
    "/lessionnew": {
      target: "http://test10.jy365.net/",
      changeOrigin: true,
      pathRewrite: {
        "^/lessionnew": "/lessionnew"
      },
      secure: false
    }
  }
}
