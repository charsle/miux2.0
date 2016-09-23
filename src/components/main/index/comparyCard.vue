<template>
	<div class="HOME_SLIDER_HEADERT">
		<div class="HEADER_GROUP_INFO">
			<a href="javascript:;" class="photo"><img :src="teamPic | getUrl"  id="teamimage"/></a>
			<a href="javascript:;" v-cloak>{{teamName}}</a>
		</div>
	</div>
</template>
<script>
import gloabl from '../../../api/globConfig'
	export default{
		data(){
			return {
				teamPic:JSON.parse(gloabl.getCookie('allUserInfo')).company.TM00109,
				teamName:JSON.parse(gloabl.getCookie('allUserInfo')).company.TM00106
			}
		}
	}
</script>
