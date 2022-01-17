const fs = require('fs');
const open = require('open');
const https = require('https');
const colors = require('colors/safe');

const Url = require('../url');

const ImgPath = 'qrcode.jpeg';

async function openQrCodeImg(uuid) {
    const url = Url.login.GetQrCodeImg.replace('{uuid}', uuid);
    const request = https.request(url, res => {
        let body = '';
        res.setEncoding('binary');
        res.on('data', data => body += data);
        res.on('end', () => fs.writeFileSync(ImgPath, body, 'binary'));
    });
    request.end()
    console.log(colors.green(`Please scan the QR Code opened in the Finder!`));
    return open(`./${ImgPath}`);
}

module.exports = openQrCodeImg;