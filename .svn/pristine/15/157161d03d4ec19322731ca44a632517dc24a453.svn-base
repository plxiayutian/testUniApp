<template>
	<view class="about">
		<view class="content">
			<view class="qrcode">
				<image src="/static/img/logo.png"></image>
				<text class="tip">福建省防汛抗旱指挥决策综合平台</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sourceLink: 'https://github.com/dcloudio/hello-uniapp'
			};
		},
		methods:{
			openLink() {
				window.open(this.sourceLink);
			}
		}
	}
</script>

<style>
	page,
	view {
		display: flex;
	}

	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}

	image {
		width: 100upx;
		height: 100upx;
	}

	.about {
		flex-direction: column;
		flex: 1;
	}

	.content {
		flex: 1;
		padding: 30upx;
		flex-direction: column;
		justify-content: center;
	}

	.qrcode {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.qrcode .tip {
		margin-top: 20upx;
	}

	.desc {
		margin-top: 30upx;
		display: block;
	}

	.code {
		color: #e96900;
		background-color: #f8f8f8;
	}
	
	.source {
		margin-top: 30upx;
		flex-direction: column;
	}
	
	.source-list {
		flex-direction: column;
	}
	.link {
		color: #007AFF;
	}
</style>
