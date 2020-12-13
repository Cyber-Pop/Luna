const ascii = require("asciiart-logo");

module.exports.exec = async ({ Luna, message, args }) => {
    if (!args.length) return "What do you want me to say?";

    return `\`\`\`\n${ascii({
        name: args.join(" "),
        font: "Standard",
        lineChars: 10,
        padding: 1,
        margin: 1
    }).emptyLine().right(`- ${Luna.fetchTag(message.author)}`).emptyLine().render()}\n\`\`\``;
};

module.exports.props = {
    name: "ascii",
    aliases: ["asciify"],
    cat: "text",
    description: "Have me say something in ascii text!",
    perms: ["sendMessages"],
    usage: "<text>",
    cd: 1e+4,
    original: true
};