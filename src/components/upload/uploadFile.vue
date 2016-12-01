<template>
    	<a class="radius3" href="javascript:;" @click="uploadTeamImg">
        <i class="iconfont">&#xe628;</i>&nbsp;&nbsp;上传
      <input type="file" name="fileToUpload" v-model="filetType" id="fileToUpload" @change="fileSelected" style="display:none;">
      </a>
</template>

<script type="text/javascript">
  import StringUtil from '../../assets/js/stringUtil'
  import gloabl from '../../api/globConfig'

  export default {
    props: ['type', 'groupItem'],
    data() {
      return {
        filetType: '',
        urlImg: null
      }
    },
    methods: {
      uploadTeamImg() {
        document.getElementById("fileToUpload").click();
        gloabl.searchGroup(this, this.type);

      },
      fileSelected(ev) {
        var files = ev.target.files[0],
          filesName = files.name,
          img = new Image();
        if (window.URL) {
          this.urlImg = img.src = window.URL.createObjectURL(files);
        } else if (window.FileReader) {
          var reader = new FileReader();
          reader.readAsDataURL(files);
          this.urlImg = img.src = this.result;
        }
        if (this.urlImg != null) {
          var name = filesName.substring(0, filesName.lastIndexOf('.'));
          var index = filesName.lastIndexOf(".");
          var DM00106 = filesName.substr(index + 1);
          var data = {
            msgId: StringUtil.UUId(32), //id
            DM00103: StringUtil.dateFormat(), //时间
            DM00105: name,
            DM00106: DM00106, //文件后缀
            DM00108: files.size, //文件大小
            DM00109: '',
            DM00112: '',
            DM00113: '',
            DM00116: '',
            isUpload: 1,
            objFile: files
          }
          this.loadDiloag(data);

        }
      },
      loadDiloag(data) {
        this.$store.dispatch('SHARE_DOC_DATA', data)
          // console.log(this.groupItem)
        this.$store.dispatch('CHOOSE_FILES_ITEM', this.groupItem)
        layer.open({
          type: 1,
          title: '文件上传',
          area: ['400px'],
          skin: '',
          content: $('#fileShareModel')
        });
      }
    }
  }
</script>
