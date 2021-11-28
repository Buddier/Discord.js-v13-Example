const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const globPromise = promisify(glob);

// This logs commands and events

module.exports = async (client) => {
    // Load Commands
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });

    // Load Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Load SlashCommands
    const slashCommands = await globPromise(
        `${process.cwd()}/slashcommands/**/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file.name) return;
        client.slashCommands.set(file.name, file);
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        // Register Slash Commands for a single guild
        // await client.guilds.cache
        //    .get("YOUR_GUILD_ID")
        //    .commands.set(arrayOfSlashCommands);

        // Register Slash Commands for all the guilds
         await client.application.commands.set(arrayOfSlashCommands);
    });
};
