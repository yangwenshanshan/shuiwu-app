<template>
  <view class="ZenoTabs" v-if="tabs && tabs.length">
    <view :class="activeIndex === index ? 'zeno-tab_active' : ''" class="zeno-tab" v-for="(item, index) in tabs" :key="index" @click="changeTab(item, index)">{{ item.title }} <view class="re-dot" v-if="item.count !== undefined">{{ item.count }}</view> </view>
    <view class="zeno-tabs__line" :style="'transform: translateX(' + tabWidthHalf + 'px) translateX(-50%);'"></view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: -1
    },
    tabs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    value: {
      handler (val) {
        this.$nextTick(() => {
          this.showHighLight(val)
        })
      },
      immediate: true
    }
  },
  mounted () {
    const query = uni.createSelectorQuery().in(this);
    query.selectAll('.zeno-tab').boundingClientRect(refs => {
      let left = 0
      refs.forEach((ref, i) => {
        if (i === 0) {
          this.tabWidthHalf = ref.width / 2
        }
        left = left + ref.width
        this.$set(this.tabs[i], 'tabWidthHalf', left - ref.width / 2)
      })
    }).exec();
  },
  data () {
    return {
      tabWidthHalf: 0,
      activeIndex: -1
    }
  },
  methods: {
    changeTab (item, index) {
      this.showHighLight(index)
      this.$emit('change', index)
    },
    showHighLight (index) {
      this.activeIndex = index
      this.tabWidthHalf = this.tabs[index].tabWidthHalf
    }
  }
}
</script>

<style lang="scss">
.ZenoTabs{
  position: relative;
  display: flex;
  background-color: #fff;
  user-select: none;
  height: 70rpx;
  border-bottom: 1px solid #979797;
  .zeno-tab{
    font-size: 28rpx;
    &.zeno-tab_active{
      color: #3761F4;
    }
    position: relative;
    display: flex;
    flex: 1 0 auto;
    // flex: 1;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 8rpx;
    color: #000;
    font-size: 28rpx;
    line-height: 40rpx;
    font-weight: bold;
    cursor: pointer;
  }
  .zeno-tabs__line{
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 80rpx;
    height: 6rpx;
    background-color: #3761F4;
    border-radius: 6rpx;
    transition-duration: 0.3s;
  }
  .re-dot{
    font-size: 24rpx;
    background: red;
    padding: 0 10rpx;
    height: 30rpx;
    border-radius: 30rpx;
    color: #fff;
    line-height: 30rpx;
    margin-left: 10rpx;
  }
}
</style>