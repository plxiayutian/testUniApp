<template>
	<view class="page-content">
		<!-- 顶部popup -->
		<uni-popup
			class="top_popup"
			:show="showPopupTop"
			type="top"
			v-on:hidePopup="hidePopup"
			:style="{ display: displayPop }"
		>
			<view class="uni-flex uni-column">
				<view class="flex-item" @click="onMenuItemClick(1)">
					<view class="uni-icon uni-icon-refreshempty"></view>
					<text>时间筛选</text>
				</view>
				<view class="flex-item" @click="onMenuItemClick(2)">
					<view class="uni-icon uni-icon-map" size="32"></view>
					<text>地图模式</text>
				</view>
				<view class="flex-item" @click="onMenuItemClick(3)">
					<view class="uni-icon uni-icon-location" size="32"></view>
					<text>区域选择</text>
				</view>
			</view>
		</uni-popup>
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
				<swiper-item>
					<scroll-view class="list" scroll-y @scrolltolower="loadMore(1)">
						<!-- 列表 -->
						<view class="uni-list">
							<block v-for="(item, index1) in dataList1.data" :key="index1">
								<view
									class="uni-list-cell"
									hover-class="uni-list-cell-hover"
									@click="goDetail(item)"
								>
									<view class="uni-media-list">
										<image class="uni-media-list-logo" :src="item.levelImg"></image>
										<!-- :src="setEwLevelImg(item)" -->
										<view
											class="uni-list-cell-navigate uni-navigate-right list_body"
										>
											<view class="list_body_left">
												<text>{{ item.title }}</text>
											</view>
											<view class="list_body_content">
												<text class="uni-ellipsis">
													{{ item.district }}
												</text>
											</view>
											<view class="list_body_right">
												{{
													item.count > 0
														? '+' + item.count
														: '-' + item.count
												}}
											</view>
										</view>
									</view>
								</view>
							</block>
						</view>
						<view class="uni-tab-bar-loading">
							<uni-load-more
								:loadingType="dataList1.loadingType"
								:contentText="dataList1.loadingText"
							></uni-load-more>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view class="list" scroll-y @scrolltolower="loadMore(2)">
						<!-- 列表 -->
						<view class="uni-list">
							<block v-for="(item, index1) in dataList2.data" :key="index1">
								<view
									class="uni-list-cell"
									hover-class="uni-list-cell-hover"
									@click="goDetail(item)"
								>
									<view class="uni-media-list">
										<image class="uni-media-list-logo" :src="item.levelImg"></image>
										<!-- :src="setEwLevelImg(item)" -->
										<view
											class="uni-list-cell-navigate uni-navigate-right list_body"
										>
											<view class="list_body_left">
												<text>{{ item.title }}</text>
											</view>
											<view class="list_body_content">
												<text class="uni-ellipsis">
													{{ item.district }}
												</text>
											</view>
											<view class="list_body_right">
												{{
													item.count > 0
														? '+' + item.count
														: '-' + item.count
												}}
											</view>
										</view>
									</view>
								</view>
							</block>
						</view>
						<view class="uni-tab-bar-loading">
							<uni-load-more
								:loadingType="dataList2.loadingType"
								:contentText="dataList2.loadingText"
							></uni-load-more>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import uniLoadMore from '../../components/uni-load-more.vue';
import uniPopup from '../../components/uni-popup.vue';
export default {
	components: {
		uniLoadMore,
		uniPopup
	},
	data() {
		return {
			scrollLeft: 0, //当前tab距左边的距离
			isClickChange: false, //是否点击切换
			tabIndex: 0, //当前tab的索引
			showPopupTop: false, //顶部popup的状态
			displayPop: 'none',
			tabBars: [
				{
					name: '站点水位统计',
					id: 'tab1'
				},
				{
					name: '测站降雨统计',
					id: 'tab2'
				}
			],
			dataList: [],
			dataList1: {
				loadingType: 1,
				loadingText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				data: null //政区统计
			},
			dataList2: {
				loadingType: 1,
				loadingText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				data: null //政区统计
			}
		};
	},
	//父页面传递过来的参数，地址栏传参
	onLoad: function(option) {
		this.dataList1.data = [
			{ id: 0, title: '夏坊w', level: 1, district: '光泽县', count: 2.3 },
			{
				id: 1,
				title: '沿江s',
				level: 1,
				district: '邵武市',
				count: 1.2
			},
			{
				id: 2,
				title: '钱坂w',
				level: 1,
				district: '武夷山市',
				count: 1.1
			},
			{
				id: 3,
				title: '盖洋s',
				level: 2,
				district: '延平区',
				count: 1.1
			},
			{
				id: 4,
				title: '和平村s',
				level: 2,
				district: '顺昌县',
				count: 0.9
			},
			{
				id: 5,
				title: '水茜s',
				level: 2,
				district: '松溪县',
				count: 2.3
			},
			{
				id: 6,
				title: '上青s',
				level: 3,
				district: '建宁',
				count: 0.4
			},
			{
				id: 7,
				title: '槐南w',
				level: 3,
				district: '浦城县',
				count: 0.4
			},
			{
				id: 8,
				title: '中村s',
				level: 3,
				district: '柘荣县',
				count: 0.3
			}
		];
		this.dataList2.data = [
			{ id: 0, title: '夏坊w', level: 1, district: '光泽县', count: 2.3 },
			{
				id: 1,
				title: '沿江s',
				level: 1,
				district: '邵武市',
				count: 1.2
			},
			{
				id: 2,
				title: '钱坂w',
				level: 1,
				district: '武夷山市',
				count: 1.1
			},
			{
				id: 3,
				title: '盖洋s',
				level: 2,
				district: '延平区',
				count: 1.1
			},
			{
				id: 4,
				title: '和平村s',
				level: 2,
				district: '顺昌县',
				count: 0.9
			},
			{
				id: 5,
				title: '水茜s',
				level: 2,
				district: '松溪县',
				count: 2.3
			},
			{
				id: 6,
				title: '上青s',
				level: 3,
				district: '建宁',
				count: 0.4
			},
			{
				id: 7,
				title: '槐南w',
				level: 3,
				district: '浦城县',
				count: 0.4
			},
			{
				id: 8,
				title: '中村s',
				level: 3,
				district: '柘荣县',
				count: 0.3
			}
		];
		this.dataList.push(this.dataList1);
		this.dataList.push(this.dataList2);

		//根据预警级别设置等级图标样式
		var _self=this;
		this.dataList1.data.forEach(function(item,i) {
			item.levelImg = _self.setEwLevelImg(item);
			return item;
		});
		this.dataList2.data.forEach(function(item,i) {
			item.levelImg =  _self.setEwLevelImg(item);
			return item;
		});

		this.getData();
	},
	methods: {
		//初始化数据获取
		getData: function() {
			// 			uni.request({
			// 				url: 'https://demo.hcoder.net/index.php?user=hcoder&pwd=hcoder&m=list1&page=1',
			// 				method: 'GET',
			// 				success: function(res){
			uni.stopPullDownRefresh(); //停止下拉刷新动画
			// 				}
			// 			});
		},
		//详情页
		goDetail(option) {
			uni.navigateTo({
				url:
					'/pages/rain/rainDetail??paramData=' +
					encodeURIComponent(JSON.stringify(option))
			});
		},
		//滚动加载
		loadMore(e) {
			this.dataList[e].loadingType = 1;
			setTimeout(() => {
				this.addData(e);
			}, 1200);
		},
		//数据动态加载
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
		//tab切换
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
		//得到元素的size
		getElSize(id) {
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
		//点击tab-bar
		async tapTab(index) {
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
		},
		//统一的关闭popup方法
		hidePopup: function() {
			this.showPopupTop = false;
			// #ifdef H5
			this.displayPop = 'none';
			// #endif
		},
		//展示顶部 popup
		showTopPopup: function(e) {
			this.showPopupTop = true;
			// #ifdef H5
			this.displayPop = 'block';
			// #endif
		},
		//菜单列表栏目点击事件
		onMenuItemClick: function(index) {
			// #ifndef H5
			switch (index) {
				case 1:
					plus.nativeUI.alert('时间筛选');
					break;
				case 2:
					plus.nativeUI.alert('地图模式');
					break;
				case 3:
					plus.nativeUI.alert('区域选择');
					break;
				default:
					break;
			}
			// #endif

			// #ifdef H5
			switch (index) {
				case 1:
					alert('时间筛选');
					break;
				case 2:
					alert('地图模式');
					break;
				case 3:
					alert('区域选择');
					break;
				default:
					break;
			}
			// #endif
			this.hidePopup();
		},
		setEwLevelImg: function(item) {
			let srcImg = '';
			switch (item.level) {
				case 1:
					srcImg = '/static/img/tool-icon/village-level1.png';
					break;
				case 2:
					srcImg = '/static/img/tool-icon/village-level2.png';
					break;
				case 3:
					srcImg = '/static/img/tool-icon/village-level3.png';
					break;
				default:
					srcImg = '/static/img/tool-icon/village-level1.png';
					break;
			}
			return srcImg;
		}
	},
	//导航栏按钮点击事件
	onNavigationBarButtonTap: function(e) {
		switch (e.index) {
			case 0:
				this.showTopPopup(); //展示顶部popup
				break;
			default:
				break;
		}
	},
	//下拉刷新事件
	onPullDownRefresh() {
		this.getData();
	}
};
</script>

<style lang="scss">
/* tabbar样式 start */
.uni-tab-bar .swiper-tab-list {
	width: 50%;
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
.uni-media-list {
	padding: 20upx;
}
.uni-media-list-logo {
	width: 20upx;
	height: 20upx;
	margin: auto 20px;
	/* top: 20upx; */
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
.uni-list-cell-navigate.uni-navigate-right:after {
	right: 0;
}
.list_body {
	height: auto;
	padding: 0;
}
.list_body .list_body_left {
	width: 140upx;
	font-size: 32upx;
}
.list_body .list_body_content {
	text-align: center;
	width: 50%;
	color: #666;
}
.list_body .list_body_right {
	width: 120upx;
	font-size: 32upx;
	margin-right: 16upx;
}

/* #ifndef H5 */
.uni-popup-top {
	height: auto;
	width: 240upx;
	left: inherit;
	right: 0;
	color: #fff;
	background-color: #0066cc;
	-webkit-border-radius: 10upx;
	-moz-border-radius: 10upx;
	border-radius: 10upx;
	padding-bottom: 20upx;
}
.top_popup .flex-item {
	line-height: 1.5;
	font-size: 36upx;
}
/* #endif */

/* #ifdef H5*/
.top_popup {
	position: absolute;
	top: 0;
	right: 0;
	width: 240upx;
	height: 200upx;
	z-index: 100;
	display: none;
	color: #fff;
	background-color: #0066cc;
	-webkit-border-radius: 10upx;
	-moz-border-radius: 10upx;
	border-radius: 10upx;
}
.uni-popup-top {
	height: 0 !important;
}
.top_popup .flex-item {
	font-size: 36upx;
}
/* #endif */
.top_popup .flex-item .uni-icon {
	margin-right: 20upx;
}
</style>
