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
    database.ButtonInteraction = this;
    this.client = client;
    this.database = database;
  }

  async execute(interaction) {
    if (!(interaction instanceof Discord.ButtonInteraction)) throw new Error("Invalid interaction has been provided !");
  }
}

module.exports = ButtonManager;