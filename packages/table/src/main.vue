<template>
    <div class="ics-table">
      <!-- Search Module -->
      <slot name="search"  v-if="search">
        <ics-search-form
          class="ics-table__search"
          v-model="searchFormValue"
          :config='searchFormOption'
          v-bind="searchBind"
          @search='onSearch'
          @reset='onReset'
          :loading='loading'
        >
        </ics-search-form>
      </slot>

      <!-- Toolbar Module TODO-->
      <div class="ics-table__toolbar" v-if="toolbar || $slots.toolbarDesc || $slots.toolbarAction">
        <div class="ics-table__toolbar--description" v-if="$slots.toolbarDesc">
          <slot name="toolbarDesc"></slot>
        </div>
        <div class="ics-table__toolbar--action">
         <slot name='toolbarAction'>
           <template v-if="toolbar">
             <template v-for="(btn,index) in toolbar.actions">
              <el-button  :size="btn.size || 'mini'" :key="index" v-bind="btn" @click.native.prevent="btn.click()" v-if="btn.show !== false">{{btn.label}}</el-button>
             </template>
           </template>
         </slot>
        </div>
      </div>

      <!-- Table Module -->
      <el-table ref="icsTable" class="ics-table__content"  :data="tableData"  v-bind='$attrs' v-on="$listeners"  v-loading='loading'>
        <el-table-column
          v-for="(col,index) in  columns"
          :key="index"
          v-bind="col"
        >
          <!-- Header Render  -->
          <template v-if="col.slots && col.slots.header" v-slot:header="{ row, $index }">
            <slot :name="col.slots.header" v-bind="{row, $index}"></slot>
          </template>

          <!-- Content Render  -->
          <!-- slot 插槽 -->
          <template v-if="col.slots && col.slots.content" v-slot="{ row, column, $index}">
            <slot :name="col.slots.content" v-bind="{ row, column, $index }"></slot>
          </template>

          <!-- option 枚举匹配 -->
          <template v-else-if="isOptionType(col.valueType)" v-slot="{ row }">
            <item-render :value="row[col.prop]" :options="col.options" :tag='!!col.tag'></item-render>
          </template>

          <!-- image 图片 -->
          <template v-else-if="col.valueType === 'image'" v-slot="{ row }">
            <el-image
              style="width: 100px; height: 100px"
              :src="row[col.prop]"
            ></el-image>
          </template>

          <!-- action 操作 -->
          <template v-else-if="col.valueType === 'action'" v-slot="{ row, column, $index }">
            <template v-for="(btn,index) in col.actions">
              <el-button
                v-if="getIsShow(btn,row, column, $index)"
                :key="index"
                v-bind="btn"
                :size="btn.size || 'small'"
                :disabled='getButtonDisabled(btn,row, column, $index)'
                @click.native.prevent="btn.click && btn.click(row,column,$index)"
              >
                {{btn.label}}
              </el-button>
            </template>
          </template>

          <!-- render -->
          <template v-else-if="col.render" v-slot="{ row, column, $index }">
          <colRender :row='row' :column='column' :index="$index" :render="col.render"></colRender>
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination Module -->
      <el-pagination
        v-if="pagination"
        :class="['ics-table__pagination',pagination.align && 'is-'+ pagination.align]"
        v-bind="paginationBind"
        @size-change="requestTableDate"
        @current-change="requestTableDate"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        :total="total || 0"
        :pager-count='5'
      >
      </el-pagination>
    </div>
</template>

<script>
import ItemRender from './components/item-render'
// import IcsSearchForm from 'ics-ui/packages/search-form'
import IcsSearchForm from '../../search-form'

const SELECTTYPE = ['radio', 'select', 'radioButton']

export default {
  name: 'IcsTable',
  components: {
    IcsSearchForm,
    ItemRender,
    colRender: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, context) => {
        const { row, index, column } = context.props
        const params = {
          row,
          index,
          column
        }
        return context.props.render(h, params)
      }
    }
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },

    search: {
      type: [Object, Boolean],
      default: true
    },

    // toolbar
    toolbar: {
      type: Object
    },

    pagination: {
      type: [Boolean, Object],
      default: true
    },

    request: Function,

    params: {
      type: Object
    },

    afterLoad: Function,

    failRequest: Function

  },
  data () {
    return {
      // search
      searchFormValue: {},

      // table
      tableData: [],

      // pagination
      currentPage: 1,
      total: 0,
      pageSize: 10,

      loading: false
    }
  },
  computed: {
    searchFormOption () {
      return (this.columns && this.columns.length) ? this.columns.filter(item => item.search) : []
    },

    searchBind () {
      return typeof this.search === 'boolean' ? {} : this.search
    },

    paginationBind () {
      if (typeof this.pagination === 'boolean') { return {} }
      const defaultConfig = {
        background: true,
        pageSizes: [10, 20, 50, 100],
        layout: 'total, prev, pager, next, sizes, jumper',
        small: false,
        disabled: false,
        align: 'right'
      }
      return Object.assign({}, defaultConfig, this.pagination)
    }
  },
  watch: {
    params: {
      handler (nv) {
        this.requestTableDate()
      },
      deep: true
    }
  },
  mounted () {
    this.requestTableDate()
  },
  updated () {
    this.$nextTick(() => {
      this.$refs.icsTable.doLayout()
    })
  },
  methods: {
    isOptionType (type) {
      return SELECTTYPE.indexOf(type) > -1
    },

    getIsShow (btn, row, colums, index) {
      const { isShow } = btn
      if (isShow !== undefined) {
        if (typeof isShow === 'function') {
          return isShow(row, colums, index)
        }
        if (typeof isShow === 'boolean') {
          return isShow
        }
      }
      return true
    },

    getButtonDisabled (btn, row, colums, index) {
      const { disabled } = btn
      if (disabled !== undefined) {
        if (typeof disabled === 'function') {
          return disabled(row, colums, index)
        }
        if (typeof disabled === 'boolean') {
          return disabled
        }
      }
      return false
    },

    onSearch () {
      this.currentPage = 1
      this.requestTableDate()
      this.$emit('search', { ...this.params, ...this.searchFormValue })
    },

    onReset () {
      this.clearSearchForm()
      this.currentPage = 1
      this.requestTableDate()
      this.$emit('reset')
    },

    // 重置表单 清空searchForm
    clearSearchForm () {
      for (const key in this.searchFormValue) {
        if (Object.hasOwnProperty.call(this.searchFormValue, key)) {
          const element = this.searchFormValue[key]
          if (Array.isArray(element)) {
            this.searchFormValue[key] = []
          } else {
            this.searchFormValue[key] = ''
          }
        }
      }
    },

    /**
     * 请求表格数据
     * 注：请求格式为后端约定格式{data:{},base:{}}
     * data: 存放搜索查询信息
     * base: 存放分页、排序信息
     */
    async requestTableDate () {
      const base = { page: '0-0' }
      if (this.pagination) {
        const { pageSize, currentPage } = this
        base.page = `${currentPage}-${pageSize}`
      }
      if (!this.request) return
      this.loading = true
      try {
        const response = await this.request({ data: { ...this.params, ...this.searchFormValue }, base })
        if (response.success) {
          const { data, total } = response
          this.tableData = data
          this.total = total
          // 触发onLoad
        } else {
          this.tableData = []
          this.total = 0
        }
        if (this.afterLoad) this.afterLoad(this.tableData)
      } catch (error) {
        // 触发onRequestError
        if (this.failRequest) this.failRequest(error)
      }
      this.loading = false
    },

    // ********Methods********
    /** reload */
    reload () {
      this.requestTableDate()
    },
    createTable () {
      return this.$refs.icsTable
    }
  }
}
</script>
