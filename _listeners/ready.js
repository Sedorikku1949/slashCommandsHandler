module.exports = async function() {
  console.log("ready")
  Promise.all(client.guilds.cache.map(guild => guild.commands.fetch().catch(() => false) && guild.members.fetch().catch(() => false)))
  database.SlashCommands = new (require("../_managers/_commands/SlashCommands.js"))(client, database.commands);
  database.SlashCommands.loadAllCommands();
}