"use strict";
require('dotenv').config();
    const { flatDirectly } = require('../../library/required/get.js');
    const { noted } = require('../../library/writings/noted.js'); 
    const { boom, baileys, fs, chalk } = new flatDirectly();
    const { DisconnectReason } = baileys;
    const { Boom } = boom;
    
    module.exports = {
        async newModule(update, sessions) {
            try {
                if(global.qr !== update.qr) {
                    global.qr = update.qr
                };
                if(update.connection === 'connecting') {
                    console.log(noted.session.connecting({ text: "Menyambung..." }));
                } else if(update.connection === 'close') {
                    if(new Boom(update.lastDisconnect?.error)?.output.statusCode === DisconnectReason.badSession) { 
                        console.log(noted.session.badSession({ text: "Sesi Buruk, Menyambung Ulang..." }));
                        sessions('dbase/sessions'); 
                    } else if(new Boom(update.lastDisconnect?.error)?.output.statusCode === DisconnectReason.connectionClosed) { 
                        console.log(noted.session.connectionClosed({ text: "Koneksi Tertutup, Menyambung Ulang..." }));
                        sessions('dbase/sessions');
                    } else if(new Boom(update.lastDisconnect?.error)?.output.statusCode === DisconnectReason.connectionLost) { 
                        console.log(noted.session.connectionLost({ text: "Koneksi Terputus, Menyambung Ulang..." }));
                        sessions('dbase/sessions');
                    } else if(new Boom(update.lastDisconnect?.error)?.output.statusCode === DisconnectReason.connectionReplaced) { 
                        console.log(noted.session.connectionReplaced({ text: "Koneksi Tertimpa, Harap Tutup Sesi Sebelumnya..." }));
                        sessions('dbase/sessions');
                    } else if(new Boom(update.lastDisconnect?.error)?.output.statusCode === DisconnectReason.loggedOut) { 
                        console.log(noted.session.loggedOut({ text: "Koneksi Keluar, Menyambung Ulang..." }));
                        sessions('dbase/sessions');
                    } else if(new Boom(update.lastDisconnect?.error)?.output.statusCode === DisconnectReason.resessionsRequired) { 
                        console.log(noted.session.resessionsRequired({ text: "Mulai Ulang Di Butuhkan, Mencoba Ulang..." }));
                        sessions('dbase/sessions');
                    } else if(new Boom(update.lastDisconnect?.error)?.output.statusCode === DisconnectReason.timedOut) {
                        console.log(noted.session.timedOut({ text: "Waktu Habis, Menyambung Ulang..." }));
                        sessions('dbase/sessions');
                    } else {
                        console.log(noted.session.connectionClosed({ text: "Pemutusan terakhir, Menyambung Ulang..." }));
                        sessions('dbase/sessions');
                    };
                } else if(update.connection === 'open') {
                   console.log(noted.session.connectionClosed({ text: "Tersambung..." }));
                };
            } catch (err) {
                console.log(err);
            };
        },
    };
    
    let LordROJAK = require.resolve(__filename)
        fs.watchFile(LordROJAK, () => {
	        fs.unwatchFile(LordROJAK) 
        	console.log(chalk.bold(chalk.redBright('[FILE]'), chalk.blueBright('Update!'), chalk.yellowBright(__filename)))
    	    delete require.cache[LordROJAK]
      	    require(LordROJAK)
    });