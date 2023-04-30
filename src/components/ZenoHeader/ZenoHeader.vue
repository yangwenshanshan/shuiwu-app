<template>
  <view class="header-component">
    <view class="header-title-placeholder" :style="'height:' + statusBarHeight + 'px'"></view>
    <view class="header-title">
      <view class="title-center">{{ title }}</view>
      <view class="title-right">
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      statusBarHeight: 0
    }
  },
  created () {
    const systemInfo = uni.getSystemInfoSync()
		this.statusBarHeight = systemInfo.statusBarHeight
  }
}
</script>

<style lang="scss">
.header-component{
  .header-title-placeholder{
    width: 100%;
    background: #fff;
  }
  .header-title{
    font-size: 36rpx;
	  background: #fff;
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
    position: relative;
		.title-center{
			text-align: center;
      font-weight: bold;
      color: #000;
		}
    .title-right{
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      height: 100%;
      top: 0;
      right: 30rpx;
    }
  }
}
</style>