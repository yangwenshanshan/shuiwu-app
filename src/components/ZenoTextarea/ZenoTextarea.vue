<template>
  <view class="ZenoTextarea">
    <view class="ZenoTextarea-title">{{ title }} </view>
    <view class="ZenoTextarea-content">
      <view class="content-main">
        <textarea :value="inputValue" @input="inputChange" :placeholder="placeholder"></textarea>
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
.ZenoTextarea{
  padding: 20rpx 30rpx;
  background: #fff;
  margin-bottom: 20rpx;
  .ZenoTextarea-title{
    font-size:28rpx;
  }
  .content-main{
    textarea{
      width: 100%;
      font-size: 28rpx;
      padding: 20rpx 0;
      height: 200rpx;
    }
  }
}
</style>