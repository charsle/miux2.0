<template>
	<div class="col-xs-6" id="imageCode">
		<div class="col-xs-7">
			<input type="text" v-model="login_code" id="login_code" name="login_code" @keyup="getValue" placeholder="请输入验证码" class="form-control code_edit"
			/>
		</div>
		<div class="col-xs-5 ESWFW001Code">
			<img :src="img_url" @click="changeCode($event)">
		</div>
	</div>
</template>

<script type="text/javascript">
	import {
		IMAGE_CODE_URL
	} from '../../api/restfull';
	export default {
		props: ['isExpand', 'isType'],
		data() {
			return {
				login_code: '',
				img_url: IMAGE_CODE_URL + '?UMT02=' + this.isType
			}
		},
		methods: {
			changeCode(ev) {
				ev.target.setAttribute('src', this.img_url + '&time=' + (+new Date()));
			},
			getValue() {
				//console.log(this.login_code)
				this.$dispatch('code-val', this.login_code);
			}
		}
	}
</script>