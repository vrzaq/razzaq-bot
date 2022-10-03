"use strict";
require('dotenv').config();
    const { flatDirectly } = require('../required/get.js');
    const { info, api } = require('../../dbase/config/dat.json');
    const { ban } = require('../parse/dir.js');
    const { moment, axios, baileys, fs, chalk, path, child_process, yargs, util, jimp, FileType } = new flatDirectly();
    const { delay, MessageType, getBuffer, isDeepStrictEqual, compressImage, proto, generateMessageID, jidNormalizedUser, isJidGroup, getContentType, fetchGroupMetadata } = baileys;
    const { spawn, exec } = child_process;

exports.bind = async(razzaq, m, store, options = {}) => {
    if(!m) return m
    let M = proto.WebMessageInfo
    m = M.fromObject(m)
    if(m.key) {
        m.chat = m.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || ''
        m.id = m.key.id
        m.isBot = m.id.startsWith("BAE5") && m.id.length == 16
        m.isGroup = await isJidGroup(m.chat)
        m.botNumber = razzaq.decodeJid(m.key?.fromMe)
        m.sender = m.bktNumber && razzaq.user.id || m.participant || m.key.participant || m.chat || ''
        m.fromMe = m.botNumber || m.sender, razzaq.user.id || [ m.botNumber, info.owner.number].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        m.itsMe = m.sender == razzaq.user.id ? true : false
        m.isBaileys = m.id && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || false
    }
    if(m.message) {
        let mtype = Object.keys(m.message)
        m.mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype[0]) && mtype[0]) || (mtype.length >= 3 && mtype[1] !== 'messageContextInfo' && mtype[1]) || mtype[mtype.length - 1] 
        m.msg = m.message[m.mtype]
        if(m.chat == 'status@broadcast' && ['protocolMessage', 'senderKeyDistributionMessage'].includes(m.mtype)) m.chat = (m.key.remoteJid !== 'status@broadcast' && m.key.remoteJid) || m.sender
        if(m.mtype == 'protocolMessage' && m.msg.key) {
            if(m.msg.key.remoteJid == 'status@broadcast') m.msg.key.remoteJid = m.chat
            if(!m.msg.key.participant || m.msg.key.participant == 'status_me') m.msg.key.participant = m.sender
            m.msg.key.fromMe = razzaq.decodeJid(m.msg.key.participant) === razzaq.user.id
            if(!m.msg.key.fromMe && m.msg.key.remoteJid === razzaq.user.id) m.msg.key.remoteJid = m.sender
        }
        m.text = m.msg.text || m.msg.caption || m.msg.contentText || m.msg || '' 
        if(typeof m.text !== 'string') {
            if([ 'protocolMessage', 'messageContextInfo', 'stickerMessage', 'audioMessage', 'senderKeyDistributionMessage' ].includes(m.mtype)) m.text = ''
            else m.text = m.text.selectedDisplayText || m.text.hydratedTemplate?.hydratedContentText || m.text
        }
        m.mentionedJid = m.msg?.contextInfo?.mentionedJid?.length && m.msg.contextInfo.mentionedJid || []
        let quoted = m.quoted = m.msg?.contextInfo?.quotedMessage ? m.msg.contextInfo.quotedMessage : null
        if(m.quoted) {
            let type = Object.keys(m.quoted)[0]
            m.quoted = m.quoted[type]
            if(typeof m.quoted === 'string') m.quoted = { text: m.quoted }
            m.quoted.mtype = type
            m.quoted.msg = m.quoted[m.quoted.mtype]
            m.quoted.id = m.msg.contextInfo.stanzaId
            m.quoted.chat = razzaq.decodeJid(m.msg.contextInfo.remoteJid || m.chat || m.sender)
            m.quoted.isBaileys = m.quoted.id && m.quoted.id.length === 16 || false
            m.quoted.sender = razzaq.decodeJid(m.msg.contextInfo.participant)
            m.quoted.fromMe = m.quoted.sender === razzaq.user.jid
            m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.contentText || ''
            m.quoted.name = razzaq.getName(m.quoted.sender)
            m.quoted.mentionedJid = m.quoted.contextInfo?.mentionedJid?.length && m.quoted.contextInfo.mentionedJid || []
            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    fromMe: m.quoted.fromMe,
                    remoteJid: m.quoted.chat,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            })
            m.getQuotedObj = m.getQuotedMessage = async () => {
                if(!m.quoted.id) return null
                let q = M.fromObject(await razzaq.loadMessage(m.quoted.id) || vM)
                return exports.bind(razzaq, q)
            }
            if(m.quoted.url || m.quoted.directPath) m.quoted.download = (saveToFile = false) => razzaq.downloadM(m.quoted, m.quoted.mtype.replace(/message/i, ''), saveToFile)
            m.quoted.reply = (text, chatId, options) => razzaq.reply(chatId ? chatId : m.chat, text, vM, options)
            m.quoted.copy = () => exports.bind(razzaq, M.fromObject(M.toObject(vM)))
            m.quoted.forward = (jid, forceForward = false) => razzaq.forwardMessage(jid, vM, forceForward)
            m.quoted.copyNForward = (jid, forceForward = true, options = {}) => razzaq.copyNForward(jid, vM, forceForward, options)
            m.quoted.cMod = (jid, text = '', sender = m.quoted.sender, options = {}) => razzaq.cMod(jid, vM, text, sender, options)
            m.quoted.delete = () => razzaq.sendMessage(m.quoted.chat, { delete: vM.key })
        }
    }
    m.name = !nullish(m.pushName) && m.pushName || razzaq.getName(m.sender)
    if(m.msg && m.msg.url) global.api = (saveToFile = false) => api.masgi(m.msg, m.mtype.replace(/message/i, ''), saveToFile)
    m.reply = async (text, chatId, options = {}) => {
        razzaq.reply(chatId ? chatId : m.chat, text, m, { 
            contextInfo: { 
                mentionedJid: razzaq.parseMention(text), 
                externalAdReply: { 
                    title: options.title,
                    body: options.body, 
                    sourceUrl: options.url, 
                    thumbnail: options.data 
                },
            }, 
        }, { fromMe: options.fromMe });
    };
    m.deletePromise = async(code) => await deletePromise(code) && JSON.stringify(`${code}`, null, 2)
    m.superType = await getContentType(m.message)
    m.numberLive = 1;
    m.body = (m.superType === 'conversation') ? m.message.conversation : (m.superType == 'imageMessage') ? m.message.imageMessage.caption : (m.superType == 'videoMessage') ? m.message.videoMessage.caption : (m.superType == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.superType == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.superType == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.superType == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.superType === 'messageContextInfo') ? (m.message.listResponseMessage.singleSelectReply.selectedRowId || m.message.buttonsResponseMessage.selectedButtonId || m.text) : '';
    m.prefix = /^[./~!#%^&=\,;:()]/.test(m.body) ? m.body.match(/^[./~!#%^&=\,;:()]/gi) : '#';
    m.command = m.body.toLowerCase().split(' ')[0] || '';
    m.isCmd = razzaq.isCmd = m.body.startsWith(m.prefix);
    m.args = m.body.trim().split(/ +/).slice(1);
    m.botNumber = await jidNormalizedUser(razzaq.user.id)
    m.isOwner = [ m.botNumber, info.owner.number[0]].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
    m.name = m.pushName || razzaq.getName(m.sender);
    m.thumb = await razzaq.profilePictureUrl(m.sender, 'image', 1000).catch(() => 'https://i.ibb.co/31vqq8h/depositphotos-9883921-stock-illustration-no-user-profile-picture.jpg');
    m.groupMetadata = m.isGroup ? store?.groupMetadata[m.chat] !== undefined ? store.groupMetadata[m.chat] : await store.fetchGroupMetadata(m.chat, razzaq) : {};
    m.groupMembers = m.isGroup ? m.groupMetadata.participants : [];
    m.groupAdmins = m.groupMembers.filter(v => v.admin !== null).map(x => x.id) || groupMembers.filter(v => v.superadmin !== null).map(x => x.id);
    m.isGroupAdmin = m.isOwner || m.groupAdmins.includes(m.sender);
    m.isBotGroupAdmin = m.groupAdmins.includes(m.botNumber);
    m.formattedTitle = m.isGroup ? m.groupMetadata.subject : '';
    m.quotedM = m.quoted ? m.quoted : m;
    m.mime = (m.quotedM.msg || m.quotedM).mimetype || '';
    m.isMedia = /image|video|sticker|audio/.test(m.mime);
    m.moment = moment.tz('asia/jakarta').format('HH:mm:ss');
    m.ucapanWaktu = "Selamat " + m.date.charAt(0).toUpperCase() + m.date.slice(1);
    m.isBanned = ban.includes(m.sender);
    if(m.msg && m.msg.url) m.download = () => razzaq.downloadM(m.msg, m.mtype.toLowerCase().replace(/message/i, ''));
    m.copy = () => exports.bind(razzaq, M.fromObject(M.toObject(m)))
    m.forward = (jid = m.chat, forceForward = false) => razzaq.copyNForward(jid, m, forceForward)
    m.copyNForward = (jid = m.chat, forceForward = true, options = {}) => razzaq.copyNForward(jid, m, forceForward, options)
    m.cMod = (jid, text = '', sender = m.sender, options = {}) => razzaq.cMod(jid, m, text, sender, options)
    m.delete = () => razzaq.sendMessage(m.chat, { delete: m.key })
        async function generateThumbnail(file, mediaType, info) {
            const alternate = (Buffer.alloc(1)).toString('base64')
            if('thumbnail' in info) {
                if(mediaType === MessageType.audio) { 
                    throw new Error('audio messages cannot have thumbnails') 
                } 
            } else if(mediaType === MessageType.image) {
                try {
                     const buff = await compressImage(file)
                     info.thumbnail = buff.toString('base64')
                } catch (err) {
                     console.error(err)
                     info.thumbnail = alternate
                } 
            } else if(mediaType === MessageType.video) {
                const imgFilename = path.join(tmpdir(), generateMessageID() + '.jpg')
                try {
                    try {
                        await extractVideoThumb(file, imgFilename, '00:00:00', { width: 48, height: 48 })
                        const buff = await fs.promises.readFile(imgFilename)
                        info.thumbnail = buff.toString('base64')
                        await fs.promises.unlink(imgFilename)
                    } catch (err) {
                        console.error(err)
                        info.thumbnail = alternate
                    }
                } catch (err) {
                    console.log('could not generate video thumb: ' + err)
                };
            };
        };
        try {
            await delay(1000)
            await razzaq.saveName(m.sender, m.name)
            await razzaq.pushMessage(m)
            if(m.isGroup) await razzaq.saveName(m.chat)
            if(m.msg && m.mtype == 'protocolMessage') await razzaq.ev.emit('message.delete', m.msg.key)
        } catch (err) {
            console.log(err);
        };
    return m;
};
exports.logic = (check, inp, out) => {
    if(inp.length !== out.length) throw new Error('Input and Output must have same length')
    for (let i in inp) if(isDeepStrictEqual(check, inp[i])) return out[i]
    return null;
};
exports.jsonformat = (string) => {
    return JSON.stringify(string, null, 2);
};
exports.isUrl = (url) => {
	return new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi).test(url);
};
exports.getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		console.log(err);
	};
};
exports.fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        console.log(err);
    };
};
exports.byteToSize = (bytes, decimals = 2) => {
    if(bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const size = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + size[i]
}
exports.proto = () => {
    Buffer.prototype.toArrayBuffer = function toArrayBufferV2() {
        const ab = new ArrayBuffer(this.length);
        const view = new Uint8Array(ab);
        for (let i = 0; i < this.length; ++i) {
            view[i] = this[i];
        };
        return ab;
    };
    Buffer.prototype.toArrayBufferV2 = function toArrayBuffer() {
        return this.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength)
    };
    ArrayBuffer.prototype.toBuffer = function toBuffer() {
        return Buffer.from(new Uint8Array(this))
    };
    String.prototype.isNumber = Number.prototype.isNumber = isNumber
    Uint8Array.prototype.getFileType = ArrayBuffer.prototype.getFileType = Buffer.prototype.getFileType = async function getFileType() {
        const { fileTypeFromBuffer } = await import('file-type')
        return await fileTypeFromBuffer(this)
    };
};

function nullish(args) {
    return !(args !== null && args !== undefined)
};
function deletePromise(code) {
    return Promise.resolve !== String(`${code}`) === true ? JSON.stringify(`${code}`, null, 2) : ''
};