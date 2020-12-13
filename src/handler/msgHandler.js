exports.handler = async function (message) {
    if (!message.guildID || message.author.bot) return;

    const myPerms = message.channel.permissionsOf(this.bot.user.id)

    const guild = await this.db.fetchGuild(message.guildID);
    const prefix = guild.prefix;
    if (["hello", "hi"].includes(message.content.toLowerCase()) && myPerms.has("sendMessages")) return message.channel.createMessage(`Hi ${message.author.username}! The bot prefix is \`${prefix}\`.`);
    
    if (!message.content.startsWith(prefix)) return;

    let args = message.content.slice(prefix.length).toLowerCase().split(" ").filter(a => a !== "");
    let command = args.shift();

    command = this.cmds.find(cmd => cmd.props.name === command || (cmd.props.aliases && cmd.props.aliases.includes(command)));
    if (!command) return;

    const permissions = message.channel.permissionsOf(message.author.id);
    if (command.props.perms && command.props.perms.includes("dev") && !this.isDev(message.author.id)) return;

    if (command.props.perms && command.props.perms.filter(perm => perm !== "dev").some(perm => !myPerms.has(perm))) {
        const needPerms = command.props.perms.filter(perm => !myPerms.has(perm)).sort();
        if (myPerms.has("sendMessages")) {
            if (myPerms.has("embedLinks")) return message.channel.createMessage({ embed: {
                title: "🔑 | Insufficient Permissions",
                description: `I need to have ${needPerms.map(perm => `\`${this.parseUpperCase(perm)}\``).join(", ")} to use this command!`,
                color: this.color()
            }});
            return message.channel.createMessage(`I need to have ${needPerms.map(perm => `\`${this.parseUpperCase(perm)}\``).join(", ")} to use this command!`);
        };
    };

    if (command.props.perms && command.props.perms.some(perm => !permissions.has(perm)) && !this.isDev(message.author.id)) {
        const userPerms = command.props.perms.filter(perm => !permissions.has(perm)).sort();
        if (myPerms.has("sendMessages")) {
            if (myPerms.has("embedLinks")) return message.channel.createMessage({ embed: {
                title: "🔑 | Insufficient Permissions",
                description: `You need to have ${userPerms.map(perm => `\`${this.parseUpperCase(perm)}\``).join(", ")} to use this command!`,
                color: this.color()
            }});
            return message.channel.createMessage(`You need to have ${userPerms.map(perm => `\`${this.parseUpperCase(perm)}\``).join(", ")} to use this command!`);
        };
    };

    if (command.props.cd && !this.isDev(message.author.id)) {
        const cd = await this.db.fetchCD(message.author.id, command.props.name);
        if (cd && command.props.cd - (Date.now() - cd.created) > 0) {
            if (myPerms.has("sendMessages")) {
                if (myPerms.has("embedLinks")) return message.channel.createMessage({ embed: {
                    title: "⏳ | Cooldown",
                    description: `Hold your dolphins! You've already used that command! Please wait ${this.joinTime(command.props.cd - (Date.now() - cd.created))} before using this command again!`,
                    color: this.color()
                }});
                return message.channel.createMessage(`Hold up! You've already used that command! Please wait ${this.joinTime(command.props.cd - (Date.now() - cd.created))} before using this command again!`);
            } else return;
        }
        else this.db.addCD(message.author.id, command.props.name, Date.now());
    };

    try {
        if (Math.random() < 0.1 || this.isDev(message.author.id)) {
            this.db.addWater(message.author.id, Math.floor(Math.random() * 5) + 5 * (message.author.id === this.config.devs ? 1000 : 1));
        };

        if (Math.random() < 0.1 && !this.isDev(message.author.id)) {
            const res = await this.db.addEnergy(message.author.id, Math.floor(Math.random() * -4) - 1);
            if (res) message.channel.createMessage(res);
        };
    } catch (error) {};

    try {
        let res = await command.exec({
            Luna: this,
            message: message,
            args: command.props.original ? message.content.slice(prefix.length).split(" ").filter(a => a !== "").slice(1) : args
        });
        if (!res) return;

        if (res instanceof Object) {
            if (!res.color && !res.file && !res.content) res = Object.assign({ color: this.color() }, res);
            res = {
                content: res.content,
                file: res.file,
                embed: res
            };
        } else if (res.length > 2000) return message.channel.createMessage("Oops! I can't send a reply over **2000** characters long... Try shortening your message!");
        
        message.channel.createMessage(res, res.file);
    } catch (error) {
        if (myPerms.has("sendMessages")) {
            if (myPerms.has("embedLinks")) return this.error(error.toString(), message);
            message.channel.createMessage(error.toString());
        };
    };
    
};