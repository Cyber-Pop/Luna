const rps = {
    "✊": { win: "✌️", lose: "🖐️" },
    "🖐️": { win: "✊", lose: "✌️" },
    "✌️": { win: "🖐️", lose: "✊" }
};

module.exports.exec = async ({ Luna, message }) => {
    let msg = await message.channel.createMessage({ embed: {
        title: "🎲 | Rock Paper Scissors",
        description: "I challenge you to a game of ***PURE*** skill! (No luck involved)",
        color: Luna.color(),
        footer: { text: "React with your choice in under 10 seconds!" }
    }});

    msg.addReaction("✊");
    msg.addReaction("🖐️");
    msg.addReaction("✌️");

    const filter = (userID, emoji) => userID === message.author.id && emoji.name in rps;
    const res = await Luna.collectors.awaitReactions(msg, filter, { time: 10000, maxMatches: 1 });
    if (!res.length) return "Too slow! Time has expired!";
    const keys = Object.keys(rps);
    const choice = rps[res[0].emoji.name];
    const ai = keys[Math.floor(Math.random() * keys.length)];
    let description;

    if (choice.win === ai) description = "Noooooo! I lost! Wanna play again?";
    else if (choice.lose === ai) description = "I won! I told you it's a game of skill!";
    else description = "It's a tie! Good game!";

    return {
        title: "🎲 | Results",
        description: description,
        fields: [
            { name: "You Chose", value: res[0].emoji.name, inline: true },
            { name: "I Chose", value: ai, inline: true }
        ]
    };
};

module.exports.props = {
    name: "rockpaperscissors",
    aliases: ["rps"],
    cat: "games",
    description: "Play a game of classic Rock Paper Scissors!",
    perms: ["sendMessages", "embedLinks"],
    cd: 6e+5
};