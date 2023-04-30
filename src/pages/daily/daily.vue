<template>
  <view class="daily-page">
    <ZenoMultiScrollView :value.sync="queryType" :tabs="tabs">
      <template v-slot:scope="scope">
        <view class="daily-item">
          <view class="item-title-content">
            <view class="item-title">张三提交的请假</view>
            <view class="item-time">04.23 10:23</view>
          </view>
          <view class="item-content">请假类型：事假</view>
          <view class="item-content">开始时间：2023.04.22 10.0</view>
          <view class="item-content">结束时间：2023.04.23 18:0</view>
          <view class="item-content">合同类型：收入</view>
          <view class="item-content">合同金额：124034</view>
          <view class="item-content">合同期限类型：固定期限</view>
          <view class="item-status-yellow">李四处理中</view>
          <view class="item-status-red">审批拒绝</view>
          <view class="item-status-green">审批完成</view>
        </view>
      </template>
      <template slot="other" v-if="queryType === 1">
        <view class="write-daily">
          <ZenoPicker title="汇报给" v-model="defaultArrayValue" :options="array" placeholder="请选择汇报人"></ZenoPicker>
          <ZenoInput title="地点" v-model="defaultArrayValue" placeholder="请选择地点"></ZenoInput>
          <ZenoTextarea title="日报内容" v-model="defaultArrayValue" placeholder="请输入内容"></ZenoTextarea>
          <ZenoAppendix title="附件" :value="attachments" @change="uploadChange"></ZenoAppendix>
          <ZenoCellGroup>
            <ZenoCell label="时间" half>04:11</ZenoCell>
            <ZenoCell label="时间" half>04:11</ZenoCell>
            <ZenoCell label="时间">04:11</ZenoCell>
          </ZenoCellGroup>
          <ZenoButton>下一步</ZenoButton>
        </view>
      </template>
    </ZenoMultiScrollView>
  </view>
</template>

<script>
import { api } from '../../api'
export default {
  data () {
    return {
      attachments: [
        // {
        //   "directus_files_id": "76d5c208-7463-40a6-919c-7049241d28eb",
        //   "id": 127,
        //   "water_well_id": "5d20103d-1117-4873-969f-f4fcc1f447c5"
        // }, {
        //   "directus_files_id": "db9dfbbc-240c-43e8-9ba2-9525d1fde118",
        //   "id": 136,
        //   "water_well_id": "5d20103d-1117-4873-969f-f4fcc1f447c5"
        // }
      ],
      queryType: 1,
      defaultArrayValue: '1111111111',
      array: [{label:'中国', value: 1},{label: '美国', value: 2}, {label:'巴西', value: 3}, {label:'日本', value: 4}],
      tabs: [{
        index: 1,
        title: '写日报',
      }, {
        index: 2,
        title: '我发出的',
        method: api.getWaterWellList,
      }, {
        index: 3,
        title: '发给我的',
        method: api.getWaterWellList,
      }]
    }
  },
  mounted () {
  },
  methods: {
    uploadChange (result) {
      console.log(result)
    },
  }
}
</script>

<style lang="scss">
.daily-page{
  .daily-item{
    background: #fff;
    margin-bottom: 20rpx;
    border-radius: 16rpx;
    padding: 30rpx 40rpx;
    margin-bottom: 14rpx;
    .item-title-content{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item-title{
        font-size: 34rpx;
        color: #2C2C2C;
        font-weight: bold;
        margin-bottom: 28rpx;
        display: flex;
        align-items: center;
        // justify-content: center;
        &::before{
          content: '';
          display: inline-block;
          background: #3761F4;
          height: 31rpx;
          width: 7rpx;
          margin-right: 17rpx;
        }
      }
      .item-time{
        color: #A1A1A1;
        font-size: 24rpx;
      }
    }
    .item-content{
      color: #A1A1A1;
      font-size: 28rpx;
    }
    .item-status-yellow{
      color: #FF8400;
      font-size: 28rpx;
      margin-top: 24rpx;
    }
    .item-status-red{
      color: #E60012;
      font-size: 28rpx;
      margin-top: 24rpx;
    }
    .item-status-green{
      color: #009944;
      font-size: 28rpx;
      margin-top: 24rpx;
    }
  }
  .write-daily{
    padding-top: 20rpx;
  }
}
</style>