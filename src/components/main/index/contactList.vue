<template>
	<div class="CONTANCT_LIST" id="slide_contact_items">
		<div class="CONTACT_START">
			<div class="contact_title">
				<a href="javascript:" @click="currentRightTag('star','')">星标<i class="glyphicon glyphicon-menu-right fr lh25"></i></a>
			</div>
			<div class="contact_items">
				<ul>
					<li v-for="item in starList" v-cloak>
						<a v-if="item.userSid==1" v-link="{name:'contact',params:{name:item.username,sendid:item.userSid,sendtype:3}}">
							<i class="iconfont">&#xe632;</i>&nbsp;&nbsp;{{item.username}}
						</a>
						<a v-else v-link="{name:'contact',params:{name:item.username,sendid:item.userSid,sendtype:1}}" v-cloak>
							<i class="iconfont">&#xe606;</i>&nbsp;&nbsp;{{item.username}}
							<i class="green line_circle fr lh25" v-if="item.online==1? true:false"></i>
							<i class="grey line_circle fr lh25" v-if="item.online==0? true:false"></i>
						</a>   
					</li>
				</ul>
			</div>
		</div>
		<div class=" CONTACT_GROUP ">
			<div class="contact_title ">
				<a href="javascript:" @click="currentRightTag('books','booksGroups')">频组 <i class="glyphicon glyphicon-menu-right fr lh25"></i></a>
			</div>
			<div class="contact_items ">
				<ul>
					<li v-for="item in groupItem">

						<a v-link="{name:'contact',params:{name:item.UM0404,sendid:item.UM0403,sendtype:2}}" v-cloak>
							<i class="iconfont" v-if="item.UM0406==2">&#xe632;</i>
							<i class="iconfont" v-else>&#xe632;</i> &nbsp;&nbsp;{{item.UM0404}}
							<!--<i class="green line_circle fr lh25" v-if="item.online==1"></i>
							<i class="grey line_circle fr lh25" v-if="item.online==0"></i>-->

						</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="CONTACT_START">
			<div class="contact_title">
				<a href="javascript:" @click="currentRightTag('books','')">联系人<i class="glyphicon glyphicon-menu-right fr lh25"></i></a>
			</div>
			<div class="contact_items">
				<ul>
					<li v-for="item in contactItem">
						<a v-cloak v-link="{name:'contact',params:{name:item.UM0404,sendid:item.UM0403,sendtype:1}}"><i class="iconfont">&#xe606;</i>&nbsp;&nbsp;{{item.UM0404}}
							<i class="green line_circle fr lh25" v-if="item.online==1"></i>
							<i class="grey line_circle fr lh25" v-if="item.online==0"></i>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'

	export default {
		data() {
			return {
				contactItem: [],
				starList: [],
				groupItem: [],
				//					scretItem: []
			}
		},
		ready() {
			this.getContactList();
			this.getMainStarList();
			gloabl.doResizeHeight();
		},
		methods: {
			currentRightTag(type) {
				this.$store.dispatch('SWITCH_RIGHT', type)
			},
			getMainStarList() {
				gloabl.fethAsync([URL.BOOKS_FOR_STAR_URL], '', res => {
					if (res.success) {
						if (res.result.length != 0) {
							this.starList = res.result;
						}

					}
				});
			},
			getContactList() {
				gloabl.fethAsync([URL.CONTACT_URL], '', res => {
					if (res.success) {
						var allList = res.result;
						if (allList != null) {
							for (let item of allList) {
								if (item.UM0406 == 1) {
									this.contactItem.push(item);
								} else {
									this.groupItem.push(item);
								}
							}
						}

						//this.messageList = res.result;
						//this.messageList =messageData;
					}

				})
			}
		}
	}
</script>

<style lang="less">
	.CONTANCT_LIST {
		a {
			padding: 10px 0px 10px 20px;
			display: block;
			color: #fff;
			font-size: 12px;
			&:hover {
				background: #292C33;
			}
			&.v-link-active {
				background: #464f5d;
			}
		}
		.contact_title a,
		{
			font-size: 14px;
			position: relative;
			i {
				position: absolute;
				right: 10px;
				top: 7px;
			}
		}
	}
</style>
