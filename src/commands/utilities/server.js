module.exports.exec = async ({ Luna, message }) => {
    const guild = message.channel.guild;
    const createdAt = new Date(guild.createdAt);
    const joinedAt = new Date(guild.joinedAt);

    return {
        title: `📡 | ${guild.name}`,
        thumbnail: { url: guild.iconURL},
        fields: [
            { name: "👥 | Members", value: guild.memberCount, inline: true },
            { name: "⏱️ | Created On", value: `${Luna.months()[createdAt.getMonth()]} ${createdAt.getDate()}, ${createdAt.getFullYear()} UTC`, inline: true },
            { name: "🔑 | Server ID", value: guild.id, inline: true },
            { name: "🔗 | Joined On", value: `${Luna.months()[joinedAt.getMonth()]} ${joinedAt.getDate()}, ${joinedAt.getFullYear()} UTC`, inline: true },
            { name: "📙 | Language", value: guild.preferredLocale, inline: true },
            { name: "🚀 | Boosts", value: guild.premiumTier, inline: true },
            { name: "🚩 | Region", value: guild.region, inline: true },
            { name: "👑 | Owner", value: `<@${guild.ownerID}>`, inline: true },
            { name: "🧩 | Shard", value: guild.shard.id, inline: true }
        ]
    };
};

module.exports.props = {
    name: "server",
    aliases: ["guild", "guildinfo", "serverinfo"],
    cat: "utilities",
    description: "See stats on this server!",
    perms: ["sendMessages", "embedLinks"],
    cd: 1e+4
};