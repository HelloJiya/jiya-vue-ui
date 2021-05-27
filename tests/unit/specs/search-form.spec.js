import { createTest, destroyVM } from '../util'
import SearchForm from 'packages/search-form'

describe('SearchForm', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createTest(SearchForm, true)
    expect(vm.$el).to.exist
  })
})
