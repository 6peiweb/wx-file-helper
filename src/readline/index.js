const _readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

async function readline(effect) {
    const message = await new Promise(resolve => {
        _readline.question('', msg => {
            resolve(msg);
        });
    });
    await effect(message);
    return readline(effect);
}

module.exports = readline;