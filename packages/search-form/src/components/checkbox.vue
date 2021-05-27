<template>
  <el-checkbox-group v-bind="$attrs" v-on="$listeners">
    <el-checkbox v-for="item in options" v-bind="item" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'SearchFormCheckbox',
  props: {
    options: Array
  }
}
</script>

<style>

</style>
