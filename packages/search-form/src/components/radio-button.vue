<template>
  <el-radio-group v-bind="$attrs" v-on="$listeners">
    <el-radio-button v-for="item in options" :label="item.value" :key="item.value" >{{item.label}}</el-radio-button>
  </el-radio-group>
</template>

<script>
export default {
  name: 'SearchFormRadioButton',
  props: {
    options: Array
  }

}
</script>
