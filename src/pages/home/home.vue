<template>
  <view class="home-page">
    <ZenoHeader title="首页">
      <template #right>
        <image class="icon-header" src="../../static/icon-head.png" mode="widthFix"></image>
      </template>
    </ZenoHeader>
    <view class="home-main">
      <view class="home-block">
        <view class="block-title">
          工单
        </view>
        <view class="block-item-list">
          <view class="block-item" @click="goIndex(1)">
            <image src="../../static/icon-status-1.png" mode="aspectFill"></image>
            <view class="">处理中</view>
          </view>
          <view class="block-item" @click="goIndex(2)">
            <image src="../../static/icon-status-2.png" mode="aspectFill"></image>
            <view class="">已完成</view>
          </view>
        </view>
      </view>
      <view class="home-block">
        <view class="block-title">
          审批
        </view>
        <view class="block-item-list">
          <view class="block-item" @click="goApprove">
            <image src="../../static/icon-approve.png" mode="aspectFill"></image>
            <view class="">我的审批</view>
          </view>
          <view class="block-item" @click="goIndex(2)">
            <image src="../../static/icon-contract.png" mode="aspectFill"></image>
            <view class="">合同</view>
          </view>
          <view class="block-item" @click="goIndex(2)">
            <image src="../../static/icon-askForLeave.png" mode="aspectFill"></image>
            <view class="">请假</view>
          </view>
        </view>
      </view>
      <view class="home-block">
        <view class="block-title">
          办公
        </view>
        <view class="block-item-list">
          <view class="block-item" @click="goCheckIn">
            <image src="../../static/icon-checkIn.png" mode="aspectFill"></image>
            <view class="">打卡</view>
          </view>
          <view class="block-item" @click="goDaily">
            <image src="../../static/icon-daily.png" mode="aspectFill"></image>
            <view class="">日报</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
	data () {
		return {
		}
	},
	methods: {
		goIndex (status) {
			uni.navigateTo({
				url: '/pages/index/index?status=' + status
			})
		},
    goApprove () {
      uni.navigateTo({
				url: '/pages/approve/approve'
			})
    },
		goDaily () {
			uni.navigateTo({
				url: '/pages/daily/daily'
			})
		},
		goCheckIn () {
			uni.navigateTo({
				url: '/pages/checkIn/checkIn'
			})
		}
	}
}
</script>

<style lang="scss">
.home-page{
	height: 100vh;
  .icon-header{
    width: 55rpx;
    height: 55rpx;
  }
	.home-title-placeholder{
		width: 100%;
		background: #fff;
	}
	.home-title{
	  font-size: 36rpx;
	  background: #fff;
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		.title-text{
			text-align: center;
		}
	}
	.home-main{
		padding: 20rpx;
		.home-block{
			margin-bottom: 20rpx;
			background: #fff;
			padding: 30rpx 47rpx;
			border-radius: 20rpx;
			.block-title{
				font-size: 34rpx;
				color: #000;
				font-weight: bold;
				padding-bottom: 20rpx;
			}
			.block-item-list{
				display: flex;
				flex-wrap: wrap;
				.block-item{
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					width: 25%;
					margin-bottom: 20rpx;
					font-size: 24rpx;
          view{
          }
					image{
						width: 80rpx;
						height: 80rpx;
						margin-bottom: 10rpx;
					}
				}
			}
		}
	}
}
</style>