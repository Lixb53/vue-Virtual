<template>
  <div
    class="recycle-scroller"
    ref="recycleScroller"
    @scroll="update"
    :style="{ minHeight: `${viewHeight}px` }"
  >
    <div
      class="recycle-scroller-holder"
      :style="{ minHeight: `${totalHeight}px` }"
    >
      <div
        class="recycle-scroller-wrapper"
        :style="{ transform: `translateY(${translate}px)` }"
      >
        <div
          class="recycle-scroller-item"
          :style="{ height: `${itemHeight}px` }"
          v-for="(item, index) in showList"
          :key="index"
        >
          <slot :item="item"></slot>
          <!-- <span class="scroll-item">{{ item.value }}</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  ref
} from 'vue'

export default defineComponent({
  name: 'VirtualScroll',
  props: {
    list: {
      type: Array,
      required: true
    },
    itemHeight: {
      type: Number,
      default: 50
    },
    viewHeight: {
      type: Number,
      default: 600
    }
  },
  setup(props) {
    // const list = Array.from(Array(1000), (v, k) => ({ value: k, key: k }))
    console.log(props.list)
    const showList: Array<unknown> = []
    const state = reactive({
      showList, // 当前渲染的数据
      translate: 0 // 当前渲染数据区域的Y轴偏移数, 需要通过偏移数使数据滚动过程中渲染数据一直出现在可视区域内
    })

    const totalHeight = computed(() => props.itemHeight * props.list.length)
    // 使用refs获取dom
    const recycleScroller = ref()

    const update = () => {
      console.log('触发了scroll')
      let scrollTop = recycleScroller.value.scrollTop
      let viewNum = Math.floor(props.viewHeight / props.itemHeight) + 2 //可视区域可显示的最多条数
      let showStart = Math.floor(scrollTop / props.itemHeight) //可视区域显示的第一数据下标
      /**
       * 利用VUE中diff算法的复用机制, 我们可以截取可视区域的上一屏第一条至下一屏最后一条
       * 这样滚动时可以快速复用, 避免滚动后再渲染DOM出现短暂空白
       */

      let start = showStart - viewNum > 0 ? showStart - viewNum : 0 //上一屏第一条下标
      let end =
        showStart + 2 * viewNum < props.list.length
          ? showStart + 2 * viewNum
          : props.list.length //下一屏最后一条下标
      state.showList = props.list.slice(start, end)
      state.translate = start * props.itemHeight
    }
    onMounted(() => {
      update()
    })
    return { ...toRefs(state), totalHeight, recycleScroller, update }
  }
})
</script>

<style lang="less" scoped>
.recycle-scroller {
  position: relative;
  overflow: auto;
}
.recycle-scroller-holder,
.recycle-scroller-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
}
.recycle-scroller-item {
  display: flex;
  align-items: center;
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
