module.exports.exec = async ({ args }) => {
    if (!args.length) return "What words do you want in binary?";

    return {
        title: "💾 Binary",
        fields: [
            { name: "String", value: `**${args.join(" ")}**` },
            { name: "Binary", value: `\`\`\`${args.join(" ").split("").map(char => char.charCodeAt(0).toString(2)).join(" ")}\`\`\`` }
        ]
    };
};

module.exports.props = {
    name: "binary",
    aliases: "01",
    cat: "text",
    description: "Convert text into binary!",
    perms: ["sendMessages", "embedLinks"],
    usage: "<text>",
    cd: 1e+3,
    original: true
};