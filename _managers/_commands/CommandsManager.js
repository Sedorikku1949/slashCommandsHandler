const Discord = require("discord.js")
const { resolveOptions } = require("../../functions/Managers.js");

class CommandsHandler {
  constructor(){
    database.CommandsManager = this;
    this.client = client;
    this.database = database;
  }

  async execute(actionDetail, type, ...args){
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
      const res = await command.exec(...args, ((type instanceof Discord.Message) ?
        resolveOptions(type, type.content.trim().slice(actionDetail.name.length + actionDetail.prefix.length).trim(), command.config.options)
        : type.options.data));
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