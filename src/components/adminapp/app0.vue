<template>

<div class="container">
  <div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">
            测试成员上传
        </h3>
    </div>
    <div class="panel-body">
      <input type="file" id="xlsfile" name="file" value="">
      <button type="button" name="button" @click="uploadFile">文件上传</button>
    </div>
</div>
</div>


</template>


<script type="text/javascript">
  import gloabl from '../../api/globConfig'
  import * as URL from '../../api/restfull'
  import {
    uploadAll
  } from '../../assets/js/upload';
  export default {

    methods: {
      uploadFile() {
        var up_file = document.getElementById('xlsfile');
        if (up_file.value === '') {
          gloabl.tipTools('上传文件为空,请选择!', '#xlsfile');
          return;
        }
        uploadAll(2, up_file.files[0], 'xls', '', function(res) {

        });
      }
    }


  }
</script>
