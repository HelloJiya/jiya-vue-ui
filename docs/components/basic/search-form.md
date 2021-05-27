# SearchForm 搜索表单

## 基础

:::demo 
```html
<ics-search-form 
  :config="config" 
  :value='form' 
  :loading="loading" 
  searchLabel='搜索' 
  resetLabel="清空"
  @reset='reset' 
  @search='search' 
  ref="icsSearchForm"
>

</ics-search-form>

<script>
export default {
  data(){
    return{
      form:{abs:''},
      config:[{label:'aaa',prop:'abs'}],
      loading:false,
      icsSearchForm:null
    }
  },
  mounted() {
    this.icsSearchForm = this.$refs.icsSearchForm.create()
  },
  methods: {
    reset(){
      console.log('reset');
      this.icsSearchForm.resetFields()
    },
    search(){
      console.log('search',this.form);
    }
  },
}
</script>

```
:::

## API


### SearchForm Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
|value | 表单数据对象	 |object |——  |—— |
|config |搜索配置，配置同[element FormItem](https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes) |array |——  |—— |
|loading |loading加载配置 |boolean  |——  |—— |
|searchLabel |搜索按钮的文本 |string  |——  |—— |
|resetLabel |重置按钮的文本 |string  |——  |—— |
|[(...)](https://element.eleme.cn/#/zh-CN/component/form#form-attributes) |支持element`Form`组件属性|—— |——  |—— |



### SearchForm Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
|search |点击搜索触发 |—— |
|reset |点击重置触发 |—— |



### SearchForm Methods
| 方法名| 说明  | 参数  |
|---------- |-------- |---------- |
|create |创建`ElForm`实例,可调用[Form Methods](https://element.eleme.cn/#/zh-CN/component/form#form-methods) |—— |
