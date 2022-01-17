const axios = require('axios');

const Url = require('../url');

async function sendFileHelperMessage(params, cookies, deviceId, config) {
    return axios.post(Url.fileHelper.send, {
        BaseRequest: {
            Uin: Number(params.wxuin),
            Sid: params.wxsid,
            Skey: params.skey,
            DeviceID: deviceId,
        },
        Msg: {
            ClientMsgId: config.msgId,
            Content: config.content,
            FromUserName: config.userName,
            LocalID: config.msgId,
            ToUserName: 'filehelper',
            Type: 1,
        },
        Scene: 0,
    }, {
        params: {
            lang: 'zh_CN',
            pass_ticket: params.pass_ticket,
        },
        headers: {
            mmweb_appid: 'wx_webfilehelper',
            // Cookie: cookies,
            // Origin: 'https://filehelper.weixin.qq.com',
        },
    });
}

module.exports = {
    sendFileHelperMessage,
};