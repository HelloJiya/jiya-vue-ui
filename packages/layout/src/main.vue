<template>
    <div class="ics-layout">
      <slot name='header'>
        <IcsLayoutHeader
          ref="icsLayoutHeader"
          v-bind="header"
          v-on='$listeners'
          :menus="menus"
        />
      </slot>
      <div class="ics-layout-main">
        <el-scrollbar class="ics-layout-sidebar-scrollbar">
          <IcsSidebar class="ics-layout-sidebar" v-show="showSidebar" :menus='sideMenu'  v-bind='sidebar' v-on='$listeners' />
        </el-scrollbar>
        <div class="ics-layout-content">
          <TagView ref="tagView"  :data='visitedViews' @closeSelectedTag='delTagView'/>
          <section class="ics-layout-content__main">
            <slot></slot>
          </section>
        </div>
      </div>
    </div>
</template>

<script>
import IcsLayoutHeader from './Header'
import IcsSidebar from './Sidebar.js'
import TagView from './TagView'

export default {
  name: 'IcsLayout',
  components: { IcsSidebar, IcsLayoutHeader, TagView },
  props: {
    menus: {
      type: Array,
      default: () => []
    },
    header: Object,
    sidebar: Object,
    showSidebar: { type: Boolean, default: true }
  },
  data () {
    return {
      isMounted: false,
      visitedViews: []
    }
  },
  computed: {
    sideMenu () {
      if (this.isMounted) {
        return this.$refs.icsLayoutHeader.getSubMenu()
      }
      return []
    }
  },
  watch: {
    $route (nv) {
      this.addTagView(nv)
    }
  },
  created () {
    this.addTagView(this.$router)
  },
  mounted () {
    this.isMounted = true
  },
  methods: {
    sidebarSelect (key) {
      // this.$emit('sidebarSelect', key)
    },
    isActive (route) {
      return route.path === this.$route.path
    },
    addTagView (route) {
      const { name, path, meta } = route
      if (!name || this.visitedViews.some(v => v.path === path)) return
      this.visitedViews.push(
        Object.assign({}, route, {
          title: meta.title || 'no-name'
        })
      )
    },
    async delTagView (view) {
      // meta.confirm = true tagView开启关闭前的弹窗校验
      if (view.meta.confirm) {
        const isTrue = await this.$confirm('内容未保存，是否离开页面')
        if (!isTrue) {
          return false
        }
      }
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1)
          break
        }
      }
      if (this.isActive(view)) {
        this.toLastView(this.visitedViews, view)
      }
    },
    toLastView (visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>
