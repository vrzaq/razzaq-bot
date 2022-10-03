"use strict";
require('dotenv').config();
    const { flatDirectly } = require('../../library/required/get.js');
    const { noted } = require('../../library/writings/noted.js'); 
    const { switching, costumeText } = require('../../dbase/config/dat.json');
    const { boom, baileys, fs, chalk } = new flatDirectly();
    const { isJidStatusBroadcast, jidDecode } = baileys;
    
    module.exports = {
        async newModule(razzaq, anu) {
            try {
                let meta = await razzaq.groupMetadata(anu.id);
                if(switching.welcome) {
                    for (let x of anu.participants) {
                        if(x == razzaq.user.id) return
                        try {
                            var dp = await razzaq.profilePictureUrl(x, 'image')
                        } catch {
                            var dp = 'https://telegra.ph/file/3ccf9d18530dca4666801.jpg'
                        }
                        let textAdd = costumeText.welcome.msg.replace('@user', `@${jidDecode(x).user}`).replace('{title}', meta.subject)
                        let textRemove = costumeText.leave.msg.replace('@user', `@${jidDecode(x).user}`).replace('{title}', meta.subject)
                        if(anu.action == 'add' && costumeText.leave.status) {
                            if(textAdd.includes('{foto}')) {
                                razzaq.sendMessage(anu.id, { image: { url: dp }, mentions: [x], caption: textAdd.replace('{foto}', '') })
                            } else {
                                razzaq.sendMessage(anu.id, { text: textAdd, mentions: [x] })
                            }
                        } else if(anu.action == 'remove' && costumeText.leave.status) {
                            if(textRemove.includes('{foto}')) {
                                razzaq.sendMessage(anu.id, { image: { url: dp }, mentions: [x], caption: textRemove.replace('{foto}', '') })
                            } else {
                                razzaq.sendMessage(anu.id, { text: textRemove, mentions: [x] })
                            }
                        } else if(anu.action == 'promote') {
                            razzaq.sendMessage(anu.id, { image: { url: dp }, mentions: [x], caption: `Selamat @${x.split('@')[0]} atas jabatan menjadi admin di *${meta.subject}*` })
                        };
                    };
                };
            } catch (err) {
                if(String(err).includes("forbidden")) {
                    return;
                };
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