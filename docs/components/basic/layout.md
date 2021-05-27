# Layout 布局

## 基础

::: demo
```html
<div id="app">
  <ics-layout
    :menus='menus'
    :header="{
      dropdownList:dropdownList,
      currentDropdownKey:dropdownKey,
    }"
    :sidebar="{
    }"
    @sidebarSelect='sidebarSelect'
    @dropdownClick='dropdownClick'
    @logout='logout'
  >
    <div class="container">container</div>
  </ics-layout>
</div>

<script>
export default {
  data () {
    return {
      dropdownKey: 1111,
      dropdownList: [{
        id: 1111,
        name: 'sfsfsdf'
      }, {
        id: 1122211,
        name: 'sfsfssfdfsf深深的df'
      }],
      defaultMenu: [],
      menus: [
        {
          path: '/ims/plan',
          code: 'Plan',
          icon: 'ddd',
          name: '计划管理',
          children: [{
            path: '/ims/plan/template',
            code: 'PlanTemplate',
            icon: 'ddd',
            name: '表模板管理'
          }, {
            path: '/ims/plan/arrange',
            code: 'PlaneArrange',
            icon: 'ddd',
            name: '计划安排'
          },
          {
            path: '/ims/plan/date',
            code: 'PlanDate',
            name: '计划日历',
            children: [
              {
                path: '/ims/plan/date',
                code: 'PlanDate01',
                name: '计划日历'
              }
            ]
          }
          ]
        },
        {
          path: '/ims/plan',
          code: 'Plan1',
          icon: 'ddd',
          name: '计划管理',
          children: [{
            path: '/ims/plan/template',
            code: 'PlanTemplate1',
            name: '表模板管理'
          }, {
            path: '/ims/plan/arrange',
            code: 'PlaneArrange1',
            name: '计划安排'
          },
          {
            path: '/ims/plan/date',
            code: 'PlanDate1',
            name: '计划日历'
          }
          ]
        },
        {
          path: '/ims/plan',
          code: 'Plan2',
          icon: 'ddd',
          name: '计划管理',
          children: [{
            path: '/ims/plan/template',
            code: 'PlanTemplate2',
            name: '表模板管理'
          }, {
            path: '/ims/plan/arrange',
            code: 'PlaneArrange2',
            name: '计划安排'
          }
          ]
        }
      ]
    }
  },
  mounted () {
    console.log(this)
    setTimeout(() => {
      this.defaultMenu = this.menus
    }, 10000)
  },
  methods: {
    dropdownClick (item) {
      console.log(item)
      this.dropdownKey = item.id
    },
    sidebarSelect (key) {
      console.log('sidebarSelect', key)
    },
    logout () {
      console.log('logout')
    }
  }
}
</script>
```
:::


## API

### Layout Attributes
| 参数      | 说明          | 类型      | 可选值         | 默认值  |
|---------- |-------------- |---------- |-----------  |-------- |
| showSidebar | 是否展示菜单栏 | boolean | — | true |
| menus | 菜单数据，[MenusConfig](#Menus)| array | — | [] |
| header | 头部导航栏配置，[HeaderConfig](#Header) | object | — | - |
| sidebar | element的[Menu](https://element.eleme.cn/#/zh-CN/component/menu#menu-attribute)  | object | — | - |

### Layout Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
|sidebarSelect |侧边栏菜单点击事件 |path |
|dropdownClick |下拉列表点击事件 |{name,id} |
|logout |退出点击事件 |— |


### Layout Methods
| 方法      | 说明          | 参数      | 
|---------- |-------------- |---------- |
| addTagView | 添加一个tagView | route | 
| delTagView | 删除一个tagView | route |


### <span id="Menus"> Menus </span>
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
|code |唯一标识 |string |——  |—— |
|name |菜单名称 |string |——  |—— |
|children |子菜单集合 |array |——  |—— |
|path |跳转路径 |string |——  |—— |
|icon |图标 |string |——  |—— |

### <span id="Header"> Header </span>
| 参数      | 说明          | 类型      | 可选值     | 默认值  |
|---------- |-------- |---------- |---------- |-------- |
| dropdownList | 头像下拉列表配置 | [dropdownList](#dropdownList) | — | [] |
| currentDropdownKey | 头像下拉列表中当前选中Key | [String, Number] | — | — |
| dropdownClick | 下拉列表点击事件 |({id,name})=>void | — | — |

###  <span id="dropdownList">dropdownList</span>
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
|id |唯一标识key |[String, Number] |——  |—— |
|name |显示名称 |string |——  |—— |

