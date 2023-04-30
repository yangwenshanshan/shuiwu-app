<template>
  <view class="ZenoAppendix">
    <view class="ZenoAppendix-title">{{ title }} </view>
    <view class="ZenoAppendix-content">
        <ZenoUpload :value="value" @change="uploadChange"></ZenoUpload>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '附件'
    },
    value: {
      type: Array,
      default: []
    },
  },
  methods: {
    uploadChange (result) {
      this.$emit('change',result)
    }
  }
}
</script>

<style lang="scss">
.ZenoAppendix{
  padding: 20rpx 30rpx;
  background: #fff;
  margin-bottom: 20rpx;
  .ZenoAppendix-title{
    font-size:28rpx;
  }
  .ZenoAppendix-content{
    padding-top: 20rpx;
  }
}
</style>