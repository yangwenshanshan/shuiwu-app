<template>
  <view class="ZenoSpinner" :style="spinnerStyle">
    <view class="spinner-container container1">
      <view class="circle1 view" :style="containerView"></view>
      <view class="circle2 view" :style="containerView"></view>
      <view class="circle3 view" :style="containerView"></view>
      <view class="circle4 view" :style="containerView"></view>
    </view>
    <view class="spinner-container container2">
      <view class="circle1 view" :style="containerView"></view>
      <view class="circle2 view" :style="containerView"></view>
      <view class="circle3 view" :style="containerView"></view>
      <view class="circle4 view" :style="containerView"></view>
    </view>
    <view class="spinner-container container3">
      <view class="circle1 view" :style="containerView"></view>
      <view class="circle2 view" :style="containerView"></view>
      <view class="circle3 view" :style="containerView"></view>
      <view class="circle4 view" :style="containerView"></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ZenoSpinner',
  data () {
    return {
      spinnerStyle: null,
      containerView: null
    }
  },
  mounted () {
    this.spinnerStyle = `width:${this.size}rpx;height:${this.size}rpx`
    this.containerView = `width:${parseInt(this.size) / 3.75}rpx;height:${parseInt(this.size) / 3.75}rpx;background:${this.color}`
  },
  props: {
    size: {
      type: Number,
      default: 30
    },
    color: {
      type: String,
      default: '#23304D'
    }
  },
}
</script>

<style lang="scss">
.ZenoSpinner {
  width: 30rpx;
  height: 30rpx;
  position: relative;

  .container1 > .view, .container2 > .view, .container3 > .view {
    width: 8rpx;
    height: 8rpx;
    border-radius: 50%;
    position: absolute;
    animation: bouncedelay 1.2s infinite ease-in-out;
    animation-fill-mode: both;
  }

  .spinner-container {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .container2 {
    transform: rotateZ(45deg);
  }
  .container3 {
    transform: rotateZ(90deg);
  }
  .circle1 {
    top: 0;
    left: 0;
  }
  .circle2 {
    top: 0;
    right: 0;
  }
  .circle3 {
    right: 0;
    bottom: 0;
  }
  .circle4 {
    left: 0;
    bottom: 0;
  }
  .container2 .circle1 {
    animation-delay: -1.1s;
  }
  .container3 .circle1 {
    animation-delay: -1.0s;
  }
  .container1 .circle2 {
    animation-delay: -0.9s;
  }
  .container2 .circle2 {
    animation-delay: -0.8s;
  }
  .container3 .circle2 {
    animation-delay: -0.7s;
  }
  .container1 .circle3 {
    animation-delay: -0.6s;
  }
  .container2 .circle3 {
    animation-delay: -0.5s;
  }
  .container3 .circle3 {
    animation-delay: -0.4s;
  }
  .container1 .circle4 {
    animation-delay: -0.3s;
  }
  .container2 .circle4 {
    animation-delay: -0.2s;
  }
  .container3 .circle4 {
    animation-delay: -0.1s;
  }
  @keyframes bouncedelay {
    0%, 80%, 100% {
      transform: scale(0.0);
    }
    40% {
      transform: scale(1.0);
    }
  }
}
</style>