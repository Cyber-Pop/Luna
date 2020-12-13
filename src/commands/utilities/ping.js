module.exports.exec = async ({ Luna, message }) => {
    let m = await message.channel.createMessage("🏓");
    m.edit({ embed: {
        title: "🏓 | Pong!",
        description: `Bot to API - ${Math.round(m.createdAt - message.createdAt)}ms\n\n❯ Shard to Guild - ${message.channel.guild.shard.latency.toFixed()}ms`,
        color: Luna.color()
    }});
};

module.exports.props = {
    name: "ping",
    aliases: ["lag", "latency", "pi"],
    cat: "utilities",
    description: "Check the message and server latency!",
    perms: ["sendMessages", "embedLinks"],
    cd: 1e+3
};