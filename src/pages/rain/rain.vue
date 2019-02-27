<template>
	<!-- 选项卡 -->
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view
				v-for="(tab, index) in tabBars"
				:key="tab.id"
				:class="['swiper-tab-list', tabIndex == index ? 'active' : '']"
				:id="tab.id"
				:data-current="index"
				@click="tapTab(index)"
			>
				{{ tab.name }}
			</view>
		</scroll-view>
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<!-- 选项内容 -->
			<swiper-item v-for="(tab, index1) in dataList" :key="index1">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
					<block v-for="(dataListItem, index2) in tab.data" :key="index2">
						<!-- 列表 -->
						<view class="uni-list">
							<view
								class="uni-list-cell"
								hover-class="uni-list-cell-hover"
								@click="goDetail(dataListItem)"
							>
								<view class="uni-media-list">
									<image
										class="uni-media-list-logo"
										:src="dataListItem.img"
									></image>
									<view
										class="uni-list-cell-navigate uni-navigate-right list_body"
									>
										<view class="list_body_left">
											<text>{{ dataListItem.title }}</text>
										</view>
										<view class="list_body_content">
											<text class="uni-ellipsis">
												降雨量{{ dataListItem.rainfall }}
											</text>
										</view>
										<view class="list_body_right">
											{{ dataListItem.count }}个测站
										</view>
									</view>
								</view>
							</view>
						</view>
					</block>
					<view class="uni-tab-bar-loading">
						<uni-load-more
							:loadingType="tab.loadingType"
							:contentText="loadingText"
						></uni-load-more>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import uniLoadMore from '../../components/uni-load-more.vue';
export default {
	components: {
		uniLoadMore
	},
	data() {
		return {
			loadingText: {
				contentdown: '上拉显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			scrollLeft: 0, //当前tab距左边的距离
			isClickChange: false, //是否点击切换
			tabIndex: 0, //当前tab的索引
			tabBars: [
				{
					name: '政区统计',
					id: 'ZQ'
				},
				{
					name: '降雨统计',
					id: 'JY'
				},
				{
					name: '各县最大统计',
					id: 'GXZD'
				}
			],
			dataList: [{}, {}, {}], //列表数据
			dataZQ: [], //政区统计
			dataJY: [], //降雨统计
			dataGXZD: [] //各县最大统计
		};
	},
	onLoad: function(option) {
		//父页面传递过来的参数，地址栏传参

		this.dataJY = [
			{
				id: 0,
				title: '特大暴雨',
				img: 'https://img-cdn-qiniu.dcloud.net.cn/img/shu.png',
				rainfall: '250mm以上',
				count: 2
			},
			{
				id: 1,
				title: '大暴雨',
				img: 'https://img-cdn-qiniu.dcloud.net.cn/img/shu.png',
				rainfall: '100~249.9mm',
				count: 7
			},
			{
				id: 2,
				title: '暴雨',
				img: 'https://img-cdn-qiniu.dcloud.net.cn/img/shu.png',
				rainfall: '50~99.9mm',
				count: 11
			},
			{
				id: 3,
				title: '大雨',
				img: 'https://img-cdn-qiniu.dcloud.net.cn/img/shu.png',
				rainfall: '25-24.9mm',
				count: 15
			},
			{
				id: 4,
				title: '中雨',
				img: 'https://img-cdn-qiniu.dcloud.net.cn/img/shu.png',
				rainfall: '10-24.9mm',
				count: 25
			},
			{
				id: 5,
				title: '中雨',
				img: 'https://img-cdn-qiniu.dcloud.net.cn/img/shu.png',
				rainfall: '0-9.9mm',
				count: 29
			}
		];
		this.dataZQ = this.dataJY;
		this.dataGXZD = this.dataJY;
		this.dataList = [
			{
				loadingType: 2,
				data: this.dataZQ
			},
			{
				loadingType: 1,
				data: this.dataJY
			},
			{
				loadingType: 1,
				data: this.dataGXZD
			}
		];
		// console.log(JSON.stringify(this.dataList));
	},
	methods: {
		goDetail(option) {
			uni.navigateTo({
				url:
					'/pages/rain/rainDetail??paramData=' +
					encodeURIComponent(JSON.stringify(option))
			});
		},
		loadMore(e) {
			this.dataList[e].loadingType = 1;
			setTimeout(() => {
				this.addData(e);
			}, 1200);
		},
		addData(e) {
			if (this.dataList[e].data.length > 30) {
				this.dataList[e].loadingType = 2;
				return;
			}
			for (let i = 1; i <= 10; i++) {
				this.dataList[e].data.push(this['data' + this.tabBars[this.tabIndex].id]);
			}
			this.dataList[e].loadingType = 1;
		},
		async changeTab(e) {
			let index = e.detail.current;
			if (this.isClickChange) {
				this.tabIndex = index;
				this.isClickChange = false;
				return;
			}
			let tabBar = await this.getElSize('tab-bar'),
				tabBarScrollLeft = tabBar.scrollLeft;
			let width = 0;

			for (let i = 0; i < index; i++) {
				let result = await this.getElSize(this.tabBars[i].id);
				width += result.width;
			}
			let winWidth = uni.getSystemInfoSync().windowWidth,
				nowElement = await this.getElSize(this.tabBars[index].id),
				nowWidth = nowElement.width;
			if (width + nowWidth - tabBarScrollLeft > winWidth) {
				this.scrollLeft = width + nowWidth - winWidth;
			}
			if (width < tabBarScrollLeft) {
				this.scrollLeft = width;
			}
			this.isClickChange = false;
			this.tabIndex = index; //一旦访问data就会出问题
		},
		getElSize(id) {
			//得到元素的size
			return new Promise((res, rej) => {
				uni.createSelectorQuery()
					.select('#' + id)
					.fields(
						{
							size: true,
							scrollOffset: true
						},
						data => {
							res(data);
						}
					)
					.exec();
			});
		},
		async tapTab(index) {
			//点击tab-bar
			if (this.tabIndex === index) {
				return false;
			} else {
				let tabBar = await this.getElSize('tab-bar'),
					tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
				this.scrollLeft = tabBarScrollLeft;
				this.isClickChange = true;
				this.tabIndex = index;
				this.dataList[index].loadingType = 2;
			}
		}
	}
};
</script>

<style>
/* tabbar样式 start */
.uni-tab-bar .swiper-tab-list {
	width: 33.33%;
	line-height: 99upx;
}
.uni-tab-bar .active {
	border-bottom: 2upx solid #007aff;
}
/* tabbar样式 end */

/* #ifdef MP-ALIPAY */
.swiper-tab-list {
	display: inline-block;
}
/* #endif */

/* 列表样式 start */
.uni-media-list{
	padding: 20upx;
}
.uni-media-list-logo {
	width: 100upx;
	height: 100upx;
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
.uni-list-cell-navigate.uni-navigate-right:after{
	right: 0;
}
.list_body {
	height: auto;
	padding: 0;
}
.list_body .list_body_left{
	width: 140upx;
	font-size: 32upx;
}
.list_body .list_body_content{
	width: 50%;
	color: #666;
}
.list_body .list_body_right{
	width: 150upx;
	font-size: 32upx;
	margin-right: 16upx;
}
</style>
