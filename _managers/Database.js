const Enmap = require("enmap")

class Database {
  constructor(){
    this.config = require("../_storage/_config/config.json");
    this.commands = (new (require("./_commands/Commands.js"))());
    this.cooldown = { xp: {}, command: {} };
    this.user = new Enmap({ dataDir: "_storage/_database/users", name: "users" });
    this.system = new Enmap({ dataDir: "_storage/_database/_system", name: "system" });
    this.guilds = new Enmap({ dataDir: "_storage/_database/guilds", name: "guilds" });
    this.Buttons = new (require("./_interactions/Buttons.js"))();
  }
};

module.exports = Database;