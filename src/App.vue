<script>
	import storage from './utils/storage'
	import { api } from './api'
	export default {
		onLaunch: function() {
			uni.reLaunch({
				url: '/pages/index/index'
			})
			this.refreshToken()
		},
		onShow: function() {
		},
		onHide: function() {
		},
		computed: {
			loginStatus () {
				return this.$store.state.login.loginStatus
			}
		},
		watch: {
			loginStatus: {
				handler (value) {
					value === 1 && uni.redirectTo({
						url: '/pages/home/home'
					})
					value === 2 && uni.redirectTo({
						url: '/pages/login/login'
					})
				},
				immediate: true
			}
		},
		methods: {
			refreshToken () {
				const rt = storage.get('refresh_token')
				if (rt) {
					api.refreshToken({
						refresh_token: storage.get('refresh_token')
					}).promise.then(res => {
						if (res.data.access_token && res.data.refresh_token) {
							this.$store.commit('setLoginStatus', 1)
							storage.set('token', res.data.access_token)
							storage.set('refresh_token', res.data.refresh_token)
							setTimeout(() => {
								this.refreshToken()
							}, res.data.expires);
						}
					}).catch((error) => {
						this.$store.commit('setLoginStatus', 2)
					})
				} else {
					console.log(2)
					this.$store.commit('setLoginStatus', 2)
				}
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
