const { get } = require("axios");

const subreddits = [
    "memes",
    "dankmemes",
    "wholesomememes"
];

module.exports.exec = async ({ Luna }) => {
    const res = await get(`https://www.reddit.com/r/${Luna.selectFrom(subreddits)}/random/.json?obey_over18=true`)
    .catch(() => {});

    const data = res.data[0].data.children[0].data;
    return {
        title: data.title,
        url: `https://reddit.com${data.permalink}`,
        image: { url: data.url },
        footer: { text: `👍 | ${data.ups} - 💬 | ${data.num_comments}` }
    };
};

module.exports.props = {
    name: "meme",
    aliases: ["meemee"],
    cat: "fun",
    description: "Get some good memes!",
    perms: ["sendMessages", "embedLinks"],
    cd: 1e+3
};
