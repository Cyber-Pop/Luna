const { find } = require("weather-js");

module.exports.exec = async ({ Luna, message, args }) => {
    if (!args.length) return "What's your location?";

    find({ search: args.join(" "), degreeType: "C" }, (err, res) => {
        if (!res || res.length === 0) return message.channel.createMessage("That's not a valid location!");

        const current = res[0].current;
        const location = res[0].location;
        
        message.channel.createMessage({ embed: {
            author: { name: current.observationpoint },
            title: "⛅ | Weather",
            description: `**${current.skytext}**`,
            fields: [
                { name: "Timezone", value: `UTC ${location.timezone}`, inline: true },
                { name: "Date", value: current.date, inline: true },
                { name: "Temperature", value: `**${current.temperature}**° ${location.degreetype}`, inline: true },
                { name: "Feels Like", value: `**${current.feelslike}**° ${location.degreetype}`, inline: true },
                { name: "Wind", value: current.winddisplay, inline: true },
                { name: "Humidity", value: `**${current.humidity}**%`, inline: true },
            ],
            thumbnail: { url: current.imageUrl },
            color: Luna.color()
        }});
    });
};

module.exports.props = {
    name: "weather",
    cat: "utilities",
    description: "Check the weather for today!",
    perms: ["sendMessages", "embedLinks"],
    usage: "<location>",
    cd: 1e+4
};
