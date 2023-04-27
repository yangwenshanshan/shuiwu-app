<template>
  <view class="scroll-pull">
    <view class="state-loading" :class="scrollLoading ? 'active' : ''">
      <spinner color="#fff" v-if="!successUpdate"></spinner>
      <view style="margin-left:20rpx;" v-if="!successUpdate">加载中...</view>
      <view style="margin-left:20rpx;" v-if="successUpdate">已更新</view>
    </view>
    <view class="scroll-main" :style="'height:' + height + ';transform:translateY(' + scrollTop + 'px);' + (scrollBack ? 'transition: all 300ms;' : '') + (scrollLoading ? 'padding-top:60rpx' : '')">
      <view class="loading" v-if="!scrollLoading">
        <image :class="scrollTop <= updateHeight ? '' : 'changearr'" class="normalarr" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAASFJREFUWEftlzGOgzAQRb+F5Do32ewRchO2YNooJ8jeILsdGhpykuwRcoTcIKmhmMgRkZCFcTzRisa0YL/nP4MYDBa+zMJ8vCVARGcRuTZNs9Ee5F0BcWBmVu+jXujARJQFcgI5gZxATiAnkBP4vwTKslxZa7dd1/22bXubGjhin+OqqtYADkVRfNV1fZnaIzgPENE3gL2InPu+30xJzAkM8JMxZgVgx8w/SQJDAn8APkISIQEPfmTmMjSyzU5EMYkpgRS4k4qOZHMSvkAq/CUB91BIYiyggb8sEJKw1l7dPRH5BPBsuNma+70QLcF4gZ+EMca9Zk7gNnR7EjwpgafIWMI7TTJcJeCXY5BQwdUCnoT7M3qUQnMl9YAGEFuzuMAd6EvuIRM4O/4AAAAASUVORK5CYII=" mode="aspectFill" style="width:32rpx;height:40rpx;" />
        <view class="state-pull" v-if="scrollTop <= updateHeight">下拉刷新</view>
        <view class="state-back" v-if="scrollTop > updateHeight">释放更新</view>
      </view>
      <scroll-view
        :enable-back-to-top="true"
        class="scroll-view"
        @touchmove.stop="moveTouch"
        @touchstart="startTouch"
        @touchcancel="cancelTouch"
        @touchend="endTouch"
        :style="'height:' + height"
        :scroll-y="true"
        @scrolltolower="scrollBottom"
      >
        <slot></slot>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      scrollTop: 0,
      scrollBack: false,
      scrollLoading: false,
      // updateHeight: 64,
      successUpdate: false,
      scrollType: '',
      touchPosition: {
        startY: 0,
        lastEndY: 0,
        nowEndY: 0,
        distance: 0
      },
      updateTimer: null,
      loadingTimer: null
    }
  },
  props: {
    height: {
      type: String,
      default: '300px'
    },
    max: {
      type: Number,
      default: 200
    },
    updateHeight: {
      type: [String, Number],
      default: 64
    }
  },
  methods: {
    start () {
      if (this.updateTimer) {
        clearTimeout(this.updateTimer)
        this.updateTimer = null
      }
      if (this.loadingTimer) {
        clearTimeout(this.loadingTimer)
        this.loadingTimer = null
      }
      this.scrollTop = 0
      this.scrollLoading = true
      this.scrollType = 'auto'
      this.successUpdate = false
      this.$emit('scrollUpdate', {
        scrollType: this.scrollType
      })
    },
    cancel () {
      this.successUpdate = true
      let loadingTimer = setTimeout(() => {
        this.scrollTop = 0
        this.scrollLoading = false
        clearTimeout(loadingTimer)
        this.loadingTimer = null
        let updateTimer = setTimeout(() => {
          this.successUpdate = false
          clearTimeout(updateTimer)
          this.updateTimer = null
        }, 300)
        this.updateTimer = updateTimer
      }, 1000)
      this.loadingTimer = loadingTimer
    },
    startTouch (e) {
      if (this.scrollLoading) {
        return false
      }
      this.touchPosition.startY = e.touches[0].pageY
      this.scrollBack = false
    },
    moveTouch (e) {
      if (this.scrollLoading) {
        return false
      }
      let lastEndY = this.touchPosition.lastEndY
      let nowEndY = this.touchPosition.nowEndY
      lastEndY ? lastEndY = nowEndY : lastEndY = e.touches[0].pageY
      nowEndY = e.touches[0].pageY
      let move = this.touchPosition.nowEndY - this.touchPosition.lastEndY
      let distance = Math.max(Math.min(this.touchPosition.distance + (move > 0 ? Math.floor(move / 2) : move), this.max), 0)
      this.touchPosition.distance = distance
      this.touchPosition.lastEndY = lastEndY
      this.touchPosition.nowEndY = nowEndY
      this.scrollTop = this.touchPosition.distance
    },
    cancelTouch () {
      this.endTouch()
    },
    endTouch () {
      if (this.scrollLoading) {
        return false
      }
      let scrollTop = this.scrollTop
      let scrollLoading = this.scrollLoading
      if (this.scrollTop > this.updateHeight) {
        scrollTop = 0
        scrollLoading = true
        this.touchPosition = {
          startY: 0,
          lastEndY: 0,
          nowEndY: 0,
          distance: 0
        }
        this.scrollType = 'touch'
        this.scrollBack = true
        this.scrollTop = scrollTop
        this.scrollLoading = scrollLoading
        this.$emit('scrollUpdate', {
          scrollType: this.scrollType
        })
      } else {
        scrollTop = 0
        this.touchPosition = {
          startY: 0,
          lastEndY: 0,
          nowEndY: 0,
          distance: 0
        }
        this.scrollBack = true
        this.scrollTop = scrollTop
        this.scrollLoading = scrollLoading
      }
    },
    scrollBottom () {
      this.$emit('scrollBottom', {
        scrollType: this.scrollType
      })
    }
  }
}
</script>

<style lang="scss">
.scroll-pull{
  width: 100%;
  overflow: hidden;
  position: relative;
  .scroll-main{
    position: relative;
    top: -90rpx;
    .loading{
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24rpx;
      color: #888;
      height: 90rpx;
      width: 100%;
    }
    .normalarr{
      transition: 0.3s all;
      transform: rotate(0deg);
      margin-right: 20rpx;
    }
    .changearr{
      transform: rotate(-180deg);
    }
    .scroll-view{
      background: #ffffff;
      padding-top: 0;
    }
  }
  .state-loading{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #23304D;
    color: #fff;
    font-size: 24rpx;
    text-align: center;
    height: 0rpx;
    z-index: 1;
    transition: all 0.2s ease;
    line-height: 60rpx;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .active{
    height: 60rpx;
  }
}
</style>