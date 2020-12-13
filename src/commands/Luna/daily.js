module.exports.exec = async ({ Luna, message }) => {
    const user = await Luna.db.fetchUser(message.author.id);
    const addAmt = Math.floor(Math.random() * user.level * user.level * 5) + user.level * user.level * 5;
    Luna.db.addShells(message.author.id, addAmt);

    return {
        title: "🌊 | Daily",
        description: `What's this? You found **${addAmt}** 🐚 washed up by the wave!`
    };
};

module.exports.props = {
    name: "daily",
    aliases: ["dailyclaim"],
    cat: "Luna",
    description: "Claim free shells each day!",
    perms: ["sendMessages", "embedLinks"],
    cd: 8.64e+7
};
