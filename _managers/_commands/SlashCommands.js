const Discord = require("discord.js");

class SlashCommands {
  constructor(client, commands){
    if (!client?.user) throw new Error("Client must be a valid user !");
    this.client = client;
    this.commands = commands;
  };
  loadAllCommands(){
    this.client.guilds.cache.forEach(async (guild) => {
      await guild.commands.set([]).catch(() => false);
      this.commands.array().forEach((cmd) => {
        console.log(cmd.config.name)
        if (!cmd?.config?.system?.isSlashCommand) return;
        guild.commands.create({
          name: cmd.config.name.toLowerCase(),
          type: 1,
          description: "...",
          options: [...(cmd.config?.options ?? [])]
        }).catch(() => false)
      })
    });
  };
  async loadGuild(guild){
    if (!(guild instanceof Discord.Guild)) return null;
    await guild.commands.fetch().catch(() => false);
    database.commands.forEach(async (cmd) => {
      if (!cmd?.config?.system?.isSlashCommand) return;
      if (guild.commands?.cache?.find(e => e.name == cmd.config.name)) {
        await guild.commands.cache.find(e => e.name == cmd.config.name).delete().catch(() => false);
        await guild.commands.create({
          name: cmd.config.name.toLowerCase(),
          type: 1,
          description: guild.translate(`commands.${cmd.config.name}.desc`) || "Aucune description.",
          options: [...(cmd.config?.options ?? [])]
        }).catch(() => false)
      } else {
        await guild.commands.create({
          name: cmd.config.name.toLowerCase(),
          type: 1,
          description: guild.translate(`commands.${cmd.config.name}.desc`) || "Aucune description.",
          options: [...(cmd.config?.options ?? [])]
        }).catch(() => false)
      }
    })
  };
}

module.exports = SlashCommands;

/*

[
  {
    name: 'user',
    description: 'The user that you want to see the avatar.',
    type: 6,
    required: false
  }
]

*/

/**
 * await guild.commands.set([]).catch(() => false);;
    this.commands.forEach((cmd) => {
      console.log(cmd.config.name)
      if (!cmd?.config?.system?.isSlashCommand) return;
      guild.commands.create({
        name: cmd.config.name.toLowerCase(),
        type: 1,
        description: "...",
        options: [...(cmd.config?.options ?? [])]
      }).catch(() => false)
    })
 */