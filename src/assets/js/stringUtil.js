function StringUtil() {};
StringUtil.prototype = {
	//判断内容长度
	valueLength: function(val) {
		val = val.trim();
		var len = 0;
		for(var i = 0; i < val.length; i++) {
			if(val[i].match(/[^\x00-\xff]/ig) != null) //全角
				len += 2;
			else
				len += 1;
		}
		return len;
	},
	//检测是否含有非法字符   true  : 含有
	isSafe: function(str) {
		var filterString = "";
		filterString = filterString == "" ? "'~`·!@#$%^&*()-+.\"\\" : filterString;
		var ch;
		var i;
		var temp;
		var error = false; // 当包含非法字符时，返回True   
		for(i = 0; i <= (filterString.length - 1); i++) {
			ch = filterString.charAt(i);
			temp = str.indexOf(ch);
			if(temp != -1) {
				error = true;
				break;
			}
		}
		return error;
	},
	//限定字数 去除多余的字符   obj:非input对象   maxLength:字符数
	setMaxLengthDiv: function(obj, maxLength) {
		var text = obj.html();
		var len = 0;
		var num = 0;
		text = text.replace(/<(script)[\S\s]*?\1>|<\/?(span|li|ul|table|td|tr|h|iframe|button|nobr|ins|tbody|col|input|dd|dt|b|div|a|img)[^>]*>/gi, "");
		text = text.replace(/&nbsp;/gi, "");
		for(var i = 0; i < text.length; i++) {
			var length = text.charCodeAt(i);
			if(length >= 0 && length <= 128) {
				len += 1;
			} else {
				len += 2;
			}
			num++;
			if(len > maxLength) {
				var str = text.substr(0, num - 1);
				obj.html(str);
				this.moveCursor(obj);
				return;
			}
		}
	},
	//限定字数 去除多余的字符   obj:input对象   maxLength:字符数
	setMaxLengthInput: function(obj, maxLength) {
		var text = obj.val();
		var len = 0;
		var num = 0;
		for(var i = 0; i < text.length; i++) {
			var length = text.charCodeAt(i);
			if(length >= 0 && length <= 128) {
				len += 1;
			} else {
				len += 2;
			}
			num++;
			if(len > maxLength) {
				obj.val(text.substr(0, num - 1));
				return;
			}
		}
	},

	//只能输入中英文的验证，传入最大和最小的长度
	checkChinese: function(val, minLength, maxLength) {
		var _this = this;
		var flag = true;
		var pattern = /^[\x07-\xff]*$/;
		if(pattern.test(val)) {
			if(minLength > _this.valueLength(val) || _this.valueLength(val) > maxLength) {
				flag = false;
			}
		}
		return flag;
	},
	//只能输入中文数字英文的验证，传入最大和最小的长度
	checkChineseNumEnglish: function(val, minLength, maxLength) {
		var regx = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
		if(regx.test(val)) {
			var len = 0;
			for(var i = 0; i < val.length; i++) {
				if(val[i].match(/[^\x00-\xff]/ig) != null) //全角
					len += 2;
				else
					len += 1;
			}
			if(minLength <= len && len <= maxLength) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	},
	/**
	 * 比较2个时间是否同一天，判断是否返回时间分割线
	 * 返回结果
	 */
	getDatetimeBetween: function(oldTime, newTime) {
		var timeBetween = false;
		if(newTime.substring(0, 10) == oldTime.substring(0, 10))
			timeBetween = true;
		return timeBetween;
	},
	/**
	 * 比较同一天的日期 时间差是否2分钟内 
	 */
	isTwoMinutes: function(oldTime, newTime) {
		var hh1 = oldTime.substring(11, 13);
		var hh2 = newTime.substring(11, 13);
		var mm1 = oldTime.substring(14, 16);
		var mm2 = newTime.substring(14, 16);
		var ss1 = oldTime.substring(17, 19);
		var ss2 = newTime.substring(17, 19);
		var t1 = mm1 * 60 + ss1 * 1; //旧日期秒数
		var t2 = mm2 * 60 + ss2 * 1; //新日期秒数
		if(hh1 == hh2) { //相同的小时
			if(t2 - t1 <= 120) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	},
	dateFormat: function() {
		var formatDay = new Date();
		var year = formatDay.getFullYear();
		var month = formatDay.getMonth() + 1;
		var day = formatDay.getDate();
		var HH = formatDay.getHours();
		var hh = formatDay.getMinutes();
		var ss = formatDay.getSeconds();
		month = month < 10 ? '0' + month : month;
		day = day < 10 ? '0' + day : day;
		HH = HH < 10 ? '0' + HH : HH;
		hh = hh < 10 ? '0' + hh : hh;
		ss = ss < 10 ? '0' + ss : ss;
		var time = year + '-' + month + '-' + day + ' ' + HH + ':' + hh + ':' + ss
		return time;
	},
	UUId: function(len, radix) {
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		var uuid = [],
			i;
		radix = radix || chars.length;

		if(len) {
			for(i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
		} else {
			var r;

			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '';
			uuid[14] = '4';
			for(i = 0; i < 36; i++) {
				if(!uuid[i]) {
					r = 0 | Math.random() * 16;
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
				}
			}
		}
		return uuid.join('');
	},
	formatSize: function(bytes) {
		if(bytes === 0) return '0 B';
		var k = 1000, // or 1024
			sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
			i = Math.floor(Math.log(bytes) / Math.log(k));
		var fileSize = (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
		return fileSize;
	}, //判断文件类型是否是图片
	ifImg: function(fileType) {
		var flag = false;
		var imgType = ["PNG", "BMP", "JPEG", "JPG", "GIF", "AI", "HDRI", "RAW", "PCX", "TIFF", "TGA", "EXIF", "FPX", "SVG", "PSD", "CDR", "PCD", "DXF", "UFO", "EPS"];
		if(!("" == fileType || undefined == fileType)) {
			for(var i in imgType) {
				if(imgType[i] == fileType.toUpperCase()) {
					flag = true;
					break;
				}
			}
		}
		return flag;
	},
};
export default new StringUtil()