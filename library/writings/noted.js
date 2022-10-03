"use strict";
    exports.noted = {
        info: class info {
            static owner = async(opts) => {
                var obj = [
                    {
                        name: opts.name,
                        number: opts.number
                    },
                ];
                return obj[0].name || obj[0].number
            };
            static bot = async(opts) => {
                var obj = [
                    {
                        name: opts.name,
                        number: opts.number
                    },
                ];
                return obj[0].name || obj[0].number
            };
        },
        session: class session {
            static connecting = async(opts) => {
                var obj = [
                    {
                        text: opts.text
                    },
                ];
                return obj[0].text
            };
            static badSession = async(opts) => {
                var obj = [
                    {
                        text: opts.text
                    },
                ];
                return obj[0].text
            };
            static connectionClosed = async(opts) => {
                var obj = [
                    {
                        text: opts.text
                    },
                ];
                return obj[0].text
            };
            static connectionLost = async(opts) => {
                var obj = [
                    {
                        text: opts.text
                    },
                ];
                return obj[0].text
            };
            static connectionReplaced = async(opts) => {
                var obj = [
                    {
                        text: opts.text
                    },
                ];
                return obj[0].text
            };
            static loggedOut = async(opts) => {
                var obj = [
                    {
                        text: opts.text
                    },
                ];
                return obj[0].text
            };
            static resessionsRequired = async(opts) => {
                var obj = [
                    {
                        text: opts.text
                    },
                ];
                return obj[0].text
            };
            static timedOut = async(opts) => {
                var obj = [
                    {
                        text: opts.text
                    },
                ];
                return obj[0].text
            };
            static timedOut = async(opts) => {
                var obj = [
                    {
                        text: opts.text
                    },
                ];
                return obj[0].text
            };
        },
        reply: class reply {
            constructor(jid, text, options = {}) {
                this.jid = jid;
                this.text = text;
            };
            static send = function send(razzaq, options = {}) { 
                return razzaq.sendText(this.jid, this.text, { quoted: options })
            };
        },
    };