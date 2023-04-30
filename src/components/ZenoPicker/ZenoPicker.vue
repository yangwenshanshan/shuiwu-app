<template>
  <view class="ZenoPicker">
    <view class="ZenoPicker-left">{{ title }}: </view>
    <view class="ZenoPicker-content">
      <picker @change="change" :value="index" :range="options" range-key="label">
        <view class="content-main" :class="options[index] ? '' : 'no-choose'">{{options[index] ? options[index].label : placeholder}}</view>
      </picker>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      index: -1
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
    options: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    value: {
      handler (val) {
        this.index = this.options.findIndex(el => el.value === val)
      },
      immediate: true
    },
    options: {
      handler (val) {
        this.index = val.findIndex(el => el.value === this.value)
      },
      immediate: true
    }
  },
  methods: {
    change (e) {
      this.index = e.detail.value
      this.$emit('input', this.options[this.index].value)
    }
  }
}
</script>

<style lang="scss">
.ZenoPicker {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  margin-bottom: 20rpx;
  .ZenoPicker-left {
    white-space: nowrap;
    font-size:28rpx;
    padding: 0 30rpx;
  }
  .ZenoPicker-content{
    flex: 1;
  }
  .content-main{
    height: 50rpx;
    padding: 15rpx 25rpx;
    line-height:50rpx;
    font-size:28rpx;
    background:#FFF;
    flex: 1;
  }
  .no-choose{
    color: #ccc;
  }
}
</style>