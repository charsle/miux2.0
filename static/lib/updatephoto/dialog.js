/**
 * 弹出框
 * @param {Object} options
 */
function Dialog(options) {
  this.options = $.extend({}, this.options);
  $.extend(this.options, options);
  this.init();
}
$.extend(Dialog.prototype, {
  options: {
    title: "",
    content: "",
    width: 400,
    overlayer: true,
    theme: '',
    easing: "linear"
  },
  init: function() {
    this.$ele = $('<div class="dialog" style="display:none;"><div class="dia-tit"></div><div class="dia-main"></div><div class="dia-close" action-type="close"><i class="iconfont">&#xe654;</i></div></div>');
    this.$diaTit = this.$ele.find(".dia-tit");
    this.$diaMain = this.$ele.find(".dia-main");
    this.$diaTit.text(this.options.title);
    this.$diaMain.html(this.options.content).css({
      width: this.options.width
    });

    $("body").append(this.$ele);

    this.options.height = this.options.height || this.$ele.outerHeight();
    this.$ele.css({
      width: this.options.width,
      height: this.options.height,
      marginLeft: -this.options.width / 2,
      marginTop: -this.options.height / 2
    }).addClass(this.options.theme);
    if (!!this.options.overlayer) {
      this.$overlayer = $('<div class="overlayer"></div>');
      $("body").append(this.$overlayer);
    }

    this.events();
  },
  events: function() {
    var _this = this;
    this.$ele.delegate("[action-type=close]", "click", $.proxy(this.close, this));
    this.$ele.delegate("[action-type=confirm]", "click", $.proxy(this.confirm, this));
    if (!!this.$overlayer) {
      this.$overlayer.bind("click", function() {
        //                    _this.close();
      });
    }
  },
  show: function() {
    var that = this;
    var ratio = 0.6
    if (!!this.options.overlayer) {
      this.$overlayer.css({
        display: "block"
      });
    }
    this.$ele.css({
      display: "block",
      width: this.options.width * ratio,
      height: this.options.height * ratio,
      marginLeft: -this.options.width * ratio * 0.5,
      marginTop: -this.options.height * ratio * 0.5
    });
    this.$ele.animate({
      width: this.options.width,
      height: this.options.height,
      marginLeft: -this.options.width * 0.5,
      marginTop: -this.options.height * 0.5
    }, 0, this.options.easing);

    this.$ele.find("[action-type=confirm]").focus();

  },
  hide: function() {
    var ratio = 0.6
    if (!!this.options.overlayer) {
      this.$overlayer.css({
        display: "none"
      });
    }
    this.$ele.css({
      display: "none",
      width: this.options.width * ratio,
      height: this.options.height * ratio,
      marginLeft: -this.options.width * ratio * 0.5,
      marginTop: -this.options.height * ratio * 0.5
    });
    this.$ele.animate({
      width: this.options.width,
      height: this.options.height,
      marginLeft: -this.options.width * 0.5,
      marginTop: -this.options.height * 0.5
    }, 400, this.options.easing);

    this.$ele.find("[action-type=confirm]").focus();
  },
  confirm: function() {
    !this.options.confirm || $.proxy(this.options.confirm, this)();
  },
  close: function() {
    if (!!this.options.overlayer) {
      this.$overlayer.remove();

    }
    this.$ele.remove();
    !this.options.close || $.proxy(this.options.close, this)();

  }

});

export default Dialog;
