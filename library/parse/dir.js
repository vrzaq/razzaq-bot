"use strict";
require('dotenv').config();
    const { flatDirectly } = require('../required/get.js');
    const { switching, info } = require('../../dbase/config/dat.json');
    const { util, boom, baileys, fs, chalk } = new flatDirectly();

global.dataREKAP = {
    tebakgambar: JSON.parse(fs.readFileSync('./dbase/tebakgambar/tebakgambar.json')),
    antilinkgroup: JSON.parse(fs.readFileSync('./dbase/antilink/antilinkgroup.json')),
    ban: JSON.parse(fs.readFileSync('./dbase/banned/ban.json'))
};
exports.tebakgambar = global.dataREKAP.tebakgambar;
exports.antilinkgroup = global.dataREKAP.antilinkgroup;
exports.ban = global.dataREKAP.ban;