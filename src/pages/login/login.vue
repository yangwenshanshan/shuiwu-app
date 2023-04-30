<template>
	<view class="container">
		<view class="back">
			<view class="title">
				<view class="logo"></view>
			</view>
			<view class="ipt">
				<input type="text" class="numb" value="" placeholder="请输入手机号码" v-model="phone" />
			</view>
			<view class="ipt bottom">
				<input type="text" class="numb" value="" placeholder="请输入验证码" v-model="phoneCode" />
				<view class="text on" @click="pushCode" v-if="!isPushCode">获取验证码</view>
				<view class="text" v-if="isPushCode">{{second}}秒后重新获取</view>
			</view>
			<view class="btn" @click="loginTap">登录</view>
		</view>
	</view>
</template>

<script>
import { api } from '../../api';
export default {
  data() {
    return {
      phone: '18618386178',
      phoneCode: '',
      isPushCode: false,
      second: 60,
    }
  },
  methods: {
    pushCode() {
      api.sendMobileCode({
        mobile: this.phone
      }).promise.then(res => {
        this.phoneCode = res.data.smsCode
      })
      // const resVerify = this.$util.isPhoneNum(this.phone)
      // if (!resVerify.status) {
      // 	this.$msg(resVerify.msg)
      // 	return
      // }
      // const param = {
      // 	mobile: this.phone
      // }
      // const res = await this.$req('post', this.$api.mobileSend, param, true);
      // if (!res.data) {
      // 	this.$msg(res.msg);
      // 	return
      // }
      // this.phoneCode = res.data.smsCode
      // this.isPushCode = true
      // const interval = setInterval(() => {
      // 	if (this.second <= 0) {
      // 		this.second = 60
      // 		this.isPushCode = false
      // 		clearInterval(interval)
      // 		return
      // 	}
      // 	this.second--
      // }, 1000)
    },
    async loginTap() {
      // if (!this.phone) {
      // 	this.$msg('请输入手机号码');
      // 	return;
      // }
      // if (!this.phoneCode) {
      // 	this.$msg('请输入验证码');
      // 	return;
      // }
      this.$store.dispatch('loginIn', {
        code: this.phoneCode,
      	mobile: this.phone,
      })
      // const res = await this.$req('post', this.$api.login, param, true);
      // if (!res.success) {
      // 	this.$msg('登录失败');
      // 	return;
      // }
      // const data = res.data
      // data.currentDate = new Date().getTime()
      // this.login(data)
      // this.getSettings()
      // this.$msg('登录成功', () => {
      // });
    }
  }
}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.container {
		width: 100%;
		height: 100%;
		padding: 0 92rpx;
		box-sizing: border-box;
		background: url(https://ella-crawler.oss-cn-hangzhou.aliyuncs.com/images/1679904884696.png) center no-repeat;
		background-size: cover;

		.title {
			display: flex;
			align-items: center;
			justify-content: center;
			padding-top: 300rpx;
			margin-bottom: 116rpx;

			.logo {
				width: 239rpx;
				height: 84rpx;
				// background: url(../../static/login.png) center no-repeat;
				background-size: cover;
			}

			.text {
				font-size: 28rpx;
				font-family: FZLTHK;
				font-weight: normal;
				color: #363636;
			}
		}

		.ipt {
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding-bottom: 21rpx;
			border-bottom: 2rpx solid #979797;
			margin-bottom: 70rpx;

			.text {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #6D7278;
			}

			.text.on {
				color: #3761F4;
			}

			.numb {
				font-size: 30rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #2C2C2C;
			}
		}

		.ipt.bottom {
			margin-bottom: 147rpx;
		}

		.btn {
			width: 100%;
			padding: 28rpx 0;
			background: #3761F4;
			border-radius: 4rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
			border-radius: 50rpx;
		}
	}
</style>