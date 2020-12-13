module.exports.exec = async ({ Luna, message, args }) => {
    const perms = message.channel.permissionsOf(message.author.id);
    if (!perms.has("administrator") && !Luna.config.devs.includes(message.author.id)) return "You can't change the server prefix!";
    if (!args.length) return "What do you want the prefix to be?"
    if (args[0].length >= 5) return "Prefix length has to be under **5** characters!";
    
    const guild = await Luna.db.fetchGuild(message.guildID);
    message.channel.createMessage(`Are you sure you want to change the server prefix to \`${args[0]}\`? This means instead of the prefix \`${guild.prefix}\`, commands will now start with \`${args[0]}\`. Like this: \`${args[0]}help\`. Type \`confirm\` in the chat to change the prefix!`);
    
    const filter = msg => msg.author.id === message.author.id && msg.content === "confirm";
    const res = await Luna.collectors.awaitMessages(message.channel, filter, { time: 10000, maxMatches: 1 });
    if (!res.length) return `Time has expired. Reset server prefix to \`${guild.prefix}\`!`;

    guild.prefix = args[0];
    guild.save().catch(err => console.log(err));
    return `Successfully changed server prefix to \`${args[0]}\`!`;
};

module.exports.props = {
    name: "prefix",
    cat: "bot",
    description: "Change the server prefix!",
    perms: ["sendMessages"],
    usage: "<prefix>",
    cd: 4.32e+7
};