
const { readdirSync } = require("fs");

// Example of how to make a Help Command

module.exports = {
    name: "help",
    aliases: ["h", "commands"],
    usage: '!help <command>',
    category: "Bot",
    description: "Return all commands, or one specific command!",
    ownerOnly: false,

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param String[] args 
     */
    run: async (client, message, args) => {

        // Buttons that take you to a link
        // If you want to delete them, remove this part of
        // the code and in line: 55 delete ", components: [row]"
        const row = new client.discord.MessageActionRow().addComponents(
            new client.discord.MessageButton()
                .setLabel("GitHub")
                .setStyle("LINK")
                .setURL("http://github.com/Expectatives/Discord.js-v13-Example"),
            new client.discord.MessageButton()
                .setLabel("Support")
                .setStyle("LINK")
                .setURL("http://dsc.gg/faithcommunity"),
        );

        if (!args[0]) {

            // Get the commands of a Bot category
            const botCommandsList = [];
            readdirSync(`${client.cwd}/src/commands/legacy/Bot`).forEach((file) => {
                const filen = require(`${client.cwd}/src/commands/legacy/Bot/${file}`);
                const name = `\`${filen.name}\``;
                botCommandsList.push(name);
            });

            // Get the commands of a Utility category
            const utilityCommandsList = [];
            readdirSync(`${client.cwd}/src/commands/legacy/Utility`).forEach((file) => {
                const filen = require(`${client.cwd}/src/commands/legacy/Utility/${file}`);
                const name = `\`${filen.name}\``;
                utilityCommandsList.push(name);
            });

            // This is what it commands when using the command without arguments
            const helpEmbed = new client.discord.MessageEmbed()
                .setTitle(`${client.user.username} Help`)
                .setDescription(` Hello **<@${message.author.id}>**, I am <@${client.user.id}>.  \nYou can use \`!help <command>\` to see more info about the commands!\n**Total Commands:** ${client.commands.size}\n**Total SlashCommands:** ${client.slash.size}`)
                .addField("🤖 - Bot Commands", botCommandsList.map((data) => `${data}`).join(", "), true)
                .addField("🛠 - Utility Commands", utilityCommandsList.map((data) => `${data}`).join(", "), true)
                .setColor(client.config.embedColor)
                .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

            message.reply({ allowedMentions: { repliedUser: false }, embeds: [helpEmbed], components: [row] });
        } else {
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));

            // This is what it sends when using the command with argument and it does not find the command
            if (!command) {
                message.reply({ content: `There isn't any command named "${args[0]}"`, allowedMentions: { repliedUser: false } });
            } else {

                // This is what it sends when using the command with argument and if it finds the command
                let command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
                let name = command.name;
                let description = command.description || "No descrpition provided"
                let usage = command.usage || "No usage provided"
                let aliases = command.aliases || "No aliases provided"
                let category = command.category || "No category provided!"

                let helpCmdEmbed = new client.discord.MessageEmbed()
                    .setTitle(`${client.user.username} Help | \`${(name.toLocaleString())}\` Command`)
                    .addFields(
                        { name: "Description", value: `${description}` },
                        { name: "Usage", value: `${usage}` },
                        { name: "Aliases", value: `${aliases}` },
                        { name: 'Category', value: `${category}` })
                    .setColor(client.config.embedColor)
                    .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

                message.reply({ allowedMentions: { repliedUser: false }, embeds: [helpCmdEmbed] });
            }
        }
    },
};
