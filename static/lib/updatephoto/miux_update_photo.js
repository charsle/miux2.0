  import './jquery.Jcrop.css';
  import Drag from './drag_photo';
  import Dialog from './dialog';
  import Jcrop from './jquery.Jcrop';
  import gloabl from '../../../src/api/globConfig';
  import * as URL from '../../../src/api/restfull'
  import {
    uploadAll
  } from '../../../src/assets/js/upload';
  var jcrop_api = null,
    $viewrect = '',
    $rectcnt = '',
    $rectimg = '',
    $circlecnt = '',
    $viewcircle = '',
    $circleimg = '',
    imgWidth = 0,
    imgHeight = 0,
    boundx = 0,
    boundy = 0,
    tag = 1,
    x = 0,
    y = 0,
    w = 0,
    h = 0,
    baseW_H,
    startWidth = 0,
    startHeight = 0;
  var scale = 0;
  var url = null;
  var lstfile; //处理选中
  var PhotoDialog = {
    //初始化弹出框
    init: function(tag_t, _callback, ada) {
      var _this = this;
      tag = tag_t;

      var dialog = _this.openDialog(tag, _callback, ada);

      //选择图片
      $('#localPhotoImg').click(function() {
        $("#file").click();
      });
      $("#file").click();
      //当选择图片之后 显示选择的图片
      $('#file').change(function(e) {

        var img = new Image();
        if (window.URL) {
          if (typeof this.files[0] == 'undefined') {
            this.files[0] = lstfile;
            return;
          } else {
            lstfile = this.files[0];
          }
          url = img.src = window.URL.createObjectURL(this.files[0]);
        } else if (window.FileReader) {
          var reader = new FileReader();
          reader.readAsDataURL(this.files[0]);
          url = img.src = this.result;
        } else {
          $(this).select();
          $(this).blur();
          var nfile = document.selection.createRange().text;
          document.selection.empty();
          url = img.src = nfile;
        }
        if (url != null && url != '') {
          if (jcrop_api != undefined) {
            jcrop_api.destroy();
          }
          //缓冲图片加载
          setTimeout(function() {
            _this.initJcropData(dialog, url, img.width, img.height);
            startWidth = img.width;
            startHeight = img.height;
          }, 500)
        }
      });
    },
    //个人设置头像保存路径
    saveUploadImg: function(url, type, _callback) {
      var params = ''
      if (type == 1) {
        params = 'UM0123=' + url;
      } else if (type == 2) {
        params = 'UM0111=' + url;
      }

      gloabl.fethAsync([URL.SAVE_PARSON_URL], params, res => {
        if (res.success) {
          $('.overlayer').remove();
          $('.dialog').remove();
          var _user = JSON.parse(getCookie('allUserInfo'));
          layer.msg('头像上传成功!')
          if (type == 1) {
            _user.user.UM0111 = url;
            _callback(url);
            $('#userBigImg,.addGroupImage').attr('src', url)
          } else if (type == 2) {
            _user.user.UM0123 = url;
            _callback(url);
            $('#userSmillImg').attr('src', url);
            $('a[data-lightbox="miux-img"]').attr('href', url);
          }
          setCookie('allUserInfo', JSON.stringify(_user));
        }
      })
    },
    //修改团队logo
    teamUploadImg: function(url, _callback) {
      gloabl.fethAsync([URL.UPDATE_TEAR_LOGO_URL], 'TM00109=' + url, res => {
        if (res.success) {
          _callback(url);
          layer.msg('头像上传成功!')
        }
      })
    },
    //修改助理logo
    assistantUploadImg: function(url, type, _callback) {
      var parmas = '';
      if (type == 1) {
        parmas = 'TM00804=' + url;
      } else {
        parmas = 'TM00803=' + url;
      }
      gloabl.fethAsync([URL.UPLOAD_ASSISTANT_URL], parmas, res => {
        if (res.success) {
          $('.overlayer').remove();
          $('.dialog').remove();
          _callback(url);
          layer.msg('头像上传成功!')
        }

      })
    },
    //打开弹出框
    openDialog: function(tag, _callback, ada) {
      var _this = this;
      var html = _this.showUpdateType(tag);
      $('.overlayer').remove();
      $('.dialog').remove();
      var dialog = new Dialog({
        title: '头像上传',
        height: 460,
        width: 860,
        content: _this.dialogHtml(html),
        confirm: function() {
          var docFile = document.getElementById("file");
          if (tag === 1) {
            //大图
            var x0 = Number(x.split(',')[0]);
            var y0 = Number(y.split(',')[0]);
            var x1 = Number(w.split(',')[0]) + x0;
            var y1 = Number(h.split(',')[0]) + y0;
            //小图
            var _x0 = Number(x.split(',')[1]);
            var _y0 = Number(y.split(',')[1]);
            var _x1 = Number(h.split(',')[1]) + _x0;
            var _y1 = Number(h.split(',')[1]) + _y0;
            var params1 = 'x0=' + x0 + '&y0=' + y0 + '&x1=' + x1 + '&y1=' + y1 + '&quality=100&w=' + imgWidth + '&h=' + imgHeight;
            var params2 = 'x0=' + _x0 + '&y0=' + _y0 + '&x1=' + _x1 + '&y1=' + _y1 + '&quality=100&w=' + imgWidth + '&h=' + imgHeight;
            uploadAll(1, docFile.files[0], '', params1, function(data) {
              if (ada != undefined) {
                _this.assistantUploadImg(data.data.url, 1, _callback);
                console.log('大头像')
              } else {
                _this.saveUploadImg(data.data.url, 1, _callback);
              }

            });
            uploadAll(1, docFile.files[0], '', params2, function(data) {
              if (ada != undefined) {
                _this.assistantUploadImg(data.data.url, 2, _callback);
                console.log('小头像')
              } else {
                _this.saveUploadImg(data.data.url, 2, _callback);
              }
            });

          } else {
            var params = 'x0=' + x + '&y0=' + y + '&x1=' + (w + x) + '&y1=' + (h + y) + '&quality=100&w=' + imgWidth + '&h=' + imgHeight;
            uploadAll(1, docFile.files[0], '', params, function(data) {
              var _user = JSON.parse(gloabl.getCookie('allUserInfo'));
              if (tag == 2) {
                //团队头像
                _this.teamUploadImg(data.data.url, _callback);
                _user.company.TM00109 = data.data.url;
              } else if (tag == 3) {
                //团队助理头像
                _this.assistantUploadImg(data.data.url, 2, _callback);
              } else if (tag == 4) {
                //公共频组
                _callback(data.data.url);
              } else if (tag == 5) {
                //私密频组
                _callback(data.data.url);
              }

              $('.overlayer').remove();
              $('.dialog').remove();
              gloabl.setCookie('allUserInfo', JSON.stringify(_user));
            });
          }
          $('#localPhotoImgOK').addClass('disabled');
        }
      });
      return dialog;
    },
    initJcropData: function(dialog, url, w, h) {
      var minSizeHeight = 100,
        self = this,
        initDefSize = 2;

      if (tag == 1) {
        scale = 22;
      } else {
        scale = 10;
      }
      var minSizeWidth = (minSizeHeight * scale) / 10,
        $circleHtml = [
          '<div id="viewcircle-pane">',
          '	<div class="viewcircle-container">',
          '		<img src="./img/sago.jpg" class="jcrop-preview" alt="Preview" />',
          '	</div>',
          '</div>'
        ].join(''),
        $rectHtml = [
          '<div id="viewrect-pane">',
          '		<div class="viewrect-container">',
          '			<img src="./img/sago.jpg" class="jcrop-preview" alt="Preview" />',
          '		</div>',
          '</div>'
        ].join('');
      $('.rect_content').html($rectHtml);
      $('.circle_content').html($circleHtml);
      $viewrect = $('#viewrect-pane'); //矩形选择框
      $rectcnt = $('#viewrect-pane .viewrect-container') //矩形容器
      $rectimg = $('#viewrect-pane .viewrect-container img'); //矩形容器中的图片

      $viewcircle = $('#viewcircle-pane'), //圆形
        $circleimg = $('#viewcircle-pane .viewcircle-container img'); //圆形容器中的图片

      $('#target').attr('src', url);
      $rectimg.attr('src', url);
      $circleimg.attr('src', url);
      $('.newImg').attr('src', url);
      $('.jcrop-holder>div>div>img').attr('src', url);
      self.showJcrop(dialog, w, h, minSizeWidth, minSizeHeight, initDefSize)
    },
    //调用jcrop插件
    showJcrop: function(dialog, w, h, minSizeWidth, minSizeHeight, initDefSize) {
      var self = this;
      baseW_H = self.getWidthAndHeight(w, h);

      if (baseW_H.width < 220 || baseW_H.height < 100) {
        layer.msg('图片大小不匹配！', {
          time: 2000
        });
        return;
      } else {
        dialog.show();
        //设置图片的宽高
        imgWidth = (baseW_H.width).toFixed(0), imgHeight = (baseW_H.height).toFixed(0);
        $('#target,.newImg,.jcrop-holder>div>div>img,.jcrop-preview').css({
          width: baseW_H.width,
          height: baseW_H.height
        });
        //调用插件
        $('#target').Jcrop({
          allowSelect: false,
          boxWidth: w + 'px',
          boxHeight: h + 'px',
          minSize: [minSizeWidth, minSizeHeight],
          onChange: self.updatePreview, //选框改变时的事件
          onSelect: self.updatePreview, //选框选定时的事件
          aspectRatio: minSizeWidth / minSizeHeight //选框宽高比
        }, function() {
          var bounds = this.getBounds();
          boundx = bounds[0],
            boundy = bounds[1];

          jcrop_api = this;
          var selWidth = initDefSize * minSizeWidth;
          var selHeight = initDefSize * minSizeHeight;
          if (boundx >= selWidth || boundy >= selHeight) {
            jcrop_api.setSelect([(boundx - selWidth) / 2, (boundy - selHeight) / 2, (boundx + selWidth) / 2, (boundy + selHeight) / 2]);
          } else {
            if (boundx >= minSizeWidth && boundy >= minSizeHeight) {
              selWidth = boundx;
              selHeight = (selWidth * 10) / scale;
              if (selHeight <= boundy) {
                jcrop_api.setSelect([0, (boundy - selHeight) / 2, selWidth, (boundy + selHeight) / 2]);
              } else {
                selHeight = boundy;
                selWidth = (selHeight * scale) / 10;
                if (selWidth <= boundx) {
                  jcrop_api.setSelect([(boundx - selWidth) / 2, 0, (boundx + selWidth) / 2, selHeight]);
                }
              }
            }
          }

        });
        //dragDialog(baseW_H);
      }
    },
    updatePreview: function(c) {
      var self = this,
        xRect = 0,
        yRect = 0;
      if (tag == 1) {
        xRect = $rectcnt.width(), //重新获取矩形宽度
          yRect = $rectcnt.height(); //重新获取矩形高度
      } else {
        xRect = $viewcircle.width(), //重新获取矩形宽度
          yRect = $viewcircle.height(); //重新获取矩形高度
      }
      if (parseInt(c.w) > 0) {
        var rx = xRect / c.w;
        var ry = yRect / c.h;
        //显示圆的marginleft
        var imgMarginLeft = (Math.round(rx * c.x) + (xRect - yRect) / 2);
        //选择圆的marginleft
        var margin_left = Math.round((c.w - c.h) / 2 + 2);
        var widthC = Math.round(rx * boundx);
        var heightC = Math.round(rx * boundy);
        var init_left = Math.round((c.x + Math.round((c.w - c.h) / 2)))
        selFF.setleft(c, init_left);
        $rectimg.css({
          width: Math.round(rx * boundx) + 'px',
          height: Math.round(ry * boundy) + 'px',
          marginLeft: '-' + Math.round(rx * c.x) + 'px',
          marginTop: '-' + Math.round(ry * c.y) + 'px'
        });
        $circleimg.css({
          width: Math.round(rx * boundx - 1) + 'px',
          height: Math.round(ry * boundy) + 'px',
          marginLeft: '-' + (Math.round(rx * c.x) + (xRect - yRect) / 2 + 2) + 'px',
          marginTop: '-' + Math.round(ry * c.y) + 'px'
        });
        $('#selcircle').css({
          width: Math.round(c.h - 4) + 'px',
          height: Math.round(c.h - 4) + 'px',
          marginLeft: Math.round((c.w - c.h) / 2 + 2) + 'px',
          left: 0
        });

        if (tag == 1) {
          new Drag("selcircle", {
            mxContainer: "rectangle",
            Limit: true,
            LockY: true,
            onMove: function() {
              var c_left = this.Drag.offsetLeft + Math.round(c.x);
              selFF.setleft(c, c_left)
              var imgml = (((this.Drag.offsetLeft - margin_left) / baseW_H.width) * widthC) + imgMarginLeft;
              $circleimg.css({
                width: widthC + 'px',
                height: heightC + 'px',
                marginLeft: '-' + imgml + 'px'
              });
            }
          });
        }

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

    //弹出框模版
    dialogHtml: function(html) {
      return [
        '<div class="" style="width:850px;">',
        '<input type="file"  style="display:none" id="file" name="file" accept="image/jpg,image/jpeg,image/png"/>',
        '<div class="row" style="width:850px;margin:10px 0 0 0;">',
        '<div class="pull-left tc" style="margin:0 10px;width:600px;height:400px;border: 1px solid #f0f0f0;">',
        '<img src="./img/sago.jpg" id="target" alt="[Jcrop Example]" />',
        '</div>',
        '<div style="margin-left: 0px;float:left;width:230px;">',
        '<div class="right_select" style="color:#949ca0">' + html,
        '</div>',

        '<div class="btn_cut_fun mt30 w100">',
        '<a href="javascript:;" id="localPhotoImg" class="localphoto-style fw">本地照片</a>',
        '<a href="javascript:;" action-type="close" id="localPhotoImgDrop" class="btn btn-cancle" style="width:70px;margin:0 10px 0 22px;">取消</a>',
        '<a href="javascript:;" action-type="confirm" id="localPhotoImgOK" class="btn btn-sure" style="width:70px;">确定</a>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
      ].join('')
    },
    showUpdateType: function(tag) {
      var html = '';
      if (tag == 1) {
        html = [
          '<p class="rect_name fw w100">我的名片头像</p>',
          '<div class="rect_content" style="margin: 10px 0;"></div>',
          '<p class="circle_name mt20 fw w100">我的消息头像</p>',
          '<div class="circle_content" style="padding-left:54px;margin:10px 0 60px 0;"></div>'
        ].join('');
      } else if (tag == 2) {
        html = [
          '<p class="circle_name mt20 fw w100">团队LOGO</p>',
          '<div class="circle_content" style="padding-left:54px;margin:10px 0 60px 0;"></div>'
        ].join('');
      } else {
        html = [
          '<p class="circle_name mt20 fw w100">频组头像</p>',
          '<div class="circle_content" style="padding-left:54px;margin:10px 0 60px 0;"></div>'
        ].join('');
      }
      return html;
    }
  }

  var selFF = (function() {
    function setleft(c, c_left) {
      //1 个人设置   2其他
      if (tag == 1) {
        x = Math.round(c.x) + ',' + c_left; //2个矩形的x轴坐标
        y = Math.round(c.y) + ',' + Math.round(c.y); //2个矩形的y轴坐标
        w = Math.round(c.w) + ',' + Math.round(c.h); //2个矩形的宽度
        h = Math.round(c.h) + ',' + Math.round(c.h); //2个矩形的高度
      } else {
        x = Math.round((c.x + Math.round((c.w - c.h) / 2))); //圆形的x轴坐标
        y = Math.round(c.y); //圆形的y轴坐标
        w = Math.round(c.h); //圆形的宽度
        h = Math.round(c.h); //圆形的高度
      }
    }
    return {
      setleft: setleft
    }

  })()

  //调用拖拽函数

  export function uploadImage(tag, _callback, ada) {
    PhotoDialog.init(tag, _callback, ada);
  };
