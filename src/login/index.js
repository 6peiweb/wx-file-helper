const getTicket = require('./get-ticket');
const getQrCodeUuid = require('./get-qr-code-uuid');
const openQrCodeImg = require('./open-qr-code-img');
const scanQrCodeResp = require('./scan-qr-code-resp');

async function login() {
    const uuidRes = await getQrCodeUuid();
    const uuid = uuidRes.data.uuid;
    await openQrCodeImg(uuid);
    const scanRes = await scanQrCodeResp(uuid);
    const ticketRes = await getTicket(scanRes.data.redirect_uri);
    return ticketRes;
}

module.exports = login;