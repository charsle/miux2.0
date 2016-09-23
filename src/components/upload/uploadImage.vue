<template>
    <div class="header_up manage_up" @click="uploadTeamImg">
      <i class="glyphicon glyphicon-camera"></i>
      <input type="file" v-model="filetType" id="fileToUpload" @change="fileSelected" accept="image/jpg,image/jpeg,image/png" style="display:none;">
    </div>
    <!-- <script id="uploadImgTemplate" style="display:none">
      <jcrop :tag="type" :files-obj="filesObj"></jcrop>
    </script> -->
    <modal title="头像上传" :show.sync="show" @ok="ok" :large='true' @cancel="cancel">
      <jcrop :tag="type" :files-obj="filesObj"></jcrop>
</modal>
</template>

<script type="text/javascript">
  import jcrop from './jcrop';
  export default {
    props: ['type'],
    data() {
      return {
        filetType: '',

        urlImg: null,
        filesObj: Object,
        show: false,
        lstfile: '',
      }
    },
    components: {
      jcrop
    },
    methods: {
      ok() {},
      cancel() {},
      uploadTeamImg() {
        document.getElementById("fileToUpload").click();
      },
      fileSelected(ev) {
        var files = ev.target.files[0],
          img = new Image(),
          baseW_H = {};

        if (window.URL) {
          if (typeof files == 'undefined') {
            this.files[0] = this.lstfile;
            return;
          } else {
            this.lstfile = files;
          }
          this.urlImg = img.src = window.URL.createObjectURL(files);

        } else if (window.FileReader) {
          var reader = new FileReader();
          reader.readAsDataURL(files);
          this.urlImg = img.src = this.result;

        } else {
          ev.target.select();
          ev.target.blur();
          var nfile = document.selection.createRange().text;
          document.selection.empty();
          this.urlImg = img.src = nfile;

        }
        console.log(this.urlImg);

        if (this.urlImg != null) {
          setTimeout(() => {

            this.filesObj = {
              files: files.name,
              url: this.urlImg,
              baseW_H: {
                width: img.width,
                height: img.height
              }
            }
          }, 60)
          this.show = true;
        }



        // return;
        // layer.open({
        //   type: 1,
        //   shade: 0.2,
        //   title: '头像上传',
        //   area: ['850px', '500px'],
        //   content: $('#uploadImgTemplate'),
        // });

      },

    }
  }
</script>
