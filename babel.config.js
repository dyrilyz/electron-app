module.exports = {
  "presets": [
    "@babel/preset-flow",
    "@vue/cli-plugin-babel/preset"
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    "@babel/plugin-proposal-export-default-from",
  ]
}