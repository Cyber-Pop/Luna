module.exports.exec = async ({ Luna, message }) => {
    const user = await Luna.db.fetchUser(message.author.id);
    const keys = Object.keys(Luna.creatures);
    const creature = keys[user.level - 1];

    return {
        title: "📈 | Stats",
        fields: [
            { name: "Level", value: `Level **${user.level}** ─ ${Luna.capitalize(creature)} ${Luna.creatures[creature].emoji}`, inline: true },
            { name: "Shells", value: `**${user.shells}** 🐚`, inline: true },
            { name: "Water", value: `**${user.water}** / ${user.level >= Object.keys(Luna.creatures).length ? "MAX" : Luna.nextLevel(user.level)}`, inline: true },
            { name: "Food", value: `[${"■".repeat(Math.round(user.food / 10))}${"□".repeat(10 - Math.round(user.food / 10))}](https://www.youtube.com/watch?v=O4zspJXBqAY) \`${user.food}%\``, inline: true },
            { name: "Energy", value: `[${"■".repeat(Math.round(user.energy / 10))}${"□".repeat(10 - Math.round(user.energy / 10))}](https://www.youtube.com/watch?v=O4zspJXBqAY) \`${user.energy}%\``, inline: true },
            { name: "Health", value: `[${"■".repeat(user.health)}${"□".repeat(10 - user.health)}](https://www.youtube.com/watch?v=O4zspJXBqAY) \`${user.health} / 10\``, inline: true }
        ]
    };
};

module.exports.props = {
    name: "me",
    aliases: ["self", "stats"],
    cat: "Luna",
    description: "Check out your stats!",
    perms: ["sendMessages", "embedLinks"],
    cd: 1e+3
};
