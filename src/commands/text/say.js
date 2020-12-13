module.exports.exec = async ({ Luna, message, args }) => {
    if (!args.length) return "What do you want me to say?";

    return `${args.join(" ")}\n\n- **${Luna.fetchTag(message.author)}**`;
};

module.exports.props = {
    name: "say",
    aliases: ["repeat"],
    cat: "text",
    description: "Have me say something!",
    perms: ["sendMessages"],
    usage: "<text>",
    cd: 1e+3,
    original: true
};