const colors = require('colors/safe');
const bigint = require('big-integer');

const login = require('./login');
const {
    initFileHelperMessage,
    syncFileHelperMessage,
    syncCheckFileHelperMessage,
} = require('./file-helper/sync-file-helper-message');
const { sendFileHelperMessage } = require('./file-helper/send-file-helper-message');

class WxFileHelper {
    initMessage = true;
    ticket = {};
    cookies = '';
    syncKey = '';
    userInfo = {};
    lastMsgId = '1432320262317137658';
    deviceId = Math.random().toString().slice(-16, -1);

    async bootstrap() {
        await login().then(loginRes => {
            this.ticket = loginRes.data.error;
            this.cookies = loginRes.headers['set-cookie'].map(item => {
                return item.match(/(.+?=.+?);/)[1]
            }).join('; ');
        });
        console.log(colors.green('Connection succeeded!!!'));
        this.syncMessage();
        return this;
    }

    async syncMessage() {
        if (this.initMessage) {
            const initRes = await initFileHelperMessage(this.ticket, this.cookies, this.deviceId);
            this.syncKey = initRes.data.SyncKey.List.map(item => `${item.Key}_${item.Val}`).join('|');
            this.userInfo = initRes.data.User;
            this.initMessage = false;
        }
        const checkRes = await syncCheckFileHelperMessage(this.ticket, this.cookies, this.deviceId, this.syncKey);
        if (Number(checkRes.data.selector) > 0) {
            const syncRes = await syncFileHelperMessage(this.ticket, this.cookies, this.deviceId, this.syncKey);
            this.syncKey = syncRes.data.SyncKey.List.map(item => `${item.Key}_${item.Val}`).join('|');
            const addMsgList = syncRes.data.AddMsgList;
            addMsgList.forEach(item => {
                console.log(item.Content);
            });
            if (addMsgList.length) {
                this.lastMsgId = addMsgList[addMsgList.length - 1].MsgId;
            }
        }
        await new Promise(resolve => {
            setTimeout(() => {
                resolve(true)
            }, 1 * 1000);
        });
        return this.syncMessage()
    }

    async sendMessage(msg) {
        this.lastMsgId = bigint(this.lastMsgId).add(1).toString();
        const sendRes = await sendFileHelperMessage(this.ticket, this.cookies, this.deviceId, {
            userName: this.userInfo.UserName,
            msgId: this.lastMsgId,
            content: msg,
        });
        if (sendRes.data.MsgID) {
            this.MsgId = sendRes.data.MsgID;
        }
    }
}

module.exports = WxFileHelper;