<template>
  <view class="zeno-cell" :class="half ? 'half-cell' : ''">
    <span v-show="label" :style="labelColor ? 'color:' + labelColor : color ? 'color:' + color : '#666666'" class="cell-label"><span v-show="required" style="color:red;margin-left:0px;">*</span>{{label}}：</span>
    <view :style="valueColor ? 'color:' + valueColor : color ? 'color:' + color : '#333333'" class="cell-value" :class="align + '-position'">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default () {
        return ''
      }
    },
    align: {
      type: String,
      default () {
        return 'right'
      }
    },
    half: {
      type: Boolean,
      default () {
        return false
      }
    },
    color: {
      type: String,
      default () {
        return ''
      }
    },
    labelColor: {
      type: String,
      default () {
        return ''
      }
    },
    valueColor: {
      type: String,
      default () {
        return ''
      }
    },
    required:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style lang="scss">
.zeno-cell{
  background: #fff;
  color: #666;
  font-size: 28rpx;
  font-weight: 400;
  padding: 20rpx 30rpx;
  display: flex;
  align-items: flex-start;
  line-height: 1.3;
  user-select: text;
  flex: 1 1 100%;
  .cell-label{
    margin-right: 8px;
    color: #A1A1A1;
  }
  .cell-value{
    display: inline-block;
    flex: 1;
    color: #2C2C2C;
  }
}
.half-cell{
  flex: 1 1 50% !important;
}
.right-position{
  text-align: right;
}
.left-position{
  text-align: left;
}
.center-position{
  text-align: center;
}
</style>