<template>
  <h1>Vue虚拟滚动</h1>
  <VirtualScroll :itemHeight="50" :viewHeight="600" :list="list">
    <template v-slot="scope">
      <span class="scroll-item">{{ scope.item.value }}</span>
    </template>
  </VirtualScroll>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import VirtualScroll from '@/components/VirtualScroll.vue'
export default defineComponent({
  name: 'App',
  components: {
    VirtualScroll
  },
  setup() {
    const list = Array.from(Array(1000), (v, k) => ({ value: k, key: k }))
    const state = reactive({
      list
    })

    console.log(state.list)
    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.scroll-item {
  height: 50px;
  line-height: 50px;
  width: 100%;
  background: #e8f3fe;
  margin: 10px;
  color: #7dbcfc;
}
</style>
