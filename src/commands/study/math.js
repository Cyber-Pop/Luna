const { get } = require("axios");

module.exports.exec = async ({ args }) => {
    if (!args.length) return "What do you want to calculate?";

    const question = args.join(" ");
    const res = await get(`https://api.mathjs.org/v4/?expr=${encodeURIComponent(question)}`)
    .catch(() => {});
    if (!res) return "I can't solve that equation...";

    return {
        title: "🧮 | Calculator",
        fields: [
            { name: "Input", value: `\`\`\`${question}\`\`\`` },
            { name: "Output", value: `\`\`\`${res.data}\`\`\`` }
        ]
    };
};

module.exports.props = {
    name: "math",
    aliases: ["calc"],
    cat: "study",
    description: "Evaluate a math equation!",
    perms: ["sendMessages", "embedLinks"],
    usage: "<equation>",
    cd: 1e+3
};