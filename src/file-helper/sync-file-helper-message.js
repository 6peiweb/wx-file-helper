const axios = require('axios');

const Url = require('../url');

async function initFileHelperMessage(params, cookies, deviceId) {
    return axios.post(Url.fileHelper.init, {
        BaseRequest: {
            Uin: Number(params.wxuin),
            Sid: params.wxsid,
            Skey: params.skey,
            DeviceID: deviceId,
        }
    }, {
        params: {
            r: ~Date.now(),
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

async function syncFileHelperMessage(params, cookies, deviceId, syncKey) {
    const syncKeyList = syncKey.split('|').map(item => {
        const [key, value] = item.split('_');
        return {
            Key: Number(key),
            Val: Number(value),
        }
    });
    return axios.post(Url.fileHelper.sync, {
        BaseRequest: {
            Uin: Number(params.wxuin),
            Sid: params.wxsid,
            Skey: params.skey,
            DeviceID: deviceId,
        },
        SyncKey: {
            Count: syncKeyList.length,
            List: syncKeyList,
            rr: ~Date.now(),
        },
    }, {
        params: {
            sid: params.wxsid,
            skey: params.skey,
            pass_ticket: params.pass_ticket,
        },
        headers: {
            mmweb_appid: 'wx_webfilehelper',
            // Cookie: cookies,
            // Origin: 'https://filehelper.weixin.qq.com',
        },
    });
}

async function syncCheckFileHelperMessage(params, cookies, deviceId, syncKey) {
    return axios.get(Url.fileHelper.syncCheck, {
        params: {
            r: Date.now(),
            skey: params.skey,
            sid: params.wxsid,
            uin: Number(params.wxuin),
            deviceid: deviceId,
            synckey: syncKey,
            mmweb_appid: 'wx_webfilehelper',
        },
        headers: {
            Cookie: cookies,
        },
    }).then(res => {
        try {
            const checkRes = {};
            res.data.match(/[a-z]+:(\"\d\")/g).forEach(item => {
                const [key, value] = item.split(':');
                checkRes[key] = value.replace(/"/g, '');
            });
            if (checkRes.retcode !== '0' || !checkRes.selector) {
                throw res;
            }
            return {
                ...res,
                data: checkRes,
            };
        } catch {
            throw res;
        }
    });
}

module.exports = {
    initFileHelperMessage,
    syncFileHelperMessage,
    syncCheckFileHelperMessage,
}

