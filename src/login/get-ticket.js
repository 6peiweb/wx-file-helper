const axios = require('axios');
const parser = require('xml2json');


async function getTicket(url) {
    return axios.get(`${url}&fun=new&version=v2`).then(res => {
        try {
            if (res && res.data) {
                return {
                    ...res,
                    data: JSON.parse(parser.toJson(res.data)),
                }
            }
            throw res;
        } catch {
            throw res;
        }
    });
}

module.exports = getTicket;