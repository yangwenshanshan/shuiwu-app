<template>
  <view class="zeno-cell-group">
    <slot></slot>
  </view>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.zeno-cell-group{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20rpx;
}
</style>