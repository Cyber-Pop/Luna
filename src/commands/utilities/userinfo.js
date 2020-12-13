const status = {
    online: "🟢 | Online",
    idle: "🌙 | Idle",
    dnd: "⛔ | Do Not Disturb",
    offline: "⚫ | Offline"
};

module.exports.exec = async ({ Luna, message, args }) => {
    let user;
    if (!args.length) user = Luna.fetchMember(message, message.author.id);
    else user = Luna.fetchMember(message, args[0]);
    
    if (!user) return "Hmm... I couldn't find that user.";

    const createdAt = new Date(user.createdAt);
    const joinedAt = new Date(user.joinedAt);
    return {
        author: {
            name: `${Luna.fetchTag(user)}${(user.bot ? " [BOT]" : "")}`,
            icon_url: user.avatarURL
        },
        title: "👤 | Profile",
        fields: [
            { name: "Nickname", value: user.nick ? user.nick : user.username, inline: true },
            { name: "Account Created", value: `${Luna.months()[createdAt.getMonth()]} ${createdAt.getDate()}, ${createdAt.getFullYear()}`, inline: true },
            { name: "Joined On", value: `${Luna.months()[joinedAt.getMonth()]} ${joinedAt.getDate()}, ${joinedAt.getFullYear()}`, inline: true },
            { name: "Roles", value: user.roles.length ? Luna.joinParts(user.roles.map(id => `\`${message.channel.guild.roles.find(role => role.id === id).name}\``)) : "None", inline: false },
            { name: "Status", value: user.status ? status[user.status] : "⚫ | Offline", inline: true }
        ],
        footer: { text: `ID: ${user.id}` }
    };
};

module.exports.props = {
    name: "userinfo",
    aliases: ["user"],
    cat: "utilities",
    description: "Check stats on a user!",
    perms: ["sendMessages", "embedLinks"],
    usage: "<user>",
    cd: 1e+4
};