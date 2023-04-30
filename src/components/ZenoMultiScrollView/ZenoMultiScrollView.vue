<template>
  <view class="ZenoMultiScrollView">
    <ZenoTabs :value="tabIndex" :tabs="tabs" @change="tabChange"></ZenoTabs>
    <ZenoScrollView ref="ZenoScrollView" v-if="scrollTab.method" :autoFecth="false" :method="scrollTab.method" :params="scrollTab.params">
      <template v-slot:scope="scope">
        <slot name="scope" :row="scope.row" :index="scope.index"></slot>
      </template>
    </ZenoScrollView>
    <slot name="other"></slot>
  </view>
</template>

<script>
export default {
  name: 'ZenoMultiScrollView',
  data () {
    return {
      scrollTab: null
    }
  },
  props: {
    value: {
      type: Number,
      default: () => {
        return 0
      }
    },
    tabs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    value: {
      handler (val) {
        const index = this.tabs.findIndex(el => el.index === val)
        this.tabIndex = index
        this.scrollTab = { ...this.tabs[index] }
        this.$nextTick(() => {
          this.refresh()
        })
      },
      immediate: true
    }
  },
  methods: {
    refresh () {
      if (this.$refs.ZenoScrollView) {
        this.$refs.ZenoScrollView.reset()
        this.$nextTick(() => {
          this.$refs.ZenoScrollView.start()
        })
      }
    },
    tabChange (index) {
      this.$emit('update:value', this.tabs[index].index)
    }
  }
}
</script>

<style>

</style>