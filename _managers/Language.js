const { readdirSync } = require('fs');
const { getGoodPath } = require('../functions/Utils');

class Language extends Map {
  constructor(){
    super();
    const that = this;
    function getFiles(path){
      readdirSync(path).forEach(file => {
        if (file.endsWith('.json')){
          that.set(file.replace('.json', ''), require(`../${path}/${file}`));
        } else if (!file.match(/\./g)) getFiles(`${path}/${file}`);
      })
    };
    getFiles("_storage/_langs");
  }

  find(file, key){
    if (typeof file !== "string" || !this.get(file)) return null;
    const data = this.get(file);
    try {
      if (!key) return data;
      getGoodPath(key).forEach((p) => data[path]);
      return data;
    } catch(err) { return null; }
  };
}

module.exports = new Language();