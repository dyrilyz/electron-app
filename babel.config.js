module.exports = {
  "presets": [
    "@babel/preset-flow",
    "@vue/cli-plugin-babel/preset"
  ],
  "plugins": [
    "@babel/plugin-proposal-export-default-from",
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
  ]
}