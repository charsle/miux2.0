<template>
  <div>
			<!-- <div class="row" style="width:850px;margin:10px 0 0 0;">
				<div class="pull-left tc">
					<img src="../../../static/images/sago.jpg" id="target" alt="[Jcrop Example]" />
				</div>
				<div style="margin-left: 0px;float:left;width:230px;">
					<div class="right_select" style="color:#949ca0">
						<div>
							<p class="rect_name fw w100">我的名片头像</p>
							<div class="rect_content" style="margin: 10px 0;">
								<div id="viewrect-pane">
									<div class="viewrect-container">
										<img src="../../../static/images/sago.jpg" class="jcrop-preview" alt="Preview" />
									</div>
								</div>

							</div>
							<p class="circle_name mt20 fw w100">我的消息头像</p>
							<div class="circle_content" style="padding-left:54px;margin:10px 0 60px 0;">
								<div id="viewcircle-pane">
									<div class="viewcircle-container">
										<img src="../../../static/images/sago.jpg" class="jcrop-preview" alt="Preview" />
									</div>
								</div>

							</div>
						</div> -->

						<!-- <div>
                <p class="circle_name mt20 fw w100">团队LOGO</p>
                <div class="circle_content" style="padding-left:54px;margin:10px 0 60px 0;"></div>
              </div>
              <div>
                <p class="circle_name mt20 fw w100">频组头像</p>
                <div class="circle_content" style="padding-left:54px;margin:10px 0 60px 0;"></div>
              </div> -->
					<!-- </div>

					<div class="btn_cut_fun mt30 w100">
						<a href="javascript:;" id="localPhotoImg" class="localphoto-style fw">本地照片</a>
						<a href="javascript:;" action-type="close" id="localPhotoImgDrop" class="btn btn-cancle" style="width:70px;margin:0 10px 0 22px;">取消</a>
						<a href="javascript:;" action-type="confirm" id="localPhotoImgOK" class="btn btn-sure" style="width:70px;">确定</a>
					</div>
				</div>:style="{width:files.baseW_H.width,height:files.baseW_H.height}"
			</div> -->
      {{files | json}}
      <img :src="files.url" id="target" alt="[Jcrop Example]" :style="{width:getWidthAndHeight.width,height:getWidthAndHeight.height}"/>
      <div id="viewrect-pane">
        <div class="viewrect-container">
          <img :src="files.url" class="jcrop-preview" alt="Preview" :style="{width:getWidthAndHeight.width,height:getWidthAndHeight.height}"/>
        </div>
      </div>
      <!-- <div id="viewcircle-pane">
        <div class="viewcircle-container">
          <img src="../../../static/images/sago.jpg" class="jcrop-preview" alt="Preview" />
        </div>
      </div> -->
		</div>
</template>
<script type="text/javascript">
  import 'jquery-jcrop/css/jquery.jcrop.css';
  import Jcrop from 'jquery-jcrop';
  export default {
    props: ['tag', 'filesObj'],
    data() {
      return {
        jcrop_api: null,
        minSizeWidth: 0,
        minSizeHeight: 100,
        $viewrect: null,
        $rectcnt: null,
        $rectimg: null,
        $viewcircle: null,
        $circleimg: null,
        boundx: 0,
        boundy: 0,
        files: {}
      }
    },
    watch: {
      filesObj: {
        handler() {
          this.files = this.filesObj
          $('img[alt="[Jcrop Example]"],.jcrop-holder img').attr('src', this.files.url);
        }
      }
    },
    computed: {
      getWidthAndHeight: function() {
        var imgWidth = this.files.hasOwnProperty('baseW_H') ? this.files.baseW_H.width : 0,
          imgHeight = this.files.hasOwnProperty('baseW_H') ? this.files.baseW_H.height : 0;
        console.log(imgWidth, imgHeight)
        var width = 600;
        var height = 400;
        var baseBl = parseInt(width / height).toFixed(0);
        var imgBl = parseInt(imgWidth / imgHeight).toFixed(0);
        if (imgBl >= baseBl) {
          //以宽度作为计算标准
          if (imgWidth > width) {
            imgHeight = (width / imgWidth) * imgHeight;
            imgWidth = width;
          }
        } else {
          //以高度作为计算标准
          if (imgHeight > height) {
            imgWidth = (height / imgHeight) * imgWidth;
            imgHeight = height;
          }
        }
        return {
          width: imgWidth,
          height: imgHeight
        }
      },
    },
    ready() {

      this.initJcrop();


    },
    methods: {

      //初始化插件
      initJcrop() {
        var _this = this,
          scale = 0;
        if (_this.tag == 1) {
          scale = 20;
        } else {
          scale = 10;
        }
        console.log(_this.files)
        _this.minSizeWidth = (_this.minSizeHeight * scale) / 10;
        _this.$viewrect = $('#viewrect-pane'); //矩形选择框
        _this.$rectcnt = $('#viewrect-pane .viewrect-container'); //矩形容器
        _this.$rectimg = $('#viewrect-pane .viewrect-container img'); //矩形容器中的图片
        // _this.$viewcircle = $('#viewcircle-pane'); //圆形
        // _this.$circleimg = $('#viewcircle-pane .viewcircle-container img'); //圆形容器中的图片
        //
        _this.showJcrop()
      },
      showJcrop() {
        var _this = this;
        $('#target').Jcrop({
          allowSelect: false,
          aspectRatio: 2 / 1,
          boxWidth: _this.getWidthAndHeight.width + 'px',
          boxHeight: _this.getWidthAndHeight.height + 'px',
          minSize: [_this.minSizeWidth, _this.minSizeHeight],
          onChange: _this.updatePreview, //选框改变时的事件
          onSelect: _this.updatePreview, //选框选定时的事件
        }, function() {
          var bounds = this.getBounds();
          var boundx = bounds[0];
          var boundy = bounds[1];
          var initDefSize = 2;
          _this.boundx = boundx;
          _this.boundy = boundy;


          _this.jcrop_api = this;
          var selWidth = initDefSize * _this.minSizeWidth;
          var selHeight = initDefSize * _this.minSizeHeight;
          if (boundx >= selWidth || boundy >= selHeight) {
            _this.jcrop_api.setSelect([(boundx - selWidth) / 2, (boundy - selHeight) / 2, (boundx + selWidth) / 2, (boundy + selHeight) / 2]);
          } else {
            if (boundx >= _this.minSizeWidth && boundy >= _this.minSizeHeight) {
              selWidth = boundx;
              selHeight = (selWidth * 10) / scale;
              if (selHeight <= boundy) {
                _this.jcrop_api.setSelect([0, (boundy - selHeight) / 2, selWidth, (boundy + selHeight) / 2]);
              } else {
                selHeight = boundy;
                selWidth = (selHeight * scale) / 10;
                if (selWidth <= boundx) {
                  _this.jcrop_api.setSelect([(boundx - selWidth) / 2, 0, (boundx + selWidth) / 2, selHeight]);
                }
              }
            }
          }
        });
      },
      updatePreview(c) {
        var self = this,
          xRect = 0,
          yRect = 0;
        if (self.tag == 1) {
          xRect = self.$rectcnt.width(), //重新获取矩形宽度
            yRect = self.$rectcnt.height(); //重新获取矩形高度
        } else {
          //xRect = $viewcircle.width(), //重新获取矩形宽度
          //  yRect = $viewcircle.height(); //重新获取矩形高度
        }
        if (parseInt(c.w) > 0) {
          var rx = xRect / c.w;
          var ry = yRect / c.h;
          //显示圆的marginleft
          var imgMarginLeft = (Math.round(rx * c.x) + (xRect - yRect) / 2);
          //选择圆的marginleft
          var margin_left = Math.round((c.w - c.h) / 2 + 2);
          var widthC = Math.round(rx * self.boundx);
          var heightC = Math.round(rx * self.boundy);
          var init_left = Math.round((c.x + Math.round((c.w - c.h) / 2)))
            //  selFF.setleft(c, init_left);
          self.$rectimg.css({
            width: Math.round(rx * self.boundx) + 'px',
            height: Math.round(ry * self.boundy) + 'px',
            marginLeft: '-' + Math.round(rx * c.x) + 'px',
            marginTop: '-' + Math.round(ry * c.y) + 'px'
          });
          // $circleimg.css({
          //   width: Math.round(rx * boundx - 1) + 'px',
          //   height: Math.round(ry * boundy) + 'px',
          //   marginLeft: '-' + (Math.round(rx * c.x) + (xRect - yRect) / 2 + 2) + 'px',
          //   marginTop: '-' + Math.round(ry * c.y) + 'px'
          // });
          // $('#selcircle').css({
          //   width: Math.round(c.h - 4) + 'px',
          //   height: Math.round(c.h - 4) + 'px',
          //   marginLeft: Math.round((c.w - c.h) / 2 + 2) + 'px',
          //   left: 0
          // });
          //
          // if (tag == 1) {
          //   new Drag("selcircle", {
          //     mxContainer: "rectangle",
          //     Limit: true,
          //     LockY: true,
          //     onMove: function() {
          //       var c_left = this.Drag.offsetLeft + Math.round(c.x);
          //       selFF.setleft(c, c_left)
          //       var imgml = (((this.Drag.offsetLeft - margin_left) / baseW_H.width) * widthC) + imgMarginLeft;
          //       $circleimg.css({
          //         width: widthC + 'px',
          //         height: heightC + 'px',
          //         marginLeft: '-' + imgml + 'px'
          //       });
          //     }
          //   });
          // }

        }

      },
      //计算图片的同比缩放
      getWidthAndHeight: function(imgWidth, imgHeight) {
        var width = 600;
        var height = 400;
        var baseBl = width / height;
        var imgBl = imgWidth / imgHeight;
        if (imgBl >= baseBl) {
          //以宽度作为计算标准
          if (imgWidth > width) {
            imgHeight = (width / imgWidth) * imgHeight;
            imgWidth = width;
          }
        } else {
          //以高度作为计算标准
          if (imgHeight > height) {
            imgWidth = (height / imgHeight) * imgWidth;
            imgHeight = height;
          }
        }
        return {
          width: imgWidth,
          height: imgHeight
        }
      },
    }

  }
</script>
<style type="text/css">
  #viewrect-pane {
    display: block;
    position: absolute;
    z-index: 2000;
    top: 10px;
    right: 0;
    padding: 6px;
    border: 1px rgba(0, 0, 0, .4) solid;
    background-color: white;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    -webkit-box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
  }

  #viewrect-pane .viewrect-container {
    width: 200px;
    height: 100px;
    overflow: hidden;
  }
</style>
