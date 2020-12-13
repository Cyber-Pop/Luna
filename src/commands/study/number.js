const { get } = require("axios");

module.exports.exec = async ({ Luna, args }) => {
    if (!args.length) return "What number do you want facts on?";
    if (isNaN(args[0]) || parseInt(args[0]) < 0 || parseInt(args[0]) != args[0]) return "Please provide a positive integer value!";

    const res = await get(`http://numbersapi.com/${args[0]}${Math.random() < 0.5 ? "/math" : ""}?json`)
    .catch(() => {});

    if (!res) return "Sorry... I couldn't find that number.";
    if (!res.data.found) return "I can't think of any facts on that number...";
    return {
        title: `💭 | ${parseInt(args[0])} Factoid`,
        description: res.data.text,
        footer: { text: `Category: ${Luna.capitalize(res.data.type)}` }
    };
};

module.exports.props = {
    name: "number",
    aliases: ["numberfact", "numfact"],
    cat: "study",
    description: "See a random factoid on a number!",
    perms: ["sendMessages", "embedLinks"],
    usage: "<number>",
    cd: 1e+3
};