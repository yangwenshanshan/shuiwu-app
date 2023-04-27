<template>
	<view class="content">
		<!-- :height="scrollHeight" -->
		<scrollpull ref="scrollpull" @scrollUpdate="scrollUpdate" @scrollBottom="scrollBottom">
			<view class="">
				11111111111111
			</view>
			<view class="">
				11111111111111
			</view>
			<view class="">
				11111111111111
			</view>
    </scrollpull>
		<!-- <image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				scrollHeight: '600rpx'
			}
		},
		onLoad() {

		},
		methods: {
			scrollUpdate (e) {
				console.log('scrollUpdate', e)
				setTimeout(() => {
					this.$refs.scrollpull.cancel()
				}, 2000);
			},
			scrollBottom (e) {
				console.log('scrollBottom', e)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
