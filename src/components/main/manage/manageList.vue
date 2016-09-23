<template>
	<table class="table table-striped fs12">
		<tr class="fs14 bold">
			<td><input type="checkbox" name="" id="" value="" />&nbsp;&nbsp;姓名</td>
			<td>手机</td>
			<td>部门</td>
			<td>职位</td>
			<td>工号</td>
			<td>查看权限</td>
			<td>状态</td>
		</tr>
		<tbody  v-for="item in manageItem">
			<tr>
				<td><input type="checkbox" name="" id="" value="" />&nbsp;&nbsp;{{item.TM00306}} </td>
				<td>{{item.TM00308}}</td>
				<td>{{item.orgCname}}</td>
				<td>{{item.TM00322}}</td>
				<td>{{item.TM00318}}</td>
				<td>{{item.TM00320}}级</td>
				<td>{{item.TM00317}}</td>
			</tr>
		</tbody>
	</table>
</template>
<script type="text/javascript">
	export default{
		props:['manageItem'],
	}
</script>