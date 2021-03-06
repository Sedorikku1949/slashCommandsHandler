const Discord = require("discord.js")
const { resolveOptions, getArgs } = require("../../functions/Managers.js");

class CommandsHandler {
  constructor(){
    database.CommandsManager = this;
    this.client = client;
    this.database = database;
  }

  async execute(actionDetail, type, ...args){
    if (!['782164174821523467', "550041732893376542", "747001095842430987"].includes(args[0].id) && this.client.user.id == "806438484159102996") return;
    // args check
    if (typeof actionDetail !== "object" || Array.isArray(actionDetail) || [Discord.CommandInteraction, Discord.Message].every((cls) => !(type instanceof cls) ) || !args || args.length < 1)
      throw new Error("Invalid values has been provided !")

    // command finder
    const command = this.database.commands.array().find(cmd => cmd.config.name == actionDetail.name || cmd.config.aliase?.includes(actionDetail.name))
    if (!command) return
    // cooldown
    if (database.cooldown.command[actionDetail.id] > Date.now()) return
    else database.cooldown.command[actionDetail.id] = Date.now() + 1000

    // execute
    try {
      if (command.config.defer && (type instanceof Discord.CommandInteraction)) await type.deferReply({ ephemeral: command.config.ephemeral ?? false})
      if (type instanceof Discord.Message) type.channel.sendTyping();
      const res = await command.exec(...args, getArgs(type, client.prefix.length))
      if (["string", "object"].some(t => typeof res == t) && !Array.isArray(res)) {  
        if (command.config.defer && (type instanceof Discord.CommandInteraction)) type.editReply(res)
        else type.reply(res)
      }
    } catch(err) {
      console.log(err);
      if (command.config.defer && (type instanceof Discord.CommandInteraction)) type.editReply(`:x: **An error as occured !**\n\`\`\`js\n${err.message.slice(0,1500)}\`\`\``).catch(() => false)
      else type.reply(`:x: **An error as occured !**\n\`\`\`js\n${err.message.slice(0,1500)}\`\`\``).catch(() => false)
    }
  }
}

module.exports = CommandsHandler;