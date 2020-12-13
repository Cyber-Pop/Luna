const EventEmitter = require("events").EventEmitter;
const collectors = [];

class MessageCollector extends EventEmitter {
	constructor(channel, filter, options = {}) {
        super();
        
		this.filter = filter;
		this.channel = channel;
		this.options = options;
		this.ended = false;
		this.collected = [];

		collectors.push(this);
		if (options.time) setTimeout(() => this.stop("time"), options.time);
	};

	verify(message) {
		if (this.channel.id !== message.channel.id) return false;
		if (this.filter(message)) {
			this.collected.push(message);

			this.emit("message", message);
			if (this.collected.length >= this.options.maxMatches) this.stop("maxMatches");
			return true;
		};

		return false;
	};

	stop(reason) {
		if (this.ended) return;
		this.ended = true;

		collectors.splice(collectors.indexOf(this), 1);
		this.emit("end", this.collected, reason);
	};
};

class ReactionHandler extends EventEmitter {
    constructor(message, filter, options = {}) {
        super();

        this.client = (message.channel.guild) ? message.channel.guild.shard.client : message.channel.client;
        this.filter = filter;
        this.message = message;
        this.options = options;
        this.ended = false;
        this.collected = [];
        this.listener = (msg, emoji, userID) => this.verify(msg, emoji, userID);

        this.client.on('messageReactionAdd', this.listener);

        if (options.time) setTimeout(() => this.stop('time'), options.time);
    }

    verify(msg, emoji, userID) {
        if (this.message.id !== msg.id) return false;

        if (this.filter(userID, emoji)) {
            this.collected.push({ msg, emoji, userID });
            this.emit('reacted', { msg, emoji, userID });

            if (this.collected.length >= this.options.maxMatches) {
                this.stop('maxMatches');
                return true;
            };
        };

        return false;
    };

    stop(reason) {
        if (this.ended) return;

        this.ended = true;

        this.client.removeListener('messageReactionAdd', this.listener);
        
        this.emit('end', this.collected, reason);
    };
};

let listening = false;
module.exports = {
	awaitMessages: (channel, filter, options) => {
		if (!listening) {
			channel.client.on("messageCreate", message => {
				for (const collector of collectors) {
                    collector.verify(message);
                };
			});

			listening = true;
		};

		const collector = new MessageCollector(channel, filter, options);
		return new Promise(resolve => collector.on("end", resolve));
    },
    
    awaitReactions: (message, filter, options) => {
        const bulkCollector = new ReactionHandler(message, filter, options);

        return new Promise((resolve) => {
            bulkCollector.on('end', resolve);
        });
    }
};