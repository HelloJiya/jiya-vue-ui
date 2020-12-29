const Components = require('../components.json')
const fs = require('fs')
const render = require('json-templater/string')
const uppercamelcase = require('uppercamelcase')
const path = require('path')
const endOfLine = require('os').EOL

const OUTPUT_PATH = path.join(__dirname, '../src/index.js')
const IMPORT_TEMPLATE = 'import {{name}} from \'../packages/{{package}}/index.js\''
const INSTALL_COMPONENT_TEMPLATE = '  {{name}}'
const MAIN_TEMPLATE = `/* */

{{include}}

const components = [
{{install}}
]

const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '{{version}}',
  install,
{{list}}
}
`

const ComponentNames = Object.keys(Components)

const includeComponentTemplate = []
const installTemplate = []
const listTemplate = []

ComponentNames.forEach(name => {
  const componentName = uppercamelcase(name)

  includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
    name: componentName,
    package: name
  }))

  installTemplate.push(render(INSTALL_COMPONENT_TEMPLATE, {
    name: componentName,
    component: name
  }))

  listTemplate.push(`  ${componentName}`)
})

const template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join(',' + endOfLine),
  version: process.env.VERSION || require('../package.json').version,
  list: listTemplate.join(',' + endOfLine)
})

fs.writeFileSync(OUTPUT_PATH, template)
console.log('[build entry] DONE:', OUTPUT_PATH)
