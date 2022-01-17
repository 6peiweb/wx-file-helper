const axios = require('axios');

const Url = require('../url');

async function scanQrCodeResp(uuid) {
    const now = Date.now();
    return axios.get(Url.login.ScanQrCodeResp, {
        params: {
            loginicon: true,
            uuid,
            tip: 1,
            appid: 'wx_webfilehelper',
            r: ~now,
            _: now,
        }
    }).then(res => {
        try {
            const code = Number(res.data.match(/window.code=(\d+)/)[1]);
            if (code !== 200) {
                return scanQrCodeResp(uuid);
            }
            return {
                ...res,
                data: {
                    code,
                    redirect_uri: res.data.match(/window.redirect_uri="(.+)"/)[1],
                }
            }
        } catch {
            throw res;
        }
    });
}

module.exports = scanQrCodeResp;