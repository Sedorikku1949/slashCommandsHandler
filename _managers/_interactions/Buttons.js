const { readdirSync } = require("fs")
const { color } = require("../../functions/Utils.js")

class Commands extends Map {
  constructor(path = "_interactions/buttons"){
    super()
    // folder scan
    function getAllButtons(dir, that){
      readdirSync(dir).forEach((subdir) => {
        if (!subdir.match(/\./)) getAllCommands(`${dir}/${subdir}`)
        else if (subdir.endsWith(".js") && !subdir.startsWith(".")) {
          const cmd = require(`../../${dir}/${subdir}`)
          that.set(cmd.config.name, cmd)
        } else console.log(color(`{yellow}{ WARNING } >> The file ${subdir} as been ignored.`))
      })
    };
    getAllButtons(path, this);
    console.log(color(`{cyan}{ BUTTONS } >> ${this.size} buttons has been loaded !`))
  };

  array(){
    let res = [];
    this.forEach((that) => res.push(that));
    return res;
  };
  
  find(callback){  return this.array().find(callback) };
}

module.exports = Commands;