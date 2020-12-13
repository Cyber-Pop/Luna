const { get } = require("axios");
const reactions = {
    "1️⃣": 0,
    "2️⃣": 1,
    "3️⃣": 2,
    "4️⃣": 3
};

module.exports.exec = async ({ Luna, message }) => {
    const res = await get("https://opentdb.com/api.php?amount=1&type=multiple")
    .catch(err => Luna.error(err.toString(), message));

    const data = res.data.results[0];
    let answers = data.incorrect_answers;
    answers.push(data.correct_answer);
    answers = Luna.shuffle(answers);
    const msg = await message.channel.createMessage({ embed: {
        description: `**${Luna.decodeHTML(data.question)}**\n\n${answers.map(a => `${answers.indexOf(a) + 1}) _${Luna.decodeHTML(a)}_`).join("\n")}`,
        fields: [
            { name: "Difficulty", value: `\`${Luna.capitalize(data.difficulty)}\``, inline: true },
            { name: "Category", value: `\`${data.category}\``, inline: true }
        ],
        color: Luna.color(),
        footer: { text: "React with the correct answer in under 10 seconds!"}
    }});

    msg.addReaction("1️⃣");
    msg.addReaction("2️⃣");
    msg.addReaction("3️⃣");
    msg.addReaction("4️⃣");

    const filter = (userID, emoji) => userID === message.author.id && emoji.name in reactions;
    const react = await Luna.collectors.awaitReactions(msg, filter, { time: 10000, maxMatches: 1 });
    if (!react.length) return `Time's up! The correct answer is: \`${Luna.decodeHTML(data.correct_answer)}\`.`;

    const selected = reactions[react[0].emoji.name];
    if (answers[selected] === data.correct_answer) return "That's right! Way to go!";
    return `Oops! Got that wrong! The correct answer is: \`${Luna.decodeHTML(data.correct_answer)}\`.`;
};

module.exports.props = {
    name: "quiz",
    aliases: ["trivia"],
    cat: "study",
    description: "Test your knowledge on a range of subjects!",
    perms: ["sendMessages", "embedLinks"],
    cd: 1e+4
};