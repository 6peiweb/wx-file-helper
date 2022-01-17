const WxFileHelper = require('./wx-file-helper');

const readline = require('./readline');

const wxFileHelper = new WxFileHelper();

wxFileHelper.bootstrap().then(() => {
    return readline(msg => {
        wxFileHelper.sendMessage(msg);
    });
});

