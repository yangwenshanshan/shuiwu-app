<template>
  <view class="ZenoPullRefresh"
    @touchmove.stop="moveTouch"
    @touchstart="startTouch"
    @touchcancel="cancelTouch"
    @touchend="endTouch"
  >
    <view :style="'height:' + calcHeight + 'px;transform:translateY(' + scrollTop + 'rpx);' + (scrollBack ? 'transition: all 300ms;' : '')">
      <view class="pull-refresh-header">
        <view class="loading" v-if="!scrollLoading && !scrollBack">
          <view v-if="scrollTop <= updateHeight">下拉即可刷新...</view>
          <view v-if="scrollTop > updateHeight">释放即可更新...</view>
        </view>
        <view class="loading" v-if="scrollLoading">
          <ZenoSpinner class="loading-image" color="#888" v-if="!successUpdate"></ZenoSpinner>
          <view v-if="!successUpdate">加载中...</view>
          <view v-if="successUpdate">刷新成功</view>
        </view>
      </view>
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ZenoPullRefresh',
  data () {
    return {
      scrollTop: 0,
      scrollBack: false,
      scrollLoading: false,
      successUpdate: false,
      touchPosition: {
        startY: 0,
        lastEndY: 0,
        nowEndY: 0,
        distance: 0
      },
      updateTimer: null,
      loadingTimer: null,
      calcHeight: 0
    }
  },
  props: {
    height: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 400
    },
    updateHeight: {
      type: Number,
      default: 90
    }
  },
  mounted () {
    if (this.height) {
      this.calcHeight = this.height
    } else {
      const windowHeight = uni.getSystemInfoSync().windowHeight
      const query = uni.createSelectorQuery().in(this);
      query.select('.ZenoPullRefresh').boundingClientRect(data => {
        this.calcHeight =  windowHeight - data.top
      }).exec();
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
      this.scrollTop = 90
      this.scrollLoading = true
      this.successUpdate = false
      this.$emit('scrollUpdate')
    },
    cancel () {
      this.successUpdate = true
      this.scrollBack = true
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
      }, 500)
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
        scrollTop = 90
        scrollLoading = true
        this.touchPosition = {
          startY: 0,
          lastEndY: 0,
          nowEndY: 0,
          distance: 0
        }
        this.scrollBack = true
        this.scrollTop = scrollTop
        this.scrollLoading = scrollLoading
        this.$emit('scrollUpdate')
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
  }
}
</script>

<style lang="scss" scoped>
.ZenoPullRefresh{
  height: 100%;
  position: relative;
  overflow: auto;
  .pull-refresh-header{
    width: 100%;
    height: 90rpx;
    transform: translateY(-100%);
    overflow: hidden;
    position: absolute;
    top: 0;
  }
  .loading{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    color: #888;
    height: 100%;
    width: 100%;
    .loading-image{
      margin-right: 20rpx;
    }
  }
}
</style>