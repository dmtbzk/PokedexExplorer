module.exports = {
  "env": {
    "browser": true,
    "es2021" : true,
    "node"   : true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-essential"
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType" : "module"
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    "indent": [1, 2, {
      "SwitchCase": 1
    }],
    "key-spacing": [1, {
      "align": {}
    }],
    "linebreak-style"      : 0,
    "vue/html-self-closing": [1, {
      "html": { 
        "void"     : "always",
        "normal"   : "always",
        "component": "always"
      },
      "svg" : "always",
      "math": "always"
    }],
    "vue/html-indent": ["error", 4, {
      "attribute"                : 1,
      "closeBracket"             : 0,
      "alignAttributesVertically": true,
      "ignores"                  : []
    }],
    "quotes"                                     : ["error", "double"],
    "semi"                                       : ["error", "always"],
    "vue/order-in-components"                    : 0,
    "vue/attributes-order"                       : 0,
    "no-multiple-empty-lines"                    : ["error", { "max": 1, "maxEOF": 0 }],
    "vue/singleline-html-element-content-newline": ["error", {
      "ignoreWhenNoAttributes": false,
      "ignoreWhenEmpty"       : true,
    }],
  }
};
