<template>
  <view class="ZenoUpload-list">
    <view class="ZenoUpload-item" v-for="(item, index) in parentValues" :key="item.directus_files_id">
      <image :src="imgIdToURL(item.directus_files_id)" mode="aspectFit"></image>
      <view v-if="!disabled" class="uploader__preview-delete" @click="delParentValues(index)"></view>
    </view>
    <view class="ZenoUpload-item" v-for="(item, index) in uploadedQueue" :key="item.directus_files_id">
      <image :src="imgIdToURL(item.directus_files_id)" mode="aspectFit"></image>
      <view class="uploader__preview-delete" @click="delUploaded(index)"></view>
      <view class="item-progress">上传完成</view>
    </view>
    <view class="ZenoUpload-item" v-for="(item, index) in uploadingQueue" :key="item.timeKey">
      <image :src="item.url" mode="aspectFit"></image>
      <view class="item-progress" v-if="item.progress > 0">{{ item.progress }}%</view>
      <view class="item-progress" v-else>等待中...</view>
      <view class="uploader__preview-delete" @click="delUploading(index)"></view>
    </view>
    <view class="ZenoUpload-item" @click="chooseImage" v-if="!disabled">
      <image src="../../static/icon-upload.png" mode="aspectFit"></image>
    </view>
  </view>
</template>

<script>
import { imgIdToURL } from '../../utils/utils'
import { HOST } from '../../config'
import storage from '../../utils/storage'

export default {
  name: 'ZenoUpload',
  data () {
    return {
      uploading: false,
      uploadedQueue: [],
      uploadingQueue: [],
      parentValues: [],
      deleteList: []
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: 9
    },
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted () {
    this.parentValues = [...this.value]
  },
  methods: {
    delParentValues (index) {
      const item = this.parentValues.splice(index, 1)[0]
      this.deleteList.push(item.directus_files_id)
      this.emitResult()
    },
    delUploaded (index) {
      this.uploadedQueue.splice(index, 1)
      this.emitResult()
    },
    delUploading (index) {
      this.uploadingQueue.splice(index, 1)
      this.emitResult()
    },
    imgIdToURL (id) {
      return imgIdToURL(id)
    },
    chooseImage () {
      uni.chooseImage({
        count: this.count,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
      }).then(res => {
        res.tempFilePaths.forEach((url, index) => {
          this.uploadingQueue.push({
            timeKey: index + '_' + new Date().getTime(),
            url: url,
            progress: 0,
          })
        })
        if (!this.uploading) {
          this.uploading = true
          this.upLoadImg()
        }
      })
    },
    emitResult () {
      this.$emit('change', {
        create: this.uploadedQueue,
        update: [],
        delete: this.deleteList
      })
    },
    upLoadImg () {
      if (this.uploadingQueue && this.uploadingQueue.length) {
        const path = this.uploadingQueue[0].url
        const uploadTask = uni.uploadFile({
          url: `${HOST}/files`,
          filePath: path,
          name: 'file',
          header: {
            Authorization: `Bearer ${storage.get('token')}`
          },
          complete: () => {
            this.upLoadImg()
          },
          success: (res) => {
            this.$set(this.uploadingQueue[0], 'progress', 100)
            const file = JSON.parse(res.data)
            this.uploadingQueue.splice(0, 1)
            this.uploadedQueue.push({
              ticket_comment_id: '+',
              directus_files_id: file.data.id
            })
          },
        })
        uploadTask.onProgressUpdate((res) => {
          if (res.progress !== 100) {
            this.$set(this.uploadingQueue[0], 'progress', res.progress)
          }
        })
      } else {
        this.uploading = false
        this.emitResult()
      }
    }
  }
}
</script>

<style lang="scss">
.ZenoUpload-list{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .ZenoUpload-item{
    width: 150rpx;
    height: 150rpx;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
    position: relative;
    image{
      width: 100%;
      height: 100%;
    }
    .item-progress{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 30rpx;
      font-size: 24rpx;
      background: rgba(0, 0, 0, 0.7);
      text-align: center;
      color: #fff;
    }
    .uploader__preview-delete{
      position: absolute;
      top: 0;
      right: 0;
      width: 30rpx;
      height: 30rpx;
      background-color: rgba(0, 0, 0, 0.7);
      border-radius: 0 0 0 28rpx;
      color: #fff;
      &::after{
        content: '+';
        display: inline-block;
        transform: rotate(45deg);
        position: absolute;
        top: -10rpx;
        right: -2rpx;
        color: #fff;
        font-size: 32rpx;
      }
    }
  }
}
</style>