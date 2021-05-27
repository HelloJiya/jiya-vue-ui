import { Menu, MenuItem, Submenu } from 'element-ui'
export default {
  name: 'IcsSidebar',
  data () {
    return { }
  },
  props: {
    menus: {
      type: Array,
      default: () => []
    }
  },
  render: function (h) {
    // 图标渲染
    const renderIcon = (menu) => menu.icon && h(
      'i',
      {
        class: `${menu.icon}`,
        style: {
          fontWeight: 'bold',
          fontSize: '16px',
          width: '16px',
          display: 'inline-block',
          marginRight: '9px',
          height: '16px'
        }
      }
    )

    function itemRender (menus) {
      return menus.map(menu => {
        if (menu.children && menu.children.length) {
          return h(Submenu, {
            props: {
              index: menu.path,
              ...menu.props
            }
          }, [
            h(
              'template',
              {
                slot: 'title'
              }, [
                renderIcon(menu),
                h(
                  'span', {}, menu.name
                )

              ]
            ),
            ...itemRender(menu.children)
          ])
        } else {
          return h(MenuItem, {
            props: { index: menu.path }
          }, [renderIcon(menu), menu.name])
        }
      })
    }

    return h(
      'div', [
        h(
          Menu, {
            props: {
              mode: 'vertical',
              ...this.$attrs
            },
            on: {
              select: this.selectMenu
            },
            style: {
              border: 'none'
            }
          },
          itemRender(this.menus)
        )
      ]
    )
  },
  computed: {
    activeMenu () {
      if (this.defaultActive) {
        return this.defaultActive
      }
      const { path } = this.$route
      return path
    }
  },
  methods: {
    selectMenu (key) {
      this.$emit('sidebarSelect', key)
      if (this.$route.path === key) {
        return
      }
      this.$router.push(key)
    }
  }
}
