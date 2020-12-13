const replies = [
    "As I see it, yes.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don’t count on it.",
    "It is certain.",
    "It is decidedly so.",
    "Most likely.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Outlook good.",
    "Reply hazy, try again.",
    "Signs point to yes.",
    "Very doubtful.",
    "Without a doubt.",
    "Yes.",
    "Yes – definitely.",
    "You may rely on it."
];

module.exports.exec = async ({ Luna, args }) => {
    if (!args.length) return "What's do you want to ask?";

    return {
        title: "🎱 | 8-Ball",
        description: `❯ **Q**: \`${args.join(" ")}\`\n❯ **A**: ${Luna.selectFrom(replies)}`,
        thumbnail: { url: "https://images.emojiterra.com/google/android-pie/512px/1f3b1.png" }
    };
};

module.exports.props = {
    name: "8ball",
    aliases: ["eightball"],
    cat: "fun",
    description: "See what the magic 8-ball has to say!",
    perms: ["sendMessages", "embedLinks"],
    usage: "<question>",
    original: true,
    cd: 1e+3
};