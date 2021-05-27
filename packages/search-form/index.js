import SearchForm from './src/main'

/* istanbul ignore next */
SearchForm.install = function (Vue) {
  Vue.component(SearchForm.name, SearchForm)
}

export default SearchForm
