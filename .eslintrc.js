module.exports = {
  "extends": "react-app",
  "settings": {
    "import/resolver": {
      "alias": {
        "map": [
          ["app", "./src/js"],
          ["assets", "./src/assets"],
        ],
        extensions: ['*', '.web.js', '.js', '.json', '.jsx']
      }
    }
  },
  "rules": {
    "strict": "off"
  }
}
