<template>
  <view class="ZenoInput">
    <view class="ZenoInput-left">{{ title }}: </view>
    <view class="ZenoInput-content">
      <view class="content-main">
        <input :value="inputValue" @input="inputChange" :placeholder="placeholder" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      inputValue: '',
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String],
      default: ''
    },
  },
  watch: {
    value: {
      handler (val) {
        this.inputValue = val
      },
      immediate: true
    }
  },
  methods: {
    inputChange (e) {
      this.$emit('input', e.detail.value)
    }
  }
}
</script>

<style lang="scss">
.ZenoInput {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  margin-bottom: 20rpx;
  .ZenoInput-left {
    white-space: nowrap;
    font-size:28rpx;
    padding: 0 30rpx;
  }
  .ZenoInput-content{
    flex: 1;
  }
  .content-main{
    height: 50rpx;
    padding: 15rpx 25rpx;
    background:#FFF;
    line-height:50rpx;
    flex: 1;
    display: flex;
    align-items: center;
    input{
      width: 100%;
      font-size: 28rpx;
    }
  }
}
</style>