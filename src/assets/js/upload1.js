import __BASE64 from './newBase64';
import { hex_md5 } from './MD5';
import gloabl from '../../api/globConfig';
import * as URL from '../../api/restfull';
var UploadFile = (function() {
    function UploadFile(name, upladParams) {
        this.ctxList = []; //blockid 
        this.offset = 0; //偏移量
        this.blockSize = 400 * 1024; //块大小
        this.chukSize = 100 * 1024; //片大小
        this.token = '';
        this.urlDate = {};
        this.file = name;
        this.upladParams = upladParams;
    }
    /**
     * 公共的接口地址
     *
     * @returns {Object}
     *
     * @memberOf UploadFile
     */
    UploadFile.prototype.commonUrl = function() {
        var urlDate = {
            URL_MKBLK: '',
            URL_BPUT: '',
            URL_MKFILE: '',
            URL_CHECK: '',
            URL_XLSX: '',
            URL_CLIP: '' //图片裁剪
        };
        if (this.upladParams.type === 1) {
            urlDate.URL_MKBLK = URL.UPLOAD_NOT_PRVATE + "mkblk/";
            urlDate.URL_BPUT = URL.UPLOAD_NOT_PRVATE + "bput/";
            urlDate.URL_MKFILE = URL.UPLOAD_NOT_PRVATE + "mkfile/";
            urlDate.URL_CLIP = URL.UPLOAD_NOT_PRVATE + "clip/"; //图片裁剪
        } else if (this.upladParams.type === 2) {
            urlDate.URL_CHECK = URL.UPLOAD_PRVATE + "check";
            urlDate.URL_MKBLK = URL.UPLOAD_PRVATE + "mkblk/";
            urlDate.URL_BPUT = URL.UPLOAD_PRVATE + "bput/";
            urlDate.URL_MKFILE = URL.UPLOAD_PRVATE + "mkfile/";
            urlDate.URL_XLSX = URL.UPLOAD_PRVATE + "xlsx/";
        }
        return urlDate;
    };
    /**
     *
     * 初始化上传参数
     *
     *
     * @memberOf UploadFile
     */
    UploadFile.prototype.initFileUpload = function(callback, pcallback) {
        this.urlDate = this.commonUrl();
        var fileSize = this.file.size; //文件大小
        var fileType = this.file.type; //文件类型
        var fileName = this.file.name; //文件名称
        var fileReader = new FileReader();
        var method = 'readAsBinaryString';
        fileReader.addEventListener('loadend', eventsReader, false);
        if (!fileReader[method]) {
            method = 'readAsArrayBuffer';
        }
        fileReader[method](this.file.slice(0, fileSize));
        /**
         * 上传事件
         *
         * @param {any} e 目标
         *
         * @memberOf UploadFile
         */
        var _that = this;

        function eventsReader(e) {
            if (e.target.readyState === FileReader.DONE) {
                var fileDataArr = _that.toByteArray(e.target.result); //转换成二进制
                var chuckSum_1 = hex_md5(e.target.result); //加密
                var filedata_1 = {
                    fileReader: fileReader,
                    fileName: fileName,
                    fileType: fileType,
                    fileSize: fileSize,
                    fileData: fileDataArr,
                    token: ''
                };
                if (_that.upladParams.type == 2) {
                    //获取token值
                    _that.getFileToken(filedata_1, chuckSum_1);
                    setTimeout(function() {
                        if (_that.token !== '' || _that.token !== undefined) {
                            _that.checkFiles(chuckSum_1, function(data) {
                                if (data.code == 1) {
                                    if (_that.upladParams.xls == 'xls') {
                                        //上传的是xls文档
                                        _that.analysisXLSX(data.data.key);
                                    } else {
                                        callback(data);
                                    }
                                } else {
                                    filedata_1.token = _that.token;
                                    _that.allUploadBlock(filedata_1, callback, pcallback);
                                }
                            });
                        } else {
                            //如果没有获取到，继续去执行
                            _that.getFileToken(filedata_1, chuckSum_1);
                        }
                    }, 500);
                } else {
                    _that.allUploadBlock(filedata_1, callback, pcallback);
                }
            }
        }
    };
    /**
     *
     * 获取token 值
     * @param {any} checksum 、
     * @param {any} callback 返回token 值
     * @returns
     *
     * @memberOf UploadFile
     */
    UploadFile.prototype.getFileToken = function(data, checksum) {
        var _this = this;
        var parmas = 'filename=' + data.fileName + '&filesize=' + data.fileSize + '&mimetype=' + data.fileType + '&checksum=' + checksum;
        fetch(URL.GET_UPLOAD_TOKEN_URL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            body: parmas
        }).then(function(respones) {
            respones.json().then(function(res) {
                // console.log('token', res.result);
                _this.token = res.result;
            });
        });
    };
    /**
     * 转换城二进制文件
     *
     * @param {any} arr
     * @returns
     *
     * @memberOf UploadFile
     */
    UploadFile.prototype.toByteArray = function(arr) {
        var n = arr.length;
        if (typeof(n) === 'undefined') {
            n = arr.byteLength;
            return new Uint8Array(arr, 0, n);
        }
        var b = new Uint8Array(n);
        for (var i = 0; i < n; i++) {
            b[i] = arr[i].charCodeAt(0);
        }
        arr = null;
        return b;
    };
    /**
     *
     * 上传验证
     * @param {any} token token 值
     * @param {any} checksum
     * @param {any} callback
     *
     * @memberOf UploadFile
     */
    UploadFile.prototype.checkFiles = function(checksum, callback) {
        var token = this.token;
        // console.log(token);
        var that = this;
        fetch(that.urlDate.URL_CHECK, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": token,
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            body: 'checksum=' + checksum,
        }).then(function(respones) {
            respones.json().then(function(res) {
                callback(res);
            });
        });
    };
    /**
     * 创建块 返回id
     *
     * @param {any} offset 偏移量
     * @param {any} size 大小
     * @param {any} data 数据 ，
     * @param {any} token token
     * @param {any} callback 回掉函数 返回id
     *
     * @memberOf UploadFile
     */
    UploadFile.prototype.mkblk = function(offset, size, data, token, callback) {
        var blockId = null;
        var _url = this.urlDate.URL_MKBLK + size;
        fetch(_url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": token,
                "Content-Type": 'application/octet-stream'
            },
            body: data,
        }).then(function(respones) {
            respones.json().then(function(res) {
                if (res.code == 0) {
                    blockId = res.data;
                    callback(blockId);
                }
            });
        });
    };
    /**
     * 上传块
     *
     * @param {any} token
     * @param {any} blockId
     * @param {any} offset
     * @param {any} data
     *
     * @memberOf UploadFile
     */
    UploadFile.prototype.bput = function(token, blockId, offset, data, callback) {
        var that = this;
        fetch(that.urlDate.URL_BPUT + blockId + '/' + offset, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": token,
                "Content-Type": 'application/octet-stream'
            },
            body: data,
        }).then(function(respones) {
            respones.json().then(function(res) {
                callback(res);
            });
        });
    };
    /**
     * 图片裁剪
     *
     * @param {any} keys
     * @param {any} parmas
     *
     * @memberOf UploadFile
     */
    UploadFile.prototype.cutImages = function(keys, parmas, callback) {
        var that = this;
        fetch(that.urlDate.URL_CLIP + keys, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            body: parmas,
        }).then(function(respones) {
            respones.json().then(function(res) {
                callback(res);
            });
        });
    };
    /**
     * 解析xls
     *
     * @param {any} keys
     * @param {any} token
     *
     * @memberOf UploadFile
     */
    UploadFile.prototype.analysisXLSX = function(keys) {
        var that = this;
        var getUserInfo = JSON.parse(gloabl.getCookie('allUserInfo')).user;
        // var getUserInfo = JSON.parse(gloabl.getCookie('chooseTeam'));
        fetch(that.urlDate.URL_XLSX + keys, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": that.token,
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            body: 'TM00301=' + getUserInfo.UM0101 + '&teamSid=' + getUserInfo.UM0126,
        }).then(function(respones) {
            respones.text().then(function(res) {
                if (res === '导入成功') {
                    layer.msg(res);
                    setTimeout(function() {
                        layer.closeAll();
                    }, 1000);
                } else {
                    layer.msg(res);
                }
            });
        });
    };
    /**
     * 上传所有的切片
     *
     * @param {*} parmas
     *
     * @memberOf UploadFile
     */
    UploadFile.prototype.allUploadBlock = function(parmas, callback, pcallback) {
        var that = this;
        if (parmas.fileSize <= that.chukSize) {
            that.mkblk(0, parmas.fileSize, parmas.fileData.subarray(0, parmas.fileSize), parmas.token, function(res) {
                that.ctxList.push(res.id);
                var percent = ((that.offset / parmas.fileSize) * 100).toFixed(0) + '%';

                //$('#par').html(percent);
                pcallback(percent)
                parmas.ctxList = that.ctxList;
                that.mkfile(parmas, callback);
            });
        } else if (parmas.fileSize <= that.blockSize) {
            that.mkblk(that.offset, parmas.fileSize, parmas.fileData.subarray(that.offset, (that.offset + that.chukSize)), parmas.token, function(res) {
                that.ctxList.push(res.id);
                that.offset += that.chukSize;
                var flag = true,
                    vvtimer = null;
                var percent = ((that.offset / parmas.fileSize) * 100).toFixed(0) + '%';
                pcallback(percent)
                    // $('#par').html(percent);
                vvbput();

                function vvbput() {
                    if (that.offset < parmas.fileSize) {
                        var pSzie = parmas.fileSize - that.offset;
                        if (pSzie > that.chukSize) {
                            pSzie = that.chukSize;
                        }
                        that.bput(parmas.token, res.id, that.offset, parmas.fileData.subarray(that.offset, (that.offset + pSzie)), function(res) {
                            that.offset += pSzie;
                            if (res.data.id) {

                                vvtimer = setTimeout(vvbput, 1);
                            }
                        });
                    } else if (that.offset == parmas.fileSize) {
                        clearTimeout(vvtimer);
                        parmas.ctxList = that.ctxList;
                        that.mkfile(parmas, callback);
                    } else {
                        console.log('错误');
                    }
                }
            });
        } else if (parmas.fileSize > that.blockSize) {
            var sendB = (function(that, parmas) {
                var timer = null;

                function sendBloack() {
                    if (that.offset == parmas.fileSize) {
                        parmas.ctxList = that.ctxList;
                        that.mkfile(parmas, callback);
                        return;
                    }
                    var bidx = 0;
                    var blkSize = parmas.fileSize - that.offset;
                    if (blkSize >= that.blockSize) {
                        blkSize = that.blockSize;
                    }
                    var pSize = parmas.fileSize - that.offset;
                    if (pSize >= that.chukSize) {
                        pSize = that.chukSize;
                    }
                    that.mkblk(0, blkSize, parmas.fileData.subarray(that.offset, (that.offset + pSize)), parmas.token, function(res) {
                        var isFlag = null;
                        that.ctxList.push(res.id);
                        that.offset += pSize;
                        bidx += pSize;
                        var percent = ((that.offset / parmas.fileSize) * 100).toFixed(0) + '%';
                        pcallback(percent)
                            // $('#par').html(percent);
                        vvput();

                        function vvput() {
                            if (bidx == blkSize) {
                                clearTimeout(isFlag);
                            }
                            var ppSize = blkSize - bidx;
                            if (ppSize >= that.chukSize) {
                                ppSize = that.chukSize;
                            }
                            that.bput(parmas.token, res.id, bidx, parmas.fileData.subarray(that.offset, (that.offset + ppSize)), function(res) {
                                that.offset += ppSize;
                                bidx += ppSize;
                                if (res.data.offset != -1) {
                                    isFlag = true;
                                    isFlag = setTimeout(vvput, 1);
                                } else {
                                    timer = setTimeout(sendBloack, 1);
                                }
                            });
                        }
                    });
                    // } while (true)
                }
                return { sendBloack: sendBloack };
            })(this, parmas);
            sendB.sendBloack();
        }
    };
    UploadFile.prototype.mkfile = function(parmas, callback) {

        var that = this;
        var list = parmas.ctxList.toString();
        var _url = that.urlDate.URL_MKFILE + that.URLSafeBase64Encode(parmas.fileName) + '/' + parmas.fileSize + '/' + that.URLSafeBase64Encode(parmas.fileType);
        fetch(_url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": parmas.token,
                "Content-Type": 'text/plain'
            },
            body: list
        }).then(function(respones) {
            respones.json().then(function(res) {
                if (that.upladParams.parames !== '') {
                    that.cutImages(res.data.key, that.upladParams.parames, callback);
                } else {
                    // console.log('mkfile');
                    callback(res);
                }
                if (that.upladParams.xls === 'xls') {
                    that.analysisXLSX(res.data.key);
                }
                parmas.fileReader = null;
            });
        });
    };
    /**
     *
     * 加密
     * @param {string} str
     * @returns {string}
     *
     * @memberOf UploadFile
     */
    UploadFile.prototype.URLSafeBase64Encode = function(v) {
        v = v ? v : '';
        v = __BASE64.encoder(v);
        return v.replace(/\//g, '_').replace(/\+/g, '-');
    };
    return UploadFile;
}());
export default UploadFile;
//# sourceMappingURL=upload.js.map