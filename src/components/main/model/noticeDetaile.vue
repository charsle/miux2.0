<template>
	<div style="background: #ededed;" id="noticeDetaileItem">
		<div class="noticeDetaile" id="noticeDetaile" v-cloak>
			<h4 class="tc break bold fs25">{{noticeDetaile.title}}</h4>
			<div class="col-md-12 bottom lh30 fs12">
				附件&nbsp;&nbsp;<span class="light-grey">({{noticeLength}}个)</span>
			</div>
			<div class="col-md-12 ptb10 fs12">
				<div class="col-md-4 hoverBasic pointer" v-for="list in noticeDetaile.attachment" @click="downloadFile(list.key, list.type)">
					<div class="col-md-2 fs48">
						{{{list.type | valideType}}}
					</div>
					<div class="col-md-9 mt10 ml10">
						<div class="row">
							<div class="col-xs-10 overflow nowrap">
								{{list.attName}}
							</div>
						</div>
						<div class="row light-grey">
							{{list.size | fileSize}}
						</div>
					</div>
				</div>
				<div class="clearfix"></div>
			</div>
			<div class="col-md-12 lh18 break">
				{{{noticeDetaile.content}}}
			</div>
			<div class="col-md-12 light-grey mt15">
				由<span class="light-blue">{{noticeDetaile.userName}}</span>发布于{{noticeTime}}
			</div>
		</div>
		<div class="clearfix"></div>
	</div>
</template>

<script type="text/javascript">
	import gloabl from '../../../api/globConfig'
	import * as URL from '../../../api/restfull'
	export default {
		data() {
			return {
				noticeDetaile: Object,
				noticeTime: '',
				noticeLength: 0
			}
		},
		ready() {
			gloabl.doResizeHeight();
			this.getNoticeDetaile();
		},
		methods: {
			getNoticeDetaile() {
				var sid = sessionStorage.getItem('sid');
				gloabl.fethAsync([URL.NOTIC_DETAILE], 'MSG00101=' + sid, res => {
					if (res.success) {
						var result = res.result;
						result.MSG00109 = JSON.parse(result.MSG00109);
						this.noticeDetaile = result.MSG00109;
						this.noticeTime = result.MSG00106
						this.noticeLength = result.MSG00109.attachment.length
					}
				})
			},
			downloadFile(fileKey, type) {
				gloabl.getFileDownKey(fileKey, type);
			},

		}

	}
</script>
