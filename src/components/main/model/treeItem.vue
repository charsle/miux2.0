<template>
	<li>
		<a href="javascript:;" :class="{bold: isFolder}" @click="toggle(model.id,$event)">
			<i class="glyphicon" :class="[open ? 'glyphicon-triangle-bottom' : 'glyphicon-triangle-right']"></i> &nbsp;&nbsp;{{model.name}}
		</a>
		<ul v-show="open" v-if="isFolder">
			<tree-item v-for="model in model.children" :model="model">
			</tree-item>
		</ul>
	</li>
</template>
<style type="text/css">
	.bold_curr{
		background: #53beff;
		color: #fff!important;
	}
</style>
<script type="text/javascript">
	export default {
		props: ['model','itemtype'],
		data() {
			return {
				open: false
			}
		},
		
		computed: {
			isFolder: function() {
				return this.model.children &&
					this.model.children.length
			},
			
		},
		methods: {
			toggle(id, ev) {
				if(this.isFolder) {
					this.open = !this.open;
				}
				var supper=sessionStorage.getItem('supper');
				$('.choose_team a').removeClass('bold_curr');
				$(ev.currentTarget).addClass('bold_curr');
				console.log(supper);
				if(supper=='supper'){
					this.$store.dispatch('AREA_MANAGE', id);
				}
				this.$store.dispatch('DEPART_LIST_PERSON', id);

			}

		}

	}
</script>