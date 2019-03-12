<template>
	<view>
		台风详情
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataDetail:{}
			};
		},
		onLoad(event) { //父页面传递过来的参数，地址栏传参
			console.log(JSON.stringify(event.paramData));
			
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.dataDetail = JSON.parse(decodeURIComponent(event.paramData));
			} catch (error) {
				this.dataDetail = JSON.parse(event.paramData);
			}
		}
	}
</script>

<style>

</style>
