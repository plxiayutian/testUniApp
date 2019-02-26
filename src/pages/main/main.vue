<template>
	<view>
		<!-- 九宫格 -->
		<uni-grid
			:data="dataImg"
			show-border="false"
			column-num="4"
			click="{index:Number}"
			v-on:click="uniGridClick"
		></uni-grid>

		<!-- 台风预报列表 -->
		<view class="uni-list">
			<view
				class="uni-list-cell"
				hover-class="uni-list-cell-hover"
				@click="typhoonListClick(typhoonList)"
			>
				<view class="uni-list-cell-navigate uni-navigate-right uni-media-list">
					<view class="uni-media-list-logo typhoonListImg">
						<image src="/static/img/tfyb.jpg"></image>
					</view>
					<view class="uni-media-list-body">
						<text class="uni-ellipsis list_text">{{ typhoonList.txtContent }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 山洪预警 -->
		<view class="my_list">
			<view class="my_list_title">山洪预警</view>
			<view class="uni-list">
				<block v-for="(value, key) in floodWarning" :key="key">
					<view
						class="uni-list-cell"
						hover-class="uni-list-cell-hover"
						@click="floodWarningListClick(value)"
					>
						<view class="uni-list-cell-navigate uni-navigate-right">
							<view class="list_body div_column">
								<view class="list_body_left">
									<text>{{ value.name }}</text>
								</view>
								<view class="list_body_right">
									<text class="uni-ellipsis uni-text-red">
										一级 {{ value.levels.level1 }}
									</text>
									<text class="uni-ellipsis uni-text-orange">
										二级 {{ value.levels.level2 }}
									</text>
									<text class="uni-ellipsis uni-text-yellow">
										三级 {{ value.levels.level3 }}
									</text>
								</view>
								<view class="text_detail">详情</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>

		<!-- 雨情 -->
		<view class="my_list">
			<view class="my_list_title">雨情</view>
			<view class="uni-list">
				<block v-for="(value, key) in rainList" :key="key">
					<view
						class="uni-list-cell"
						hover-class="uni-list-cell-hover"
						@click="uniListClick(value)"
					>
						<view class="uni-list-cell-navigate uni-navigate-right uni-media-list ">
							<view class="uni-media-list-logo">
								<image :src="value.img"></image>
							</view>
							<view class="uni-media-list-body flex-direction-row list_body">
								<view class="list_body_left">
									<view class="uni-media-list-text-top">{{ value.title }}</view>
									<view class="uni-media-list-text-bottom uni-ellipsis">
										<text>{{ value.district }}</text>
									</view>
								</view>
								<view class="list_body_right">
									<text class="uni-ellipsis uni-text-red">
										{{ value.content }}
									</text>
								</view>
							</view>
						</view>
					</view>
				</block>
				<uni-load-more
					:loadingType="loadingType"
					:contentText="contentText"
				></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
import uniGrid from '@dcloudio/uni-ui/lib/uni-grid/uni-grid.vue';
import uniLoadMore from '../../components/uni-load-more.vue';

import { gState, gMutations } from 'vuex';

export default {
	components: { uniGrid, uniLoadMore },
	data() {
		return {
			//宫格列表
			dataImg: [],
			//台风预报
			typhoonList: {},
			//山洪预警
			floodWarning: [],
			//雨情
			rainList: [],
			//滚动加载
			loadingType: 0,
			contentText: {
				contentdown: '上拉显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			}
		};
	},
	//监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参)
	onLoad(data) {	//可以在这里调用页面初始化接口，获取数据，初始化页面
		this.dataImg = [
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
		];
		this.typhoonList = {
			txtContent: "今年第1号台风'帕布'(热带风暴级)已于今天(5日)上午11点中前后从泰国南部"
		};
		this.floodWarning = [
			{
				type: 1,
				name: '村庄预警',
				levels: {
					level1: 3,
					level2: 2,
					level3: 5
				}
			},
			{
				type: 2,
				name: '水库预警',
				levels: {
					level1: 6,
					level2: 5,
					level3: 8
				}
			},
			{
				type: 3,
				name: '村庄预警',
				levels: {
					level1: 5,
					level2: 7,
					level3: 5
				}
			}
		];
		this.rainList = [
			{
				id: 1,
				img: '/static/img/files/1.png',
				title: '金饶山',
				district: '三明市大田县',
				content: '累计降雨53.6mm'
			},
			{
				id: 2,
				img: '/static/img/files/2.png',
				title: '大田县',
				district: '三明市大田县',
				content: '累计降雨53.6mm'
			},
			{
				id: 3,
				img: '/static/img/files/3.png',
				title: '金饶山',
				district: '三明市大田县',
				content: '累计降雨53.6mm'
			}
		];
	},
	onReady() {
		//监听页面初次渲染完成
	},
	methods: {
		//宫格点击事件
		uniGridClick(data) {
			console.log(JSON.stringify(data));
			if (data.index || data.index == 0) {
				const index = Number(data.index);
				switch (index) {
					case 0:
						uni.navigateTo({ url: '/pages/lyrical/lyrical' }); //汛情摘要
						break;
					case 1:
						uni.navigateTo({ url: '/pages/rain/rain' }); //雨情信息
						break;
					case 2:
						uni.navigateTo({ url: '/pages/water/water' }); //水情信息
						break;
					case 3:
						uni.navigateTo({ url: '/pages/typhoon/typhoon' }); //台风路径
						break;
					case 4:
						uni.navigateTo({ url: '/pages/wind/wind' }); //风情信息
						break;
					case 5:
						uni.navigateTo({ url: '/pages/satellite/satellite' }); //卫星云图
						break;
					case 6:
						uni.navigateTo({ url: '/pages/radar/radar' }); //气象雷达
						break;
					case 7:
						uni.navigateTo({ url: '/pages/weekWeather/weekWeather' }); //一周天气图
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
						uni.navigateTo({ url: '/pages/weatherForecast/weatherForecast' }); //天气预报
						break;
					case 11:
						uni.navigateTo({ url: '/pages/numericalForecast/numericalForecast' }); //数值预报
						break;
					case 12:
						uni.navigateTo({ url: '/pages/system/system' }); //系统管理
						break;
					default:
						break;
				}
			}
		},
		//台风预报列表点击事件
		typhoonListClick: function(option) {
			uni.navigateTo({
				url:
					'/pages/typhoon/typhoonDetail?paramData=' +
					encodeURIComponent(JSON.stringify(option))
			});
		},
		//山洪预警列表点击事件
		floodWarningListClick:function(option) {
			if(option.type==1){  //村庄
				uni.navigateTo({
					url:
						'/pages/earlyWarning/villageEarlyWarning?paramData=' +
						encodeURIComponent(JSON.stringify(option))
				});
			}else if(option.type==2){	//水库
				uni.navigateTo({
					url:
						'/pages/earlyWarning/reservoirEarlyWarning?paramData=' +
						encodeURIComponent(JSON.stringify(option))
				});
			}else if(option.type==3){	//河道
				uni.navigateTo({
					url:
						'/pages/earlyWarning/riverEarlyWarning?paramData=' +
						encodeURIComponent(JSON.stringify(option))
				});
			}
		},
		//雨情列表点击事件
		uniListClick: function(option) {
			uni.navigateTo({
				url:
					'/pages/rain/rainDetail?paramData=' + encodeURIComponent(JSON.stringify(option))
			});
		}
	},
	onReachBottom() {  //滚动加载事件
		if (this.loadingType !== 0) {
			return;
		}
		this.loadingType = 1;
		let rainList = [],
			length = 10;  	//每次滚动加载的数量
		for (let i = 0; i < length; i++) {
			rainList.push({
				id: 3,
				img: '/static/img/files/3.png',
				title: '金饶山',
				district: '三明市大田县',
				content: '累计降雨53.6mm'
			});
		}
		setTimeout(() => {
			if (length > 20) {
				this.loadingType = 2;
				return;
			}
			this.rainList = this.rainList.concat(rainList);
			this.loadingType = 0;
		}, 800);
	}
};
</script>

<style lang="scss">
/* 台风预报 start */
.typhoonListImg {
	width: 100upx !important;
	height: 100upx !important;
}
.list_text {
	white-space: pre-wrap;
	color: #666666;
	font-size: 30upx;
	line-height: 1.4;
}
/* 台风预报 end */

/* 列表样式 start */
.uni-media-list-logo {
	width: 180upx;
	height: 140upx;
}

.uni-media-list-body {
	height: auto;
	justify-content: space-around;
}

.uni-media-list-text-top {
	height: 74upx;
	font-size: 28upx;
	overflow: hidden;
}

.uni-media-list-text-bottom {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.list_body {
	height: auto;
	width: 100%;
}
.list_body_left,
.list_body_right {
	width: 50%;
}
.list_body_right > text {
	margin-left: 16upx;
}
.text_detail{
	width: 120upx;
	text-align: center;
}
/* 列表样式 end */
</style>
