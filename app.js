const { Client, Intents } = require("discord.js")
const { readdirSync } = require("fs");

global["client"] = new Client({
  intents: Object.keys(Intents.FLAGS),
  partials: ["CHANNEL"],
  fetchAllMembers: true,
  allowedMentions: { repliedUser: false },
  retryLimit: 5,
  invalidRequestWarningInterval: 10
});

// EVENTS
readdirSync("_listeners").forEach((dir) => {
  try { client.on(dir.replace(/\.js/g, ""), require(`./_listeners/${dir}`)) }
    catch(err) { console.log(err) }
})

global["database"] = new (require("./_managers/Database.js"))()

// MANAGERS && PROTOTYPE
require("./_managers/Prototype.js")
new (require("./_managers/_commands/CommandsManager.js"))()
new (require("./_managers/_interactions/ButtonsManager.js"))()

// LOGIN
client.login(require("./_storage/config.json").token)

module.exports = client;