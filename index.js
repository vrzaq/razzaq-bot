"use strict";
require('dotenv').config();
    const { flatDirectly } = require('./library/required/get.js');
    const { info } = require('./dbase/config/dat.json');
    const { jsonformat } = require('./library/events/bind.js');
    const { noted } = require('./library/writings/noted.js');
    const { baileys, fs, chalk, figlet, CFonts, yargs, pino, Boom } = new flatDirectly();
    const { default: makeWASocket, fetchLatestBaileysVersion, makeInMemoryStore, useMultiFileAuthState, Browsers, areJidsSameUser, jidNormalizedUser, proto, generateWAMessageFromContent, DisconnectReason } = baileys;

async function sessions(path) {
    try {
        var { version: WAVersion, isLatest } = await fetchLatestBaileysVersion();
        var { state, saveCreds } = await useMultiFileAuthState(path);
        var store = await makeInMemoryStore({ 
            logger: pino({ 
                level: 'silent' 
            }),
        });
        var razzaq = await makeWASocket({ 
            version: WAVersion, 
            logger: pino({ 
                level: 'silent' 
            }), 
            printQRInTerminal: true, 
            auth: state, 
            msgRetryCounterMap: {}, 
            browser: Browsers.appropriate('Arifi Razzaq'),
            getMessage: async key => {
                if(store) {
                    var msg = await store.loadMessage(key.remoteJid, key.id, undefined)
                    return msg?.message || undefined
                };
                return {
                    conversation: 'Terjadi Kesalahan, Ulangi Command!'
                };
            },
        });
        store?.bind(razzaq.ev);
        razzaq.ev.on('connection.update', async (update) => {
            require('./action/connect/connection.js').newModule(update, sessions);
        });
        razzaq.ev.on('group-participants.update', async (anu) => {
            require('./action/message/group.js').newModule(razzaq, anu);
        });
        razzaq.ev.on('creds.update', saveCreds)
        razzaq.ev.on('messages.upsert', async (msg) => {
            require('./action/message/chat.js').newModule(msg, razzaq, store);
        });
        require('./action/function/addition.js').depthModule(razzaq, store)
    } catch (err) {
        console.log(err)
    };
};

sessions('dbase/sessions').then(() => {
    console.log(chalk.hex('#FF8800').bold(figlet.textSync(info.owner.name, { 
        font: 'Standard',
        horizontalLayout: 'default', 
        vertivalLayout: 'default', 
        width: 80, 
        whitespaceBreak: false
    })))
}).catch(console.warn)

let LordROJAK = require.resolve(__filename)
    fs.watchFile(LordROJAK, () => {
	    fs.unwatchFile(LordROJAK) 
    	console.log(chalk.bold(chalk.redBright('[FILE]'), chalk.blueBright('Update!'), chalk.yellowBright(__filename)))
    	delete require.cache[LordROJAK]
      	require(LordROJAK)
    })
        process.on("uncaughtException", console.warn);
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.TERMUX_IS_DEBUGGABLE_BUILD 