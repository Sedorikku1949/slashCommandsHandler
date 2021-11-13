const { readdirSync } = require("fs")
const { color } = require("../../functions/Utils.js")

class Commands extends Map {
  constructor(path = "_interactions/interaction"){
    super()
    // folder scan
    const that = this;
    function getAllButtons(dir){
      readdirSync(dir).forEach((subdir) => {
        if (!subdir.match(/\./)) getAllCommands(`${dir}/${subdir}`)
        else if (subdir.endsWith(".js") && !subdir.startsWith(".")) {
          const cmd = require(`../../${dir}/${subdir}`)
          if (!cmd || typeof cmd?.exec !== "function") return;
          cmd.exec.bind(cmd);
          that.set(cmd.config.name, cmd)
        } else console.log(color(`{yellow}{ WARNING } >> The file ${subdir} as been ignored.`))
      })
    };
    getAllButtons(path);
    console.log(color(`{cyan}{ BUTTONS } >> ${this.size} interactions has been loaded !`))
  };

  array(){
    let res = [];
    this.forEach((that) => res.push(that));
    return res;
  };
  
  find(callback){  return this.array().find(callback) };
}

module.exports = Commands;