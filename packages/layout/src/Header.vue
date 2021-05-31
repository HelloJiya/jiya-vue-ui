<template>
  <div class="ics-layout-header">
    <div class="ics-layout-header__left">
      <img src="http://file.sh-cec.com/cec-file/cec/drawingBed/2021/4/19/1618829406725_90c06069f1bb4d9b91f9274ef99e7268.png"  class="ics-layout-header__left-logo" >
      <div class="ics-layout-header__left-menu">
        <span
          v-for="item in menus"
          :key="item.code"
          class="ics-layout-header__left-menu-item"
          :class="[curMenu===item.code && 'is-active']"
          @click="handleMenuItem(item)">
            {{ item.name }}
          </span>
      </div>
    </div>
    <div class="ics-layout-header__right">
      <div class="ics-layout-header__right-show">
        <span class="ics-layout-header__right-show-item" >
          <iframe
            width="146"
            scrolling="no"
            height="60"
            frameborder="0"
            allowtransparency="true"
            src="https://i.tianqi.com?c=code&id=160&color=%23FFFFFF&icon=1&site=12&padding=0"
          />
        </span>
        <div class="ics-layout-header__right-show-item">
          <span style="display: flex; justify-content: space-between; font-size: 14px">
            {{ time.format('HH:mm:ss') }}
            <span>星期{{ dayList[time.format('e')] }}</span>
          </span>
          <span style="font-size: 20px">
            {{ time.format('yyyy-MM-DD') }}
          </span>
        </div>
      </div>
      <el-dropdown class="ics-layout-header__right-avatar avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="http://file.sh-cec.com/cec-file/cec/drawingBed/2021/4/25/1619330195163_b799aff3cc314502bec60c525252b618.png" class="user-avatar">
          <i class="el-icon-caret-bottom"  />
        </div>
        <el-dropdown-menu slot="dropdown" class="ics-layout-header-avatar-dropdown">
          <el-dropdown-item
            v-for="item in dropdownList"
            :key="item.id"
            @click.native.prevent="$emit('dropdownClick', item)"
          >
            <div style="display: flex;align-items: center;justify-content: space-between;" >
              <span>{{ item.name }}</span>
              <i v-show="currentDropdownKey == item.id" class="el-icon-check" style="color:#3265DE" />
            </div>
          </el-dropdown-item>
          <el-dropdown-item @click.native.prevent="$emit('logout')">
            <span style="display: block">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

const LocalStorageKey = 'icsTopMenuCur'
export default {
  name: 'IcsLayoutHeader',
  props: {
    menus: {
      type: Array,
      default: () => []
    },
    dropdownList: {
      type: Array,
      default: () => []
    },
    currentDropdownKey: [String, Number]
  },
  data () {
    return {
      time: moment(new Date()),
      timer: null,
      dayList: ['日', '一', '二', '三', '四', '五', '六'],
      curMenu: ''
    }
  },
  watch: {
    menus: {
      handler () {
        // 设置默认选中菜单
        this.setDefaultMenu()
      },
      immediate: true
    }
  },
  methods: {
    handleMenuItem (item) {
      this.curMenu = item.code
      localStorage.setItem(LocalStorageKey, JSON.stringify(item))
    },

    getSubMenu () {
      const retArr = this.menus.find(item => item.code === this.curMenu)
      return retArr?.children || []
    },

    setDefaultMenu () {
      if (this.menus && this.menus.length) {
        const codes = this.menus.map(item => item.code)
        const topMenuCur = localStorage.getItem(LocalStorageKey)

        if (topMenuCur) {
          const curMenuObj = JSON.parse(topMenuCur)
          if (codes.indexOf(curMenuObj.code) > -1) {
            this.curMenu = curMenuObj.code
          } else {
            this.curMenu = codes[0]
          }
        } else {
          this.curMenu = codes[0]
        }
      }
    }
  }

}
</script>
