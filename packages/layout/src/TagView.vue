<template>
  <div class="ics-layout-tagsview">
    <el-scrollbar ref="scrollContainer" class="ics-layout-tagsview__wrap" :vertical="false">
        <router-link
          v-for="tag in data"
          ref="tag"
          :key="tag.path"
          :class="$parent.isActive(tag)?'active':''"
          :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
          tag="span"
          class="ics-layout-tagsview__item"
        >
          {{ tag.title }}
          <span v-if="!(data.length === 1) && !isAffix(tag)" class="el-icon-close" @click.prevent.stop="$emit('closeSelectedTag',tag)" />
        </router-link>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'IcsLayoutTagView',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return { }
  },
  methods: {
    isAffix (tag) {
      return tag.meta && tag.meta.affix
    }
  }
}
</script>
