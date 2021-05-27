<template>
    <div ref='searchForm' class="ics-search-form" >
      <!-- search -->
      <el-form ref="icsSearchForm" :model="$attrs.value"  v-bind="{ ...$attrs, ...searchFormBind }" class="ics-search-form__wrap">
        <el-form-item
          class="ics-search-form__item"
          v-show="(index < maxNum) || isShow"
          v-for="(item,index) in config"
          :key="index"
          :style='style'
          v-bind="item"
        >
          <component
           :is='getItemEl(item.valueType)'
           v-model="$attrs.value[item.prop]"
           :options='item.options'
           :size='searchFormBind.size'
           v-bind="item.searchProps"
           v-on='item.searchProps && item.searchProps.on'
           placeholder='请输入'
          >
          </component>
        </el-form-item>
      </el-form>

      <!-- button -->
      <el-form class="ics-search-form__action" :size="searchFormBind.size">
        <el-form-item>
          <el-button size="mini" type="primary" @click="$emit('search')" :loading='loading'>{{searchLabel}}</el-button>
          <el-button size="mini" @click="reset" >{{resetLabel}}</el-button>
          <el-button size="mini" v-if='config.length > maxNum' type="text" @click="isShow = !isShow">
            {{isShow ? '收起':'展开'}}
            <i :class="[isShow? 'el-icon-arrow-up':'el-icon-arrow-down' ]"></i>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import elementResizeDetectorMaker from 'element-resize-detector'
// 注册组件
import { registerComponents } from './components/index'

const components = registerComponents()

const FormItemType = {
  text: 'el-input',
  select: 'SearchFormSelect',
  radio: 'SearchFormRadio',
  radioButton: 'SearchFormRadioButton',
  checkbox: 'SearchFormCheckbox',
  switch: 'el-switch',
  slider: 'el-slider',
  time: 'el-time-select',
  timeRange: 'el-time-picker',
  date: 'el-date-picker',
  rate: 'el-rate',
  cascader: 'el-cascader'
}
export default {
  name: 'IcsSearchForm',
  components,
  props: {
    config: Array,
    loading: Boolean,
    searchLabel: {
      type: String,
      default: '查询'
    },
    resetLabel: {
      type: String,
      default: '重置'
    }
  },
  data () {
    return {
      isShow: false,
      maxNum: 4
    }
  },
  computed: {
    style () {
      const width = 100 / this.maxNum
      return {
        flex: ` 0 0 ${width}%`,
        maxWidth: `${width}%`,
        paddingRight: this.maxNum * 2 + 'px',
        marginBotton: this.maxNum * 5 + 'px'
      }
    },
    searchFormBind () {
      const defaultConfig = {
        labelSuffix: ':',
        labelWidth: '80px',
        size: 'small'
      }
      return Object.assign(defaultConfig, this.$attrs)
    }
  },
  mounted () {
    this.getSearchItemNum()
  },
  methods: {
    getItemEl (type = 'text') {
      return FormItemType[type] || FormItemType.text
    },
    getSearchItemNum () {
      const erd = elementResizeDetectorMaker()
      const searchFormWrapper = this.$refs.searchForm

      erd.listenTo(searchFormWrapper, (element) => {
        const wrapWidth = element.offsetWidth
        if (wrapWidth < 650) {
          this.maxNum = 1
        } else if (wrapWidth < 900) {
          this.maxNum = 2
        } else if (wrapWidth < 1200) {
          this.maxNum = 3
        } else {
          this.maxNum = 4
        }
      })
    },
    // reset form
    reset () {
      this.$emit('reset')
    },
    create () {
      return this.$refs.icsSearchForm
    }
  }
}
</script>
