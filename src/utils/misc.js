const { decode } = require("he");
const { devs } = require("../config.json");

module.exports = {
    joinParts: arr => {
        const last = arr.pop();
        if (!arr.length) return last;
        if (arr.length === 1) return `${arr[0]} and ${last}`;
        return `${arr.join(", ")}, and ${last}`;
    },

    selectFrom: arr => {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    capitalize: str => {
        return str.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
    },

    color: () => {
        return 0xA2D3E8;
    },

    parseTime: ms => {
        let secs = ms / 1000;
        const hours = parseInt(secs / 3600);
        secs = secs % 3600;
        const mins = parseInt(secs / 60);
        secs = secs % 60;
        secs = hours && mins ? Math.round(secs) : Math.round(secs * 10) / 10;
        return {
            h: hours,
            m: mins,
            s: secs
        };
    },

    joinTime: ms => {
        const time = module.exports.parseTime(ms);
        const keys = Object.keys(time);
        return module.exports.joinParts(keys.filter(key => time[key] !== 0).map(key => `**${time[key]}**${key}`));
    },

    shuffle: arr => {
        return arr.sort(() => { return 0.5 - Math.random(); });
    },

    parseUpperCase: str => {
        return (str[0].toUpperCase() + str.slice(1)).split(/(?=[A-Z])/).join(" ");
    },

    error: (err, message = null) => {
        const embed = {
            title: "⚠️ | Error!",
            description: err,
            color: module.exports.color(),
            footer: { text: "Contact CyberPop#3264 for help" }
        };

        if (!message) return embed;
        else {
            message.channel.createMessage({ embed: embed });
            return null;
        };
    },

    nextLevel: lvl => {
        return 50 * (lvl * lvl) + 150 * lvl;
    },

    emoji: () => {
        return "🌙";
    },

    fetchMember: (message, query) => {
        return message.channel.guild.members.find(member => [member.id, member.mention].includes(query));
    },

    fetchTag: user => {
        return `${user.username}#${user.discriminator}`;
    },

    decodeHTML: html => {
        return decode(html);
    },

    isDev: id => {
        return devs.includes(id);
    },

    months: () => {
        return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }
};