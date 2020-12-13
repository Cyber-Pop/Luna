const { readdirSync } = require('fs');
const { join } = require('path');
const { Base } = require('eris-sharder')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Pinged!')
})

app.listen(3000, () => console.log('Server ready'));

class Luna extends Base {
    constructor(client) {
        super(client);

        this.cmds = [];
        this.handler = require("./handler/msgHandler").handler;
        this.db = require("./utils/dbFunctions")(this);
        this.cats = readdirSync(join(__dirname, "commands"));
        this.collectors = require("./utils/collectors");
        this.creatures = require("./utils/levels.json");
        
        Object.assign(this, require("./utils/misc.js"));
    };

    launch() {
        this.loadCommands();
        this.bot
            .on('messageCreate', this.handler.bind(this))
            .on('guildCreate', this.guildModify.bind(this))
            .on('guildDelete', this.guildModify.bind(this));

        this.guildModify();
    };

    guildModify() {
        const numGuilds = Array.from(this.bot.guilds.keys()).length;
        this.bot.editStatus(null, {
            name: `${numGuilds} ${numGuilds === 1 ? "server" : "servers"}! | luna.help for info. 🌙`,
            type: 3
        });
    };

    //Command Loader
    loadCommands() {
        readdirSync(join(__dirname, 'commands')).forEach(dir => {
            const commands = readdirSync(join(__dirname, 'commands', dir)).filter(file => file.endsWith('.js'));

            commands.forEach(file => {
                const pull = require(`./commands/${dir}/${file}`);

                if (pull.props.name) this.cmds.push(pull);
            });
        });
    };
};
module.exports = Luna;
