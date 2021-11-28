module.exports = async function() {
  console.log("ready")
  Promise.all(client.guilds.cache.map(guild => guild.commands.fetch().catch(() => false) && guild.members.fetch().catch(() => false)))
  database.SlashCommands = new (require("../_managers/_commands/SlashCommands.js"))(client, database.commands);
  client.guilds.cache.forEach(guild => database.SlashCommands.loadGuild(guild));
  database.emojis = {};
  client.guilds.cache.get("855448055149887538").emojis.cache.forEach((emj) => {
    database.emojis[emj.name.replace(/[^a-zA-Z]/g, "")] = {
      msg: emj.toString(),
      id: emj.id
    };
  })
}