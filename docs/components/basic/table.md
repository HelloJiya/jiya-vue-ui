# Table 表格
> 表格样式与`vuepress`自带文档样式有冲突，以实际效果为主



## 基础
::: demo
```html
<ics-table ref="table" v-bind="config" :request='getData' :params='params'></ics-table>

<script>
export default {
  data() {
    return {
        params: {},
        config: {
          height:'500',
          rowKey: 'id',
          toolbar: {
            actions:[{label:'新增',type:'primary',size:'mini',click:()=>console.log('click')}]
          },
          pagination: {},
          search:{},
          border:true,
          size: 'medium', // medium / small / mini
          columns: [
            // { type: 'expand', render: (h, { row }) => h('div', row.sex) },
            { type: 'selection', label: '序号' },
            { type: 'index', label: '序号' },
            { width: '100px', label: '姓名', prop: 'name', sortable: true, search: true, valueType: 'select', options: [{ label: 'abc', value: '123' }, { label: 'def', value: '234' }] },
            { label: '年龄', prop: 'age', search: true, sortable: true, formatter: () => 'aaa' },
            { label: '性别', prop: 'sex', search: true, valueType: 'radio', options: [{ label: '女', value: 'woman' }, { label: '男', value: 'men' }] },
            { label: '出生日期', prop: 'birthday', search: true, valueType: 'date', type: 'daterange' },
            { label: '地址', prop: 'addr', search: true },
            // { label: '照片', prop: 'photo', search: true, valueType: 'image' },
            { label: '状态', prop: 'status', search: true, valueType: 'select', options: [{ label: '在线', value: 'online', status: 'success' }, { label: '离线', value: 'offline', status: 'error' }] },
            { label: 'tag', prop: 'status', search: true, valueType: 'select', options: [{ label: '在线', value: 'online', status: 'success' }, { label: '离线', value: 'offline', status: 'warning' }], tag: true },
            { label: 'render', prop: 'status', search: true, render: (h, { row }) => { return h('div', row.sex) } },
            { label: '操作', valueType:'action',actions:[{label:'新增',type:'primary',size:'mini',click:(row)=>console.log(row)}]}
          ]
        }
      }
  },
  methods: {
    add(row, column, $index) {
      console.log('新增')
      console.log('add', row, column, $index)
      // this.$refs.table.reload()
      this.params = { a: '222' }
    },
    del(row) {
      console.log('del', row)
      this.$refs.table.reload()
    },
    sleep(timeout) {
      return new Promise((resolve, reject) => setTimeout(() => resolve(), timeout))
    },
    async getData(params) {
      console.log('getData', params)
      await this.sleep(500)
      return {
        data: [
          { id: '111', name: '123', age: '88', sex: 'woman', birthday: '2020-1-2', status: 'online', children: [{ id: '112', name: '123', age: '88', sex: 'woman', birthday: '2020-1-2', status: 'online' }] },
          { id: '222', name: '234', age: '88', sex: 'men', birthday: '2020-1-2', status: 'online' },
          { id: '333', name: '123', age: '88', sex: 'woman', birthday: '2020-1-2', status: 'offline' },
          { id: '444', name: '234', age: '88', sex: 'men', birthday: '2020-1-2', status: 'offline' },
          { id: '555', name: '234', age: '88', sex: 'men', birthday: '2020-1-2', status: 'offline' },
          { id: '666', name: '234', age: '88', sex: 'men', birthday: '2020-1-2', status: 'offline' },
          { id: '777', name: '234', age: '88', sex: 'men', birthday: '2020-1-2', status: 'offline' },
          { id: '888', name: '234', age: '88', sex: 'men', birthday: '2020-1-2', status: 'offline' },
          { id: '999', name: '234', age: '88', sex: 'men', birthday: '2020-1-2', status: 'offline' },
          { id: '1111', name: '234', age: '88', sex: 'men', birthday: '2020-1-2', status: 'offline' }
        ],
        success: true,
        total: 100
      }
    }
  },
}
</script>
```
:::

## 使用slot

::: demo
```html
<ics-table ref="table" v-bind="config" :request='getData' :params='params'>
  <template #toolbarAction>
    <el-button type="primary" size="mini">新增</el-button>
  </template>

    <template #action="{row,column,$index}">
      <el-button type="text" @click='add(row,column,$index)'>新增</el-button>
    </template>

    <template #actionHeader='{$index}'>
      {{ $index }}
    </template>
</ics-table>

<script>
export default {
  data() {
    return {
        params: {},
        config: {
          height:'500',
          rowKey: 'id',
          'highlight-current-row': true,
          // toolbar: {
          //   slots: { action: 'toolbar' }
          // },
          pagination: {
            align: 'center'
          },
          search:{
            // inline:true
            // labelPosition:'left',
            // labelWidth:'120px',
            labelSuffix:'aaa'
          },
          border:true,
          size: 'medium', // medium / small / mini
          columns: [
            // { type: 'expand', render: (h, { row }) => h('div', row.sex) },
            { type: 'selection', label: '序号' },
            { type: 'index', label: '序号' },
            { width: '100px', label: '姓名', prop: 'name', sortable: true, search: true, valueType: 'select', options: [{ label: 'abc', value: '123' }, { label: 'def', value: '234' }] },
            { label: '年龄', prop: 'age', search: true, sortable: true, formatter: () => 'aaa' },
            { label: '性别', prop: 'sex', search: true, valueType: 'radio', options: [{ label: '女', value: 'woman' }, { label: '男', value: 'men' }] },
            { label: '出生日期', prop: 'birthday', search: true, valueType: 'date', type: 'daterange' },
            { label: '地址', prop: 'addr', search: true },
            // { label: '照片', prop: 'photo', search: true, valueType: 'image' },
            { label: '状态', prop: 'status', search: true, valueType: 'select', options: [{ label: '在线', value: 'online', status: 'success' }, { label: '离线', value: 'offline', status: 'error' }] },
            { label: 'tag', prop: 'status', search: true, valueType: 'select', options: [{ label: '在线', value: 'online', status: 'success' }, { label: '离线', value: 'offline', status: 'warning' }], tag: true },
            { label: 'render', prop: 'status', search: true, render: (h, { row }) => { return h('div', row.sex) } },
            { label: '操作', slots: { content: 'action', header: 'actionHeader' }}
          ]
        }
      }
  },
  methods: {
    add(row, column, $index) {
      console.log('新增')
      console.log('add', row, column, $index)
      // this.$refs.table.reload()
      this.params = { a: '222' }
    },
    del(row) {
      console.log('del', row)
      this.$refs.table.reload()
    },
    sleep(timeout) {
      return new Promise((resolve, reject) => setTimeout(() => resolve(), timeout))
    },
    async getData(params) {
      console.log('getData', params)
      await this.sleep(500)
      return {
        data: [
          { id: '111', name: '123', age: '88', sex: 'woman', birthday: '2020-1-2', status: 'online', children: [{ id: '112', name: '123', age: '88', sex: 'woman', birthday: '2020-1-2', status: 'online' }] },
          { id: '222', name: '234', age: '88', sex: 'men', birthday: '2020-1-2', status: 'online' },
          { id: '333', name: '123', age: '88', sex: 'woman', birthday: '2020-1-2', status: 'offline' },
          { id: '444', name: '234', age: '88', sex: 'men', birthday: '2020-1-2', status: 'offline' },
          { id: '555', name: '234', age: '88', sex: 'men', birthday: '2020-1-2', status: 'offline' },
          { id: '666', name: '234', age: '88', sex: 'men', birthday: '2020-1-2', status: 'offline' },
          { id: '777', name: '234', age: '88', sex: 'men', birthday: '2020-1-2', status: 'offline' },
          { id: '888', name: '234', age: '88', sex: 'men', birthday: '2020-1-2', status: 'offline' },
          { id: '999', name: '234', age: '88', sex: 'men', birthday: '2020-1-2', status: 'offline' },
          { id: '1111', name: '234', age: '88', sex: 'men', birthday: '2020-1-2', status: 'offline' }
        ],
        success: true,
        total: 100
      }
    }
  },
}
</script>
```
:::


## API
### Table 属性

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
|columns |列定义 |Array |[ColumnsConfig](#Columns)  |—— |
|search |是否显示搜索表单，传入对象时为搜索表单的配置	 |Object、Boolean | [SearchConfig](#Search) |——  |—— |
|toolbar |工具栏配置 |object |[ToolbarConfig](#Toolbar)  |—— |
|pagination |分页配置 |object、boolean |[PaginationConfig](#Pagination)  |—— |
|request |获取表格`data`的方法 |({data:{...search,...params},base:{page}}) => {data,success,total}	 |——  |—— |
|params |用于 `request` 查询的额外参数，一旦变化会触发重新加载 |Object |——  |—— |
|afterLoad |数据加载结束，调用的方法 |(dataSource) => void |——  |—— |
|failRequest |数据加载失败时触发	 |(error) => void |——  |—— |
|...props |element的[table](https://element.eleme.cn/#/zh-CN/component/table#table-attributes) |—— |——  |—— |


### Table Event
| 方法名| 说明  | 参数  |
|---------- |-------- |---------- |
|search |提交表单时触发| (params) => void|
|reset |重置表单时触发 |() => void |
|...methods |element的[table]() |—— |



### Table Methods
| 方法名| 说明  | 参数  |
|---------- |-------- |---------- |
|reload |表格重新加载 |—— |
|createTable |创建表格实例，可通过实例调用element的[TAble Methods](https://element.eleme.cn/#/zh-CN/component/table#table-methods) |() => $el |


### Table Slot
| name | 说明 |
|------|--------|
|search |搜索区域内容 |
|toolbarDesc |工具栏的描述区域（左侧） |
|toolbarAction |工具栏的操作（右侧） |


### <span id="Search">Search</span>

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
|searchLabel |查询按钮文字 |string |——  |查询 |
|resetLabel |重置按钮文字 |string |——  |重置 |
|...props |element的[form](https://element.eleme.cn/#/zh-CN/component/form#form-attributes) |—— |——  |—— |

### <span id="Toolbar">Toolbar</span>
>操作区可通过配置`actions`或使用`toolbarAction`的插槽

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
|actions |操作区按钮配置 |[ToolbarButton](#ToolbarButton) |——  |—— |



### <span id="Columns">Columns</span>

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
|prop | 表格数据的展示字段 |string |——  |—— |
|valueType | 该列数据类型，与搜索框相关联 |string |[valueType](#valueType) |`text` |
|options |值的枚举，会自动转化把值当成 `key` 来取出要显示的内容 |array |——  |—— |
|tag |是否tag标签形式展示 |boolean |——  |false |
|search |是否展示该列搜索 |boolean |——  |false |
|searchProps |查询表单的 `props`,根据查询类型决定 |object |——  |—— |
|searchProps.on |查询表单的事件集合，根据查询类型决定 |object |——  |—— |
|actions |`valueType`值为`action`拥有的属性，配置操作列的按钮，列配置查看[ActionButton](#ActionsButton) |array |——  |—— |
|slots |自定义slot渲染，包含columns的header(表头)和content（列）slot渲染，`{header:xxx,content:xxx}` |object |——  |—— |
|render |自定义render渲染|function(h, {row,column,index}) |——  |—— |
|...props |element的[table-column]() |——  |—— |


### <span id="Pagination">Pagination</span>
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
|align |分页对齐方式 |string |center/right/left  |right|
|background |是否为分页按钮添加背景色 |boolean|—— |true |
|pageSizes |每页显示个数选择器的选项设置 |array |  |[10, 20, 50, 100] |
|layout|	组件布局，子组件名用逗号分隔|	String|	sizes, prev, pager, next, jumper, ->, total, slot	|'prev, pager, next, jumper, ->, total'|
|small |是否使用小型分页样式	 |boolean |——   |false |
|disabled|	是否禁用|	boolean|	—	|false|


### <span id="ToolbarButton">ToolbarButton</span>

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
|label |按钮文字 |string |——  |—— |
|show |按钮是否显示 |boolean |——  |—— |
|click |按钮点击事件 | ()=>void |——  |—— |
|...props |element的[Button](https://element.eleme.cn/#/zh-CN/component/button#attributes) | |——  |—— |

### <span id="ActionsButton">ActionsButton</span>

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
|label |按钮文字 |string |——  |—— |
|show |按钮是否显示 |boolean,(row,column,index) => boolean |——  |true |
|click |按钮点击事件 | (row,column,index)=>void |——  |—— |
|disabled |按钮点击事件 |(row,column,index) => boolean |——  |false |
|...props |element的[Button](https://element.eleme.cn/#/zh-CN/component/button#attributes) | |——  |—— |




### <span id="valueType"> valueType </span>
| 名称      | 对应组件/说明    | 
|---------- |-------- |
| text |[Input](https://element.eleme.cn/#/zh-CN/component/input#input-attributes) |
| radio| [Radio](https://element.eleme.cn/#/zh-CN/component/radio#radio-group-attributes)| 
| radioButton|[RadioButton](https://element.eleme.cn/#/zh-CN/component/radio#radio-button-attributes) | 
| select|[select](https://element.eleme.cn/#/zh-CN/component/select#select-attributes) | 
| checkbox| [Checkbox](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-group-attributes)| 
| switch|[Switch](https://element.eleme.cn/#/zh-CN/component/switch#attributes) | 
| slider|[Slider](https://element.eleme.cn/#/zh-CN/component/slider#attributes) | 
| time|[TimeSelect](https://element.eleme.cn/#/zh-CN/component/time-picker#time-select-options) | 
| timeRange|[TimePick]() range | 
| date|[DatePicker](https://element.eleme.cn/#/zh-CN/component/date-picker#attributes) | 
| rate|[Rate](https://element.eleme.cn/#/zh-CN/component/rate#attributes) | 
| Cascader| [Cascader](https://element.eleme.cn/#/zh-CN/component/cascader#cascader-attributes)| 
| action| 操作 | 

