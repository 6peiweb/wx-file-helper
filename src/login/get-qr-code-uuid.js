const axios = require('axios');

const Url = require('../url');

async function getQrCodeUuid() {
    return axios.get(Url.login.GetQrCodeUuid, {
        params: {
            appid: 'wx_webfilehelper',
            redirect_uri: encodeURIComponent('https://filehelper.weixin.qq.com/cgi-bin/mmwebwx-bin/webwxnewloginpage'),
            fun: 'new',
            lang: 'zh_CN',
            _: Date.now(),
        },
    }).then(res => {
        try {
            const code = Number(res.data.match(/window.QRLogin.code = (\d+)/)[1]);
            const uuid = res.data.match(/window.QRLogin.uuid = "(.+)"/)[1];
            if (code !== 200 || !uuid) {
                throw res;
            }
            return {
                ...res,
                data: {
                    code,
                    uuid,
                }
            }
        } catch {
            throw res;
        }
    });
}

module.exports = getQrCodeUuid;