const {
  Client,
  Collection,
  Intents
} = require('discord.js');

const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ],
});

const Discord = require('discord.js');

// Call .env file to get Token
require('dotenv').config()

module.exports = client;

// Global Variables
client.discord = Discord;
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require('./config.json')

// Records commands and events
require("./handler")(client);

// Login Discord Bot Token
client.login(process.env.TOKEN);