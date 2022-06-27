
const fs    = require("fs");
const chalk = require("chalk");

/**
 * Load Events
 */
const loadEvents = async function (client) {
    const eventFolders = fs.readdirSync(`${client.cwd}/src/events`);
    for (const folder of eventFolders) {
        const eventFiles = fs
            .readdirSync(`${client.cwd}/src/events/${folder}`)
            .filter((file) => file.endsWith(".js"));
        
        for (const file of eventFiles) {
            const event = require(`${client.cwd}/src/events/${folder}/${file}`);
            
            if (event.name) {
                console.log(chalk.bgBlueBright.black(` ✔️ => Event ${file} is being loaded `));
            } else {
                console.log(chalk.bgRedBright.black(` ❌ => Event ${file} missing a help.name or help.name is not in string `));
                continue;
            }
            
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
}

/**
 * Load Prefix Commands
 */
const loadCommands = async function (client) {
    const commandFolders = fs.readdirSync(`${client.cwd}/src/commands/legacy/`);
    for (const folder of commandFolders) {
        const commandFiles = fs
            .readdirSync(`${client.cwd}/src/commands/legacy/${folder}`)
            .filter((file) => file.endsWith(".js"));
        
        for (const file of commandFiles) {
            const command = require(`${client.cwd}/src/commands/legacy/${folder}/${file}`);
            
            if (command.name) {
                client.commands.set(command.name, command);
                console.log(chalk.bgBlueBright.black(` ✔️ => Prefix Command ${file} is being loaded `));
            } else {
                console.log(chalk.bgRedBright.black(` ❌ => Prefix Command ${file} missing a help.name or help.name is not in string `));
                continue;
            }
            
            if (command.aliases && Array.isArray(command))
                command.aliases.forEach((alias) => client.aliases.set(alias, command.name));
        }
    }
}

/**
 * Load SlashCommands
 */
const loadSlashCommands = async function (client) {
    let slash = [];

    const commandFolders = fs.readdirSync(`${client.cwd}/src/commands/slash`);
    for (const folder of commandFolders) {
        const commandFiles = fs
            .readdirSync(`${client.cwd}/src/commands/slash/${folder}`)
            .filter((file) => file.endsWith(".js"));
        
        for (const file of commandFiles) {
            const command = require(`${client.cwd}/src/commands/slash/${folder}/${file}`);
            
            if (command.name) {
                client.slash.set(command.name, command);
                slash.push(command)
                console.log(chalk.bgBlueBright.black(` ✔️ => SlashCommand ${file} is being loaded `));
            } else {
                console.log(chalk.bgRedBright.black(` ❌ => SlashCommand ${file} missing a help.name or help.name is not in string `));
                continue;
            }
        }
    }

    client.on("ready", async() => {
        // Register Slash Commands for a single guild
        // await client.guilds.cache
        //    .get("YOUR_GUILD_ID")
        //    .commands.set(slash);

        console.log('Register Slash Commands for all the guilds.');
        await client.application.commands.set(slash)
    })
}

module.exports = {
    loadEvents,
    loadCommands,
    loadSlashCommands
}
