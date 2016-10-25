<template id="">
  <div>
    <div class="HOME_CONTENT_HEADERT" style="height:50px;background:#009bff;line-height:50px;font-size:20px;color:#fff;padding-left:20px;">
miux后台管理系统
<div class="pull-right">
  <a href="javascript:;" class="fs16" style="color:#fff" @click="loginout">退出系统</a>&nbsp;
</div>
    </div>
    <manage></manage>
    <div id="rMenu">
      <ul>
        <li id="m_add" data-type="add">添加部门</li>
        <li id="m_del" data-type="del">删除部门</li>
        <li id="m_rename" data-type="rename">重命名</li>
      </ul>
    </div>
</div>

</template>
<script type="text/javascript">
  import '../../assets/css/main.css'
  import manage from '../main/manage/manage';
  import gloabl from '../../api/globConfig'
  export default {

    components: {
      manage

    },
    methods: {
      loginout() {
        layer.confirm('您确定退出系统？', function() {
          gloabl.loginOut();
        })

      }
    }


  }
</script>
<style type="text/css">
  div#rMenu {
    position: absolute;
    visibility: hidden;
    top: 0;
    background-color: #555;
    text-align: left;
    padding: 2px;
    border-radius: 5px;
  }

  div#rMenu ul li {
    margin: 1px 0;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    list-style: none outside none;
    color: #fff;
  }

  div#rMenu ul li:hover {
    background-color: #DFDFDF;
    color: #555;
  }
</style>
