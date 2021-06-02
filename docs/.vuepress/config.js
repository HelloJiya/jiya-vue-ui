module.exports = {
  "title": "ICS-UI",
  "description": "A Component Library for Vue.js.",
  "port": "6001",
  "plugins": [
    "demo-container"
  ],
  "themeConfig": {
    "nav": [
      {
        "text": "主页",
        "link": "/"
      },
      {
        "text": "组件",
        "link": "/components/"
      }
    ],
    "sidebar": {
      "/components/": [
        {
          "title": "开发指南",
          "collapsable": false,
          "children": [
            "",
            "guide",
            "CHANGELOG"
          ]
        },
        {
          "title": "基础组件",
          "collapsable": false,
          "children": [
            "basic/demo",
            "basic/layout"
          ]
        }
      ]
    }
  }
}
