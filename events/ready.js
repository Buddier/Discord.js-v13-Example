const client = require("../index");

// This does the bot when it is ready

client.once("ready", () => {
  // Puts an activity
  client.user.setActivity("Expectatives#1157", {
    type: "WATCHING",
    name: "Expectatives#1157"
  });

  // Send a message on the console
  console.log(`[LOG] ${client.user.tag} is now online!\n[LOG] Bot serving on Ready to serve in ${client.guilds.cache.size} servers\n[LOG] Bot serving ${client.users.cache.size} users`)
});