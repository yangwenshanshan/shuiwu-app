<template>
  <view class="ZenoRefreshList">
    <ZenoPullRefresh ref="ZenoPullRefresh" @scrollUpdate="scrollUpdate">
      <scroll-view
        class="scroll-view"
        :enable-back-to-top="true"
        :scroll-top="scrollTop"
        :scroll-y="true"
        @scrolltolower="scrollBottom"
      >
        <slot></slot>
      </scroll-view>
    </ZenoPullRefresh>
  </view>
</template>

<script>
export default {
  name: 'ZenoRefreshList',
  data () {
    return {
      scrollTop: 0,
    }
  },
  props: {
  },
  methods: {
    scrollUpdate () {
      this.$emit('scrollUpdate')
    },
    scrollBottom () {
      this.$emit('scrollBottom')
    },
    start () {
      this.$refs.ZenoPullRefresh.start()
    },
    cancel () {
      this.$refs.ZenoPullRefresh.cancel()
    }
  }
}
</script>

<style lang="scss">
.scroll-view{
  height: 100%;
  box-sizing: border-box;
}
</style>