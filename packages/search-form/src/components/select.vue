<template>
  <el-select v-bind="$attrs" v-on="$listeners" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'SearchFormSelect',
  props: {
    options: Array
  }
}
</script>

<style>

</style>
