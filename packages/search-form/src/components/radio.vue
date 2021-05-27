<template>
  <el-radio-group v-bind="$attrs" v-on="$listeners">
    <el-radio v-for="item in options" :label="item.value" :key="item.value" >{{item.label}}</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: 'SearchFormRadio',
  props: {
    options: Array
  }

}
</script>
