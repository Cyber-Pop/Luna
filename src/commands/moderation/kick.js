module.exports.exec = async ({ Luna, message, args }) => {
    if (!args.length) return "Who do you want to kick?";

    let reason = "No reason provided...";
    if (args[1]) reason = args.slice(1).join(" ");

    const member = Luna.fetchMember(message, args[0]);
    if (!member) return "That's not a member of this server!";

    if (Luna.isDev(member.id)) return "I can't kick my developers!";
    if (member.id === Luna.bot.user.id) return "what";

    message.channel.guild.kickMember(member.id, reason)
    .then(() => {
        message.channel.createMessage({ embed: {
            title: "🚧 | Kick",
            fields: [
                { name: "Kicked User", value: member.username },
                { name: "Kicked By", value: message.author.username },
                { name: "Reason", value: reason }
            ],
            color: Luna.color()
        }});
    }).catch(() => message.channel.createMessage("I cannot kick this member!"));
};

module.exports.props = {
    name: "kick",
    aliases: ["k"],
    cat: "moderation",
    description: "Kick a member from the guild...",
    perms: ["sendMessages", "embedLinks", "administrator", "kickMembers"],
    usage: "<member>",
    cd: 6e+5,
    original: true
};