<template>
  <view class="ZenoScrollView">
    <ZenoRefreshList ref="ZenoRefreshList" @scrollUpdate="scrollUpdate" @scrollBottom="scrollBottom">
      <slot v-for="(item, index) in list" name="scope" :row="item" :index="index"></slot>
      <template v-if="list && list.length">
        <view v-if="!isError && isFinish" class="loading-placeholder">没有更多了</view>
        <view v-if="!isError && !isFinish" class="loading-placeholder">加载中...</view>
        <view v-if="isError" class="loading-placeholder" @click="getList">请求失败，点击重新加载</view>
      </template>
    </ZenoRefreshList>
  </view>
</template>

<script>
export default {
  name: 'ZenoScrollView',
  data () {
    return {
      isLoading: false,
      isError: false,
      isFinish: false,
      list: [],
      refreshType: 'pull',
      xhr: null
    }
  },
  props: {
    autoFecth: {
      type: Boolean,
      default: true
    },
    method: {
      type: Function,
      require: false
    },
    params: {
      type: Object,
      default () {
        return {}
      }
    },
    limit: {
      type: Number,
      default: 20
    },
  },
  mounted () {
    if (this.autoFecth) {
      this.start()
    }
  },
  methods: {
    getList () {
      if (this.method) {
        let params = {
          limit: this.limit + 1,
          offset: this.refreshType === 'pull' ? 0 : this.list.length,
          ...this.params
        }
        this.isLoading = true
        this.isError = false
        this.abortXhr()
        const { xhr, promise } = this.method(params)
        this.xhr = xhr
        promise.then(res => {
          this.xhr = null
          this.cancel()
          const list = res.data
          if (list.length > this.limit) {
            list.pop()
          } else {
            this.isFinish = true
          }
          if (this.refreshType === 'pull') {
            this.list = list
          } else {
            this.list = this.list.concat(list)
          }
        }).catch(() => {
          this.xhr = null
          this.isError = true
          this.cancel()
        })
      }
    },
    scrollUpdate () {
      this.getList()
    },
    scrollBottom () {
      this.refreshType  = ''
      if (this.isFinish && this.isLoading) {
        return false
      }
      this.getList()
    },
    reset () {
      this.refreshType = 'pull'
      this.list = []
    },
    start () {
      this.$refs.ZenoRefreshList.start()
    },
    cancel () {
      this.isLoading = false
      this.$refs.ZenoRefreshList.cancel()
    },
    abortXhr () {
      if (this.xhr) {
        this.xhr.abort()
        this.xhr = null
      }
    }
  }
}
</script>

<style lang="scss">
.ZenoScrollView{
  .loading-placeholder{
    height: 90rpx;
    width: 100%;
    text-align: center;
    font-size: 28rpx;
    color: #969799;
    line-height: 90rpx;
  }
}
</style>