const emojis = {
    bot: "🤖",
    fun: "😃",
    games: "🎲",
    moderation: "🚨",
    Luna: "🌙",
    study: "📚",
    text: "📝",
    utilities: "🛠"
};

module.exports.exec = async ({ Luna, message, args }) => {
    const guild = await Luna.db.fetchGuild(message.guildID);
    if (args[0]) return getCMD(Luna, args[0], guild.prefix);
    return getAll(Luna, guild.prefix);
};

module.exports.props = {
    name: "help",
    aliases: ["cmds", "commands", "info", "information", "h"],
    cat: "utilities",
    description: "Here are all the commands!",
    perms: ["sendMessages", "embedLinks", "externalEmojis"],
    usage: "[command]",
    cd: 1e+3
};

function getAll(client, prefix) {
    const commands = (cat) => {
        return client.cmds
        .filter(cmd => cmd.props.cat === cat && (!cmd.props.perms || !cmd.props.perms.includes("dev")))
        .map(cmd => `\`${cmd.props.name}\``)
        .join("\n");
    };

    return {
        title: "📝 | Help",
        description: `Type \`${prefix}help [command]\` to see information on that command!`,
        fields: client.cats.filter(cat => commands(cat).length > 0).map(cat => ({ name: `${cat === "luna" ? client.emoji() : emojis[cat]} ${client.capitalize(cat)}`, value: commands(cat), inline: true })),
    };
};

function getCMD(client, input, prefix) {
    const cmd = client.cmds.find(cmd => cmd.props.name === input.toLowerCase() || (cmd.props.aliases && cmd.props.aliases.includes(input.toLowerCase())));

    if (!cmd || !cmd.props.name || (cmd.props.perms && cmd.props.perms.includes("dev"))) return client.error(`No information found on the command \`${input.toLowerCase()}\`.`);

    let footer = null;

    let info = `**Command**: \`${cmd.props.name}\``;
    if (cmd.props.aliases) info += `\n❯ **Aliases**: ${client.joinParts(cmd.props.aliases.sort().map(alias => `\`${alias}\``))}`;
    if (cmd.props.description) info += `\n❯ **Description**: ${cmd.props.description}`;
    if (cmd.props.cat) info += `\n❯ **Category**: ${emojis[cmd.props.cat]} ${client.capitalize(cmd.props.cat)}`;
    if (cmd.props.cd) info += `\n❯ **Cooldown**: ${client.joinTime(cmd.props.cd)}`;
    if (cmd.props.perms) info += `\n❯ **Permissions**: ${client.joinParts(cmd.props.perms.sort().map(perm => `\`${client.parseUpperCase(perm)}\``))}`;
    if (cmd.props.usage) {
        info += `\n❯ **Usage**: \`${prefix}${cmd.props.name} ${cmd.props.usage}\``;
        footer = { text: `Syntax: <> = required, [] = optional` };
    } else {
        info += `\n❯ **Usage**: \`${prefix}${cmd.props.name}\``;
    };

    return {
        title: "📝 | Help",
        description: info,
        footer: footer
    };
};
