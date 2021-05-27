import { createTest, destroyVM } from '../util'
import Layout from 'packages/layout'

const Menus = () => function () {
  return [{
    path: '/ims/plan',
    code: 'Plan',
    icon: 'ddd',
    name: '计划管理',
    children: [{
      path: '/ims/plan/template', code: 'PlanTemplate', icon: 'ddd', name: '表模板管理'
    }, {
      path: '/ims/plan/arrange', code: 'PlaneArrange', icon: 'ddd', name: '计划安排'
    },
    {
      path: '/ims/plan/date',
      code: 'PlanDate',
      name: '计划日历',
      children: [
        {
          path: '/ims/plan/date', code: 'PlanDate01', name: '计划日历'
        }
      ]
    }]
  }]
}

describe('Layout', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createTest(Layout, {
      sidebar: {
        defaultActive: 'Plan'
      },
      menus: Menus()
    })
    const layoutElm = vm.$el
    expect(layoutElm.classList.contains('ics-layout')).to.be.true
  })
})
