<script>
	export default {
		onLaunch: function() {
			uni.reLaunch({
				url: '/pages/index/index'
			})
			this.$store.dispatch('refreshToken')
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
				}
			}
		},
		methods: {
		}
	}
</script>

<style>
page{
	background: #F1F1F1;
}
</style>
