module.exports.exec = async ({ Luna, message, args }) => {
    if (!args.length) return "Who do you want to ban?";

    let reason = "No reason provided...";
    if (args[1]) reason = args.slice(1).join(" ");

    const member = Luna.fetchMember(message, args[0]);
    if (!member) return "That's not a member of this server!";

    if (Luna.isDev(member.id)) return "I can't ban my developers!";
    if (member.id === Luna.bot.user.id) return "what";

    message.channel.guild.banMember(member.id, 0, reason)
    .then(() => {
        message.channel.createMessage({ embed: {
            title: "🚫 | Ban",
            fields: [
                { name: "Banned User", value: member.username },
                { name: "Banned By", value: message.author.username },
                { name: "Reason", value: reason }
            ],
            color: Luna.color()
        }});
    }).catch(() => message.channel.createMessage("I cannot ban this member!"));
};

module.exports.props = {
    name: "ban",
    cat: "moderation",
    description: "Ban a member from the guild...",
    perms: ["sendMessages", "embedLinks", "administrator", "banMembers"],
    usage: "<member>",
    cd: 6e+5,
    original: true
};