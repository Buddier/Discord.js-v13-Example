const client = require("../index");

// This detects when a user puts a bot slashcommand

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const command = client.slashCommands.get(interaction.commandName);
        if (!command) return interaction.followUp({ content: 'an Erorr' });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name);
                option.options?.forEach(x =>  {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        try {

            command.run(client, interaction, args)

        } catch (e) {

            interaction.followUp({ content: e.message });


        }
  }
});