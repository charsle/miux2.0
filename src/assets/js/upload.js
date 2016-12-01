import __BASE64 from './newBase64'
import {
    hex_md5
} from './MD5'

import gloabl from '../../api/globConfig'
import * as URL from '../../api/restfull'
/**
 * @type {Number} 类型 1无权限 2有权限
 * @file {Object} 主上传文件 input
 * @xls {String} 如果是导入联系人，必传，其他传空或者不传
 * @params {Object} 上传头像裁剪必传  其他传空或者不传
 * @w_this {Object} 如果需要接受返回值，必传
 */
export function uploadAll(type, file, xls, params, callback, loadcallback) {
    xls = xls ? xls : '';
    params = params ? params : '';

    var URL_MKBLK = '',
        URL_BPUT = '',
        URL_MKFILE = '',
        URL_CHECK = '',
        LOOP_SUCCESS = false,
        URL_XLSX = "", //解析xls
        URL_CLIP = ""; //图片裁剪

    if (type === 1) { //无权限

        URL_MKBLK = URL.UPLOAD_NOT_PRVATE + "mkblk/";
        URL_BPUT = URL.UPLOAD_NOT_PRVATE + "bput/";
        URL_MKFILE = URL.UPLOAD_NOT_PRVATE + "mkfile/";
        URL_CLIP = URL.UPLOAD_NOT_PRVATE + "clip/"; //图片裁剪
        uploadFile();
    } else if (type === 2) {
        URL_CHECK = URL.UPLOAD_PRVATE + "check";
        URL_MKBLK = URL.UPLOAD_PRVATE + "mkblk/";
        URL_BPUT = URL.UPLOAD_PRVATE + "bput/";
        URL_MKFILE = URL.UPLOAD_PRVATE + "mkfile/";
        URL_XLSX = URL.UPLOAD_PRVATE + "xlsx/";
        //上传验证
        uploadFile();
    }

    function toByteArray(arr) {
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
    }
    /**
     *  获取token
     */
    function getFileToken(checkSum, __callback) {
        var _this = this;
        var token = '';
        var parmas = 'filename=' + file.name + '&filesize=' + file.size + '&mimetype=' + file.type + '&checksum=' + checkSum

        fetch(URL.GET_UPLOAD_TOKEN_URL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            body: parmas
        }).then(respones => {
            respones.json().then(res => {
                return __callback(res.result)
            });
        });
    }
    /**
     * 上传验证
     */
    function checkFile(token, checksum, _callback) {
        $.ajax({
            url: URL_CHECK,
            data: 'checksum=' + checksum,
            type: 'post',
            dataType: 'json',
            async: false,
            processData: false,
            headers: {
                "Authorization": token,
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        }).done(function(res) {
            // console.log('checkFile');
            callback(res);
            _callback(res)
        });
    }

    /**
     * 创建块 返回块id
     * @param {Object} offse
     * @param {Object} size
     * @param {Object} data
     * @param {Object} token
     */

    function mkblk(offset, size, data, token, __callback) {
        var blockId = null;
        var _url = URL_MKBLK + size;
        $.ajax({
            url: _url,
            type: 'POST',
            data: (data),
            async: false,
            processData: false,
            dataType: 'json',
            headers: {
                "Authorization": token,
                "Content-Type": 'application/octet-stream'
            }
        }).done(function(res) {
            if (res.code == 0) {
                blockId = res.data.id;
                __callback(blockId)
            }
        });
    }
    /**
     * 上传块
     * @param {Object} token 标示
     * @param {Object} blockId 块id
     * @param {Object} offset 便宜量
     * @param {Object} data 数据
     * bput('asdasd', blockid, offset,fileData.subarray(offset, offset + pSzie));
     */
    function bput(token, blockId, offset, data) {
        $.ajax({
            url: URL_BPUT + blockId + '/' + offset,
            data: (data),
            type: 'post',
            dataType: 'json',
            async: false,
            processData: false,
            headers: {
                "Authorization": token,
                "Content-Type": 'application/octet-stream'
            }
        })
    }
    /**
     *
     * @param {Object} token 标示
     * @param {Object} fileName 文件名称
     * @param {Object} minmType 文件类型
     * @param {Object} fileSize 文件大小
     * @param {Object} blockList  块列表
     */
    function mkfile(token, fileName, minmType, fileSize, blockList) {
        var list = '';
        list = blockList.join(',');
        $.ajax({
            url: URL_MKFILE + URLSafeBase64Encode(fileName) + '/' + fileSize + '/' + URLSafeBase64Encode(minmType),
            data: list,
            type: 'post',
            dataType: 'json',
            async: false,
            processData: false,
            headers: {
                "Authorization": token,
                "Content-Type": 'text/plain'
            }
        }).done(function(res) {
            if (params !== '') {
                cutImages(res.data.key, params);
            } else {
                // console.log('mkfile');
                callback(res);
            }
            if (xls === 'xls') {
                analysisXLSX(res.data.key, token);
            }
        })

    }

    /**
     * 图片裁剪
     */
    function cutImages(keys, params) {
        $.ajax({
            url: URL_CLIP + keys,
            data: params,
            type: 'post',
            dataType: 'json',
            async: false,
            processData: false,
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        }).done(function(res) {
            // console.log('图片裁剪');
            callback(res);
        })

    }

    /**
     * 解析xlxs
     */
    function analysisXLSX(keys, token) {

        var getUserInfo = JSON.parse(gloabl.getCookie('allUserInfo')).user;
        // var getUserInfo = JSON.parse(gloabl.getCookie('chooseTeam'));
        $.ajax({
            url: URL_XLSX + keys,
            data: 'TM00301=' + getUserInfo.UM0101 + '&teamSid=' + getUserInfo.UM0126,
            type: 'post',
            dataType: 'text',
            async: false,
            processData: false,
            headers: {
                "Authorization": token,
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        }).done(function(res) {
            if (res === '导入成功') {
                layer.msg(res);
                LOOP_SUCCESS = true;
                setTimeout(function() {
                    layer.closeAll();
                }, 1000)
            } else {
                layer.msg(res);
            }
        })

    }
    var ctxList = [];
    var offset = 0;
    var blockSize = 400 * 1024; // 400k
    var chukSize = 100 * 1024; // 片大小
    function uploadFile() {
        var fileSize = file.size; //文件大小
        var fileType = file.type; //文件类型
        var fileName = file.name; //文件名称
        var fileReader = new FileReader();
        var method = 'readAsBinaryString';
        fileReader.addEventListener('load', event_reader_loadend, false);
        if (!fileReader[method]) {
            method = 'readAsArrayBuffer';
        }

        fileReader[method](file.slice(0, fileSize));

        function event_reader_loadend(e) {
            if (e.target.readyState === FileReader.DONE) {
                var fileData = (toByteArray(e.target.result));
                var token = '';
                var checkSum = hex_md5(e.target.result);
                if (type == 2) {
                    //有权限获取token
                    getFileToken(checkSum, token => {
                        //检查是否上传
                        checkFile(token, checkSum, data => {
                            //1 已经上传  无需上传
                            if (data.code === 1) {
                                if (xls === 'xls') {
                                    analysisXLSX(data.data.key, token)
                                }
                            } else {
                                allUploadBlock(fileReader, fileName, fileType, fileSize, fileData, token)
                            }
                        });
                    });
                } else {
                    allUploadBlock(fileReader, fileName, fileType, fileSize, fileData, token)
                }
            }
        }
    }
    //上传切片所有
    function allUploadBlock(fileReader, fileName, fileType, fileSize, fileData, token) {

        if (fileSize <= chukSize) {
            mkblk(0, fileSize, fileData.subarray(0, fileSize), token, blockid => {
                ctxList.push(blockid);
            })
            mkfile(token, fileName, fileType, fileSize, ctxList);
            fileReader = null;
            return;
        } else if (fileSize <= blockSize) {
            mkblk(offset, fileSize, fileData.subarray(offset, (offset + chukSize)), token, blockid => {
                ctxList.push(blockid);
                offset += chukSize;
                while (true) {
                    if (offset < fileSize) {
                        var pSzie = fileSize - offset;
                        if (pSzie > chukSize) {
                            pSzie = chukSize
                        }
                        bput(token, blockid, offset, fileData.subarray(offset, (offset + pSzie)));
                        offset += pSzie;
                    } else if (offset == fileSize) {
                        mkfile(token, fileName, fileType, fileSize, ctxList)
                        fileReader = null;
                        return;
                    } else {
                        console.log('错误')
                    }
                }

            });
        } else if (fileSize > blockSize) {
            while (true) {
                if (offset == fileSize) {
                    mkfile(token, fileName, fileType, fileSize, ctxList);
                    fileReader = null;
                    return;
                }
                var blkSize = fileSize - offset;
                if (blkSize >= blockSize) {
                    blkSize = blockSize;
                }
                var pSize = fileSize - offset;
                if (pSize >= chukSize) {
                    pSize = chukSize;
                }
                var bidx = 0;

                mkblk(0, blkSize, fileData.subarray(offset, (offset + pSize)), token, blockid => {
                    ctxList.push(blockid);
                    offset += pSize;
                    bidx += pSize;
                    while (true) {
                        if (bidx == blkSize) {
                            break;
                        }
                        if (typeof loadcallback != 'undefined') {
                            var percent = ((offset / fileSize) * 100).toFixed(0);
                            // onmessage = function() {
                            //     postMessage(percent);
                            //   }
                            loadcallback(percent);
                        }

                        var ppSize = blkSize - bidx;
                        if (ppSize >= chukSize) {
                            ppSize = chukSize;
                        }
                        bput(token, blockid, bidx, fileData.subarray(offset, (offset + ppSize)));
                        offset += ppSize;
                        bidx += ppSize;
                    }
                });
            }
        }
    }
    var URLSafeBase64Encode = function(v) {
        v = __BASE64.encoder(v);
        return v.replace(/\//g, '_').replace(/\+/g, '-');
    };
}