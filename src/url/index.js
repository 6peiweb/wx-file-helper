const Url = {
    login: {
        GetQrCodeUuid: 'https://login.wx.qq.com/jslogin',
        GetQrCodeImg: 'https://login.weixin.qq.com/qrcode/{uuid}',
        ScanQrCodeResp: 'https://login.wx.qq.com/cgi-bin/mmwebwx-bin/login',
    },
    fileHelper: {
        init: 'https://filehelper.weixin.qq.com/cgi-bin/mmwebwx-bin/webwxinit',
        sync: 'https://filehelper.weixin.qq.com/cgi-bin/mmwebwx-bin/webwxsync',
        send: 'https://filehelper.weixin.qq.com/cgi-bin/mmwebwx-bin/webwxsendmsg',
        syncCheck: 'https://filehelper.weixin.qq.com/cgi-bin/mmwebwx-bin/synccheck',
    }
}

module.exports = Url;