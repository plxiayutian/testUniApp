<template>
	<view>
		<!-- 九宫格 -->
		<uni-grid :data="dataImg" show-border="false" column-num="4" click="{index:Number}" v-on:click="uniGridClick"></uni-grid>

		<!-- 台风预报列表 -->
		<view class="uni-list">
			<navigator
				url="/pages/lyrical/lyrical"
				open-type="navigate"
				hover-class="navigator-hover"
			>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right uni-media-list">
						<view class="uni-media-list-logo">
							<image src="/static/img/tfyb.jpg"></image>
						</view>
						<view class="uni-media-list-body">
							<text class="uni-ellipsis uni_list_text">
								今年第1号台风'帕布'(热带风暴级)已于今天(5日)上午11点中前后从泰国南部
							</text>
						</view>
					</view>
				</view>
			</navigator>
		</view>
		
		<!-- 山洪预警 -->
		<view class="uni-card">
			<view class="uni-card-header">山洪预警</view>
			<view class="uni-card-content">
				<view class="uni-card-content-inner">
					包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）
				</view>
			</view>
			<view class="uni-card-footer">页脚</view>
		</view>
	</view>
</template>

<script>
import uniGrid from '@dcloudio/uni-ui/lib/uni-grid/uni-grid.vue';
import { gState, gMutations } from 'vuex';

export default {
	components: { uniGrid },
	data() {
		return {
			dataImg: [
				{ image: 'https://img-cdn-qiniu.dcloud.net.cn/img/shu.png', text: '汛情摘要' },
				{ image: 'https://img-cdn-qiniu.dcloud.net.cn/img/lindang.png', text: '雨情信息' },
				{ image: 'https://img-cdn-qiniu.dcloud.net.cn/img/laoren.png', text: '水情信息' },
				{ image: 'https://img-cdn-qiniu.dcloud.net.cn/img/liwu.png', text: '台风路径' },
				{ image: 'https://img-cdn-qiniu.dcloud.net.cn/img/maozi.png', text: '风情信息' },
				{ image: 'https://img-cdn-qiniu.dcloud.net.cn/img/shoutao.png', text: '卫星云图' },
				{ image: 'https://img-cdn-qiniu.dcloud.net.cn/img/shu.png', text: '气象雷达' },
				{
					image: 'https://img-cdn-qiniu.dcloud.net.cn/img/lindang.png',
					text: '一周天气图'
				},
				{ image: 'https://img-cdn-qiniu.dcloud.net.cn/img/liwu.png', text: '降水预报图' },
				{ image: 'https://img-cdn-qiniu.dcloud.net.cn/img/maozi.png', text: '雨量等值面' },
				{ image: 'https://img-cdn-qiniu.dcloud.net.cn/img/shoutao.png', text: '天气预报' },
				{ image: 'https://img-cdn-qiniu.dcloud.net.cn/img/shu.png', text: '数值预报' },
				{ image: 'https://img-cdn-qiniu.dcloud.net.cn/img/lindang.png', text: '系统管理' }
				/* {
					pageUrl: '/pages/user/user',
					src: 'https://img-cdn-qiniu.dcloud.net.cn/img/shu.png',
					text: '汛情摘要'
				} */
			]
		};
	},
	methods: {
		uniGridClick(data) {
			// console.log(JSON.stringify(gState.forcedLogin));
			console.log(JSON.stringify(data));
			if (data.index || data.index == 0) {
				const index = Number(data.index);
				switch (index) {
					case 0:
						uni.navigateTo({ url: '/pages/lyrical/lyrical' }); //汛情摘要
						break;
					case 1:
						uni.navigateTo({ url: '/pages/rain/rain' });    //雨情信息
						break;
					case 2:
						uni.navigateTo({ url: '/pages/water/water' });	//水情信息
						break;
					case 3:
						uni.navigateTo({ url: '/pages/typhoon/typhoon' });//台风路径
						break;
					case 4:
						uni.navigateTo({ url: '/pages/wind/wind' });	//风情信息
						break;
					case 5:
						uni.navigateTo({ url: '/pages/satellite/satellite' });//卫星云图
						break;
					case 6:
						uni.navigateTo({ url: '/pages/radar/radar' });	//气象雷达
						break;
					case 7:
						uni.navigateTo({ url: '/pages/weekWeather/weekWeather' });//一周天气图
						break;
					case 8:
						uni.navigateTo({
							url: '/pages/precipitationForecast/precipitationForecast' //降水预报图
						});
						break;
					case 9:
						uni.navigateTo({ url: '/pages/rainEquivalent/rainEquivalent' }); //雨量等值面
						break;
					case 10:
						uni.navigateTo({ url: '/pages/weatherForecast/weatherForecast' });//天气预报
						break;
					case 11:
						uni.navigateTo({ url: '/pages/numericalForecast/numericalForecast' });//数值预报
						break;
					case 12:
						uni.navigateTo({ url: '/pages/system/system' });//系统管理
						break;
					default:
						break;
				}
			}
		}
	}
};
</script>

<style>
.uni_list_text {
	white-space: pre-wrap;
	color: #666666;
	font-size: 30upx;
	line-height: 1.4;
}
</style>
