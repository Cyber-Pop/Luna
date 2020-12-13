const unscramble = require("unscramble");

module.exports.exec = async ({ args }) => {
    if (!args.length) return "What do you want to unscramble?";

    const un = unscramble(args[0]);

    return {
        title: "🧩 | Unscramble",
        fields: [
            { name: "Scrambled", value: `**${args[0]}**` },
            { name: "Unscrambled", value: un.map(word => `**${word}**`).join("\n") }
        ]
    };
};

module.exports.props = {
    name: "unscramble",
    cat: "text",
    description: "Unscramble a word!",
    perms: ["sendMessages", "embedLinks"],
    usage: "<word>",
    cd: 1e+3
};