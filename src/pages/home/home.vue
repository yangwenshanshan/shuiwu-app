<template>
  <view>
		<ZenoMultiScrollView :value.sync="queryType" :tabs="tabs">
			<template v-slot:scope="scope">
				<view style="height: 80px">{{ scope.row.id }}</view>
      </template>
    </ZenoMultiScrollView>
  </view>
</template>

<script>
import { api } from '../../api'
export default {
  data () {
    return {
      queryType: 1,
      tabs: [{
        index: 1,
        title: '待处理',
        method: api.getWaterWellList,
			  params: {
          ttt: 1
        },
      }, {
        index: 2,
        title: '已处理',
        method: api.getWaterWellList,
			  params: {
          ttt: 2
        },
      }]
    }
  }
}
</script>

<style>

</style>