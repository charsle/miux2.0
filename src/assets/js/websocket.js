import gloabl from '../../api/globConfig'
import * as URL from '../../api/restfull'
var _this = '';
var userinfo = gloabl.getCookie('allUserInfo');
// console.log(userinfo);
var Websocket = {
    socket: null,
    userID: '',
    userKyes: '',
    isFirst: false,
    index: 100,
    gComet() {
        if (userinfo == 'null' || userinfo == undefined) {
            return;
        } else {
            this.userID = JSON.parse(userinfo).user.UM0101;
            this.userKyes = JSON.parse(userinfo).user.UM0113;
            var params = 'id=' + this.userID + '&termtype=Web';
            gloabl.fethAsync(URL.WEBSOCKET_GCOMET, params, res => {
                this.websocket(res);
            })
        }
    },
    websocket(host) {
        var that = this;
        if ('WebSocket' in window) {
            that.socket = new WebSocket('ws://' + host);
        } else if ('MozWebSocket' in window) {
            that.socket = new MozWebSocket('ws://' + host);
        } else {
            throw '浏览器不支持websocket';

        }

        that.socket.onopen = function(evt) {
            that.onOpen(evt)
        };
        that.socket.onclose = function(evt) {
            that.onClose(evt)
        };
        that.socket.onmessage = function(evt) {
            that.onMessage(evt)
        };
        that.socket.onerror = function(evt) {
            that.onError(evt)
        };
    },
    onOpen(evt) {
        this.register();
        console.log('Info: websocket连接成功.' + JSON.stringify(evt));
        Websocket.heart();
    },
    onClose(evt) {
        console.log('Info: websocket断开链接.' + JSON.stringify(evt));
        Websocket.gComet();
    },
    onMessage(evt) {
        var data = (JSON.parse(evt.data));
        // console.log(data);
        this.messageData(evt);
    },
    onError(evt) {
        console.log('Info: websocket连接错误.' + JSON.stringify(evt));
    },
    //接受的消息
    messageData(message) {
        var data = (JSON.parse(message.data));
        var cmd = data.cmd,
            tid = data.tid;
        switch (cmd) {
            case 2: //注册应答
                var code = data.code;
                if (code == 0) {
                    return;
                } else {
                    layer.msg('网络异常，请重新登陆')
                    setTimeout(function() {
                        gloabl.loginOut();
                    }, 2000)
                }
                break;

            case 5: //推送
                var code = JSON.parse(data.data.msg);
                //				console.log(code);
                gloabl.notify(code, _this);
                this.responese(cmd, tid)
                break;
            case 7: //回调
                this.responese(cmd, tid)
                break;
            case 9: //接受消息
                var message = JSON.parse(data.data.msg);
                message.UM0310 = 0;
                //message.UM0301 = message.MSG00101;
                // console.log('接受的消息：', JSON.stringify(message));
                _this.$store.dispatch('MESSAGE_LIST', message);
                this.responese(cmd, tid)
                break;
            case 11: //踢人
                var reiren = data.data.reason;
                gloabl.tipTools('网络异常，请重新登陆')
                setTimeout(function() {
                    gloabl.loginOut();
                }, 2000)

                this.responese(cmd, tid)
                break;
            default:
                break;
        }
    },
    //响应
    responese(cmd, tid) {
        cmd = cmd + 1;
        var data = {
            cmd: cmd,
            tid: tid,
            code: 0,
            data: {

            }
        }
        try {
            setTimeout(function() {
                Websocket.socket.send(JSON.stringify(data));
            }, 100);
        } catch (e) {
            //TODO handle the exception
            throw e;
        }
    },
    //注册
    register() {
        var that = this;
        var data = {
                cmd: 1, //注册
                enCode: 0, //加密方式
                tid: 1212, //事物id
                data: {
                    "version": 1,
                    "termType": 8,
                    "id": that.userID,
                    "token": that.userKyes
                }
            }
            //心跳
        try {

            setTimeout(function() {
                Websocket.socket.send(JSON.stringify(data));
                if (Websocket.socket.readyState == 1) {
                    if (Websocket.isFirst) {
                        location.href = 'main.html';
                    }
                }
            }, 100)

        } catch (e) {
            throw e;
        }

    },
    //心跳
    heart() {
        var data = {
            cmd: 3, //心跳
            enCode: 0, //加密方式
            tid: 1212, //事物id
            data: {}
        }
        console.log(1)
        if (Websocket.socket.readyState !== 1) {
            Websocket.socket.close();
            layer.msg('网络异常，等待重连...', {
                icon: 16
            });
            Websocket.isFirst = true;
            Websocket.gComet();
        } else {

            layer.closeAll();
            Websocket.isFirst = false;
            Websocket.socket.send(JSON.stringify(data));
        }
        //setTimeout(Websocket.heart, 60 * 1000);

    },
    //发送
    sendMessage(data) {
        this.index++;
        try {
            var params = {
                    "cmd": 9,
                    "enCode": 0,
                    "tid": this.index,
                    "data": {
                        "msg": JSON.stringify(data)
                    }
                }
                // console.log('发送的消息', JSON.stringify(data))
            Websocket.socket.send(JSON.stringify(params));


            _this.$store.dispatch('MESSAGE_LIST', data)
        } catch (e) {
            throw e;
        }
    }
};

export function sendMessageInfo(data) {
    Websocket.sendMessage(data);
}
export function sendRegisterInfo(v_this) {
    _this = v_this;
    Websocket.gComet();
}