"use strict";
require('dotenv').config();

exports.flatDirectly = class flatDirectly {
    constructor() {
        this.axios = require('axios'),
        this.baileys = require('@adiwajshing/baileys'),
        this.CFonts = require('cfonts'),
        this.figlet = require('figlet'),
        this.path = require('path'),
        this.fs = require('fs'),
        this.chalk = require('chalk'),
        this.FileType = require('file-type'),
        this.PhoneNumber = require('awesome-phonenumber'),
        this.Readline = require('readline'),
        this.boom = require('@hapi/boom'),
        this.jimp = require('jimp'),
        this.child_process = require('child_process'),
        this.util = require('util'),
        this.pino = require('pino'),
        this.os = require('os'),
        this.fluent_ffmpeg = require('fluent-ffmpeg'),
        this.node_webpmux = require('node-webpmux'),
        this.node_fetch = require('node-fetch'),
        this.crypto = require('crypto'),
        this.hxz = require('hxz-api'),
        this.yts = require('yt-search'),
        this.moment = require('moment-timezone'),
        this.jsdom = require('jsdom'),
        this.yargs = require('yargs/yargs');
    };
};

exports.regex = class regex {
    constructor() {
        this.ytIdRegex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/
    };
};
