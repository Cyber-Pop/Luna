module.exports.exec = async ({ Luna, message, args }) => {
    if (!args.length || isNaN(args[0]) || parseInt(args[0]) < 1 || parseInt(args[0]) > 1000) return "How many messages do you want to delete (between **1** and **1000**)?";

    message.delete();

    let msg = await message.channel.createMessage("⌛ | Deleting messages...");

    const filter = (m) => m.id !== msg.id;

    message.channel.purge(parseInt(args[0]) + 1, filter)
    .then(deleted => msg.edit(`✅ | Deleted **${deleted}** messages!`))
    .catch(err => Luna.error(err.toString(), message));
};

module.exports.props = {
    name: "purge",
    aliases: ["clear", "delete", "p"],
    cat: "utilities",
    description: "Delete messages from a channel!",
    perms: ["sendMessages", "manageMessages"],
    usage: "<amount>",
    cd: 1e+4
};