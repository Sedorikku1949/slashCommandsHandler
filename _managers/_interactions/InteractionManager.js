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

 function getType(int){
   if (int.isButton()) return "BUTTON";
   else if (int.isSelectMenu()) return "SELECT_MENU";
   else if (int.isContextMenu()) return "CONTEXT_MENU";
   else return "UNKNOWN";
 }

class InteractionManager {
  constructor(){
    database.InteractionManager = this;
    this.client = client;
    this.database = database;
  }

  async execute(interaction) {
    if (!(interaction instanceof Discord.Interaction)) throw new Error("The interaction is not a ButtonInteraction");
    const int = this.database.Interactions.find(b => interaction.customId.match(new RegExp(`${b.config.name}(?:&[^\s]+)?`, "gm")) && getType(interaction) == b.config.type);
    if (!int) return;
    try {
      if (int.config.defer) interaction.deferReply({ ephemeral: true })
      const res = await int.exec(interaction, fetchArguments(interaction.customId.slice(int.config.name.length+1), ));
      if (["string", "object"].some(t => typeof res == t) && !Array.isArray(res)) interaction.editReply(res).catch(() => false)
    } catch(err) {
      if (int.config.defer) interaction.editReply(`:x: **An error as occured !**\n\`\`\`js\n${err.message.slice(0,1500)}\`\`\``).catch(() => false)
      else  interaction.reply(`:x: **An error as occured !**\n\`\`\`js\n${err.message.slice(0,1500)}\`\`\``).catch(() => false)
    }
  }
}

module.exports = InteractionManager;