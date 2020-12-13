const { get } = require("axios");

module.exports.exec = async ({}) => {
    const res = await get("https://api.quotable.io/random")
    .catch(() => {});

    return {
        author: { name: res.data.author },
        title: "💬 | Quote",
        description: res.data.content
    };
};

module.exports.props = {
    name: "quote",
    aliases: ["randomquote"],
    cat: "fun",
    description: "Get a random quote!",
    perms: ["sendMessages", "embedLinks"],
    cd: 1e+3
};