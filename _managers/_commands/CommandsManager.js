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
    if (!command) return console.log("no command");
    /*// cooldown
    if (database.cooldown.command[actionDetail.id] > Date.now()) return
    else database.cooldown.command[actionDetail.id] = Date.now() + 1000*/

    /*console.log(
      
    )*/
    // execute
    try {
      const res = await command.exec(...args, ((type instanceof Discord.Message) ?
      resolveOptions(type, type.content.trim().slice(actionDetail.name.length + actionDetail.prefix.length).trim(), command.config.options)
    : type.options.data));
      if (["string", "object"].some(t => typeof res == t) && !Array.isArray(res)) type.reply(res).catch(() => false)
    } catch(err) {
      console.log(err)
    }
  }
}

module.exports = CommandsHandler;