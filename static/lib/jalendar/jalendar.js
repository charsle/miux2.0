/**
 ******  name:行事历标记
 ******  Author: charsle  ******
 ******  time:2015-07-19 02:05  ******
 ******  E-mail: caiyuansheng@suntel.com  ******
 */
(function($) {
  $.fn.jalendar = function(options, callback) {
    var settings = $.extend({
      customDay: new Date(),
      color: '#65c2c0',
      lang: 'EN'
    }, options);

    // Languages
    var dayNames = {};
    var monthNames = {};

    dayNames['EN'] = new Array('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun');
    dayNames['CH'] = new Array('一', '二', '三', '四', '五', '六', '日');
    monthNames['EN'] = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    monthNames['CH'] = new Array('1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月');

    var $this = $(this);
    var div = function(e, classN) {
      return $(document.createElement(e)).addClass(classN);
    };

    var clockHour = [];
    var clockMin = [];
    for (var i = 0; i < 24; i++) {
      clockHour.push(div('div', 'option').text(i))
    }
    for (var i = 0; i < 59; i += 5) {
      clockMin.push(div('div', 'option').text(i))
    }

    // 创建日历框架
    $this.append(
      div('div', 'jalendar-pages').append(
        div('div', 'pages-bottom'),
        div('div', 'header').append(
          div('a', 'prv-m glyphicon glyphicon-triangle-left'),
          div('h1'),
          div('a', 'nxt-m glyphicon glyphicon-triangle-right'),
          div('div', 'day-names')

        ),

        div('div', 'days clearfix') //加载日期
      )
    );

    // 展示每天的日期
    for (var i = 0; i < 42; i++) {
      $this.find('.days').append(div('div', 'day'));

    }
    for (var i = 0; i < 7; i++) {
      $this.find('.day-names').append(div('h2').text(dayNames[settings.lang][i]));
    }
    var d = new Date(settings.customDay);
    var year = d.getFullYear();
    var date = d.getDate();
    var month = d.getMonth();

    //判断是否是闰年
    var isLeapYear = function(year1) {
      var f = new Date();
      f.setYear(year1);
      f.setMonth(1);
      f.setDate(29);
      return f.getDate() == 29;
    };

    var feb;
    var febCalc = function(feb) {
      if (isLeapYear(year) === true) {
        feb = 29;
      } else {
        feb = 28;
      }
      return feb;
    };
    var monthDays = new Array(31, febCalc(feb), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

    function calcMonth() {
      monthDays[1] = febCalc(feb);
      var weekStart = new Date();
      weekStart.setFullYear(year, month, 0);
      var startDay = weekStart.getDay();

      $this.find('.header h1').html(year + '年' + monthNames[settings.lang][month]);

      $this.find('.day').html('&nbsp;');
      $this.find('.day').removeClass('this-month');

      //默认选择当天
      var monthForToday = month + 1;
      monthForToday = monthForToday < 10 ? "0" + monthForToday : monthForToday;
      var dateForToday = date < 10 ? "0" + date : date;
      $("#selectDate").val(year + '-' + monthForToday + '-' + dateForToday);

      for (var i = 1; i <= monthDays[month]; i++) {
        startDay++;
        var monthString = month + 1;
        if (month + 1 < 10) {
          monthString = "0" + monthString;
        }
        var iString = i;
        if (i < 10) {
          iString = "0" + i;
        }
        $this.find('.day').eq(startDay - 1).addClass('this-month').attr('data-date', year + '-' + monthString + '-' + iString).html(i);
      }

      if (year == d.getFullYear() && month == d.getMonth()) {
        $this.find('.day.this-month').eq(date - 1).append(
          '<div class="event-single"><div class="details"><div class="erase"></div></div></div>'
        );
        $this.find('.day').has('.event-single').addClass('have-event').prepend(div('i', ''));
      } else {
        //$this.find('.day.this-month').removeClass('today').attr('style', '');
      }

      //显示有任务标记
      $this.find('.added-event').each(function(i) {
        $(this).attr('data-id', i);
        $this.find('.this-month[data-date="' + $(this).attr('data-date') + '"]').append(
          '<span class="newest_msg_bar" ><img src="images/redpointe.png" width="10px"></span>'
        );
        $this.find('.day').has('.event-single').addClass('have-event').prepend(div('i', ''));
      });

    }
    calcMonth();

    var arrows = new Array($this.find('.prv-m'), $this.find('.nxt-m'));
    var $erase = $this.find('.event-single .erase');
    $this.find('.jalendar-pages').css({
      //'width': $this.find('.jalendar-pages').width()
    });

    function prevAddEvent() {
      $this.find('.day').removeClass('selected').removeAttr('style');
      $this.find('.today').css({
        'color': settings.color
      });
      $this.find('.add-event').hide();
    }
    //上一个月
    arrows[1].on('click', function() {
      if (month >= 11) {
        month = 0;
        year++;
      } else {
        month++;
      }
      calcMonth();
      prevAddEvent();
    });
    //下一个月
    arrows[0].on('click', function() {
      var dayClick = $this.find('.this-month');

      if (month === 0) {
        month = 11;
        year--;
      } else {
        month--;
      }
      calcMonth();
      prevAddEvent();
    });
    //选择日期
    $this.on('click', '.this-month', function() {
      var dd = new Date();
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1;
      var d = dd.getDate();
      var dt = dd.getHours();
      var mm = dd.getMinutes();
      var ss = dd.getSeconds();
      m = m < 10 ? '0' + m : m;
      d = d < 10 ? '0' + d : d;
      dt = dt < 10 ? '0' + dt : dt;
      mm = mm < 10 ? '0' + mm : mm;
      ss = ss < 10 ? '0' + ss : ss;
      var time = y + '-' + m + '-' + d;
      if ($(this).attr('data-date') > time) {
        return false;
      } else {
        if ($(this).attr('data-date') == time) { //选择当日
          $('.btn-create').show();
        } else { //选择之前
          $('.btn-create').hide();
        }
      }
      //				var eventSingle = $(this).find('.event-single')
      //这里可以扩展点击添加任务
      $this.find('.events .event-single').remove();
      prevAddEvent();
      $(this).addClass('selected').css({
        'background-color': settings.color
      });
      $("#selectDate").val($(this).attr('data-date'));
      //查询当天的行事历
      $("#act-execute-work").remove();
      $("#act-done-work").remove();
      var _this = this;
      callback($(this).attr('data-date'));
      //查询选择日期的任务
      //				service.responeData('work/Schedule!getWorkSchedule.action',{'entity.createdDt':$(this).attr('data-date')}).done(function(obj) {
      //					if(obj.success){
      //						//console.log(obj.result[0])
      //						var data ={tasklist:obj.result[0],userSid:$("#sysUserSid").val()};
      //						$('.add-act').after(task_tpl_win(data));
      //
      //						miux_task_method.showDontHavaWork();
      //
      //						$('.task-detail').find('ul li').bind( 'click', function (e) {
      //							//行点击
      //		 					miux_task_method.detailWork($(e.currentTarget));
      //						});
      //
      //		 				$('.task-detail').find('img[name="change-state"]').bind( 'click', function (e) {
      //							//行点击
      //		 					e.stopPropagation();
      //		 					miux_task_method.changeWork($(e.currentTarget));
      //						});
      //
      //		 				$('.task-detail').find('img[name="del-state"]').bind( 'click', function (e) {
      //		 					e.stopPropagation();
      //		 					miux_task_method.delWork($(e.currentTarget));
      //		 				});
      //
      //
      //					}
      //				});

    });
  };

}(jQuery));
