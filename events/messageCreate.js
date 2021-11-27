const client = require("../index");

// This detects when a user puts a bot command and it contains the prefix

client.on("messageCreate", async (message) => {

    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(client.config.botPrefix))
    
    return;

    const [cmd, ...args] = message.content.slice(client.config.botPrefix.length).trim().split(" ");

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
});