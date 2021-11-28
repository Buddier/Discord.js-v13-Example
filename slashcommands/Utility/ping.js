// Example of how to make a SlashCommand

module.exports = {
  name: "ping",
  category: "Utility",
  description: "Check the bot's ping!",
  run: async (client, interaction) => {
    const msg = await interaction.channel.send(`🏓 Pinging...`);

    const pingEmbed = new client.discord.MessageEmbed()
      .setTitle(':signal_strength: Bot Ping')
      .addField("Time", `${Math.floor(msg.createdAt - interaction.createdAt)}ms`, true)
      .addField("API Ping", `${client.ws.ping}ms`, true)
      .setColor(client.config.embedColor)
      .setFooter(client.config.embedfooterText, client.user.avatarURL());

    await interaction.followUp({embeds: [pingEmbed]});

    msg.delete();
  },
};
