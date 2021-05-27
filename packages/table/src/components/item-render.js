export default {
  name: 'ItemRender',
  props: {
    value: [String, Number],
    options: Array,
    tag: Boolean
  },
  render: function (createElement) {
    const { label, status } = this.formatter()
    return this.tag ? createElement(
      'el-tag', // 标签名称
      {
        props: {
          type: status,
          effect: 'dark',
          size: 'small'
        }
      },
      label || '' // 子节点数组
    ) : createElement(
      'span', // 标签名称
      {
        class: ['is-' + status]
      },
      label || ''// 子节点数组
    )
  },
  methods: {
    formatter () {
      const retObj = this.options.find(item => item.value === this.value)
      return retObj || {}
    }
  }
}
