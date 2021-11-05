const Discord = require("discord.js")
const { parse } = require("querystring");

/**
 * This function give you a Array with a link arguments
 * Be sure to give only arguments !
 * 
 * @param {String} str 
 * @returns {Array}
 */
 function fetchArguments(str){ return Object.entries(parse(str)).map(elm => ({ key: elm[0], value: elm[1] }) ) }

class ButtonManager {
  constructor(){
    database.ButtonsManager = this;
    this.client = client;
    this.database = database;
  }

  async execute(interaction) {
    if (!(interaction instanceof Discord.ButtonInteraction)) throw new Error("The interaction is not a ButtonInteraction");
    const btn = this.database.Buttons.find(b => interaction.customId.match(new RegExp(`${b.config.name}(?:&[^\s]+)?`, "gm")));
    if (!btn) return;
    try {
      if (btn.config.defer) interaction.deferReply({ ephemeral: true })
      const res = await btn.exec(interaction, fetchArguments(interaction.customId.slice(btn.config.name.length+1), ));
      if (["string", "object"].some(t => typeof res == t) && !Array.isArray(res)) interaction.editReply(res).catch(() => false)
    } catch(err) {
      if (btn.config.defer) interaction.editReply(`:x: **An error as occured !**\n\`\`\`js\n${err.message.slice(0,1500)}\`\`\``).catch(() => false)
      else  interaction.reply(`:x: **An error as occured !**\n\`\`\`js\n${err.message.slice(0,1500)}\`\`\``).catch(() => false)
    }
  }
}

module.exports = ButtonManager;