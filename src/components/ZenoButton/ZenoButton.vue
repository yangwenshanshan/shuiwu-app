<template>
  <view class="zeno-button">
    <view class="button-main">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.zeno-button{
  padding: 0 24rpx;
  .button-main{
    height: 80rpx;
    background: #3761F4;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 40rpx;
    font-size: 32rpx;
  }
}
</style>