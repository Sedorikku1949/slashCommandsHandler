class SlashCommands {
  constructor(client, commands){
    if (!client?.user) throw new Error("Client must be a valid user !");
    this.client = client;
    this.commands = commands;
  };
  loadAllCommands(){
    this.client.guilds.cache.forEach(async (guild) => {
      this.commands.array().forEach((cmd) => {
        guild.commands.create({
          name: cmd.config.name.toLowerCase(),
          type: 1,
          description: "...",
          options: [...(cmd.config?.options ?? [])]
        }).catch(() => false)
      })
    });
  };
  loadGuild(guild){
    this.commands.forEach((cmd) => {
      guild.commands.create({
        name: cmd.config.name.toLowerCase(),
        type: 1,
        description: "...",
        options: [...(cmd.config?.options ?? [])]
      }).catch(() => false)
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