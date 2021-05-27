const requireComponent = require.context('.', false, /\.(vue)$/)

export function registerComponents () {
  const ret = {}
  requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName).default
    ret[componentConfig.name] = componentConfig
  })
  return ret
}
