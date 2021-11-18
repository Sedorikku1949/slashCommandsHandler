const Discord = require('discord.js');

module.exports = {
  resolveOptions: (message, content, cmdOptions) => {
    if (!cmdOptions[0]?.full) {
      console.log("not full")
      const args = content.trim().split(/\s+/g).filter((elm, index) => cmdOptions[index]);
      const res = args.map((cnt, index) => {
        switch(cmdOptions[index].type) {
          case 1: {
            break;
          }
          case 2: {
            break;
          }
          case 6: {
            return ({
              name: cmdOptions[index]?.name,
              type: cmdOptions[index]?.type,
              value: (["string", "number", "boolean"].includes(typeof cnt) ? cnt : null),
              options: [],
              user: message.guild.members.select(cnt, { fetch: true, bot: true })
            })
          };
          case 7: {
            return ({
              name: cmdOptions[index]?.name,
              type: cmdOptions[index]?.type,
              value: (["string", "number", "boolean"].includes(typeof cnt) ? cnt : null),
              options: [],
              role: message.guild.channels.select(cnt, { type: "ANY", fetch: true })
            })
          };
          case 8: {
            return ({
              name: cmdOptions[index]?.name,
              type: cmdOptions[index]?.type,
              value: (["string", "number", "boolean"].includes(typeof cnt) ? cnt : null),
              options: [],
              role: message.guild.roles.select(cnt)
            })
          };
          case 9: {
            return ({
              name: cmdOptions[index]?.name,
              type: cmdOptions[index]?.type,
              value: (["string", "number", "boolean"].includes(typeof cnt) ? cnt : null),
              options: [],
              mentionnable: {
                user: message.guild.members.select(cnt, { fetch: true, bot: true }),
                channel: message.guild.channels.select(cnt, { type: "ANY", fetch: true }),
                role: message.guild.roles.select(cnt)
              }
            })
          };
          case 10: {
            return ({
              name: cmdOptions[index]?.name,
              type: cmdOptions[index]?.type,
              value: (["string", "number", "boolean"].includes(typeof cnt) ? cnt : null),
              options: [],
            })
          };
          default: {
            return ({
              name: cmdOptions[index]?.name,
              type: cmdOptions[index]?.type,
              value: (["string", "number", "boolean"].includes(typeof cnt) ? cnt : null),
              options: [],
            })
          }
        }
      })

      return res
    } else {
      return [{
        name: cmdOptions[0]?.name,
        type: cmdOptions[0]?.name,
        value: content.trim(),
        options: [],
      }]
    }
  },
  getArgs: function getArgs(object, prefix){
    const type = { SUB_COMMAND: 1, SUB_COMMAND_GROUP: 2, STRING: 3, INTEGER: 4, BOOLEAN: 5, USER: 6, CHANNEL: 7, ROLE: 8, MENTIONNANLE: 9, NUMBER: 10 };
    const methods = {
      join: function(j){ return this.map(t=>t.value).join(j[0]) },
      getName: function(n, all = false){ return all ? this.filter(t => t.name ===n ) : this.find( t=> t.name === n ) },
      getType: function(n, all = false){ return all ? this.filter(t => t.type ===n ) : this.find( t=> t.type === n ) },
      toSource: function(){ return this }
    }
    const handler = {
      get:function(target, name){
        if (Object.keys(methods).includes(name)) return (...args)=> { return methods[name].bind(target,args)() };
        if (!isNaN(name)) return target[name]?.value;
        if (name === "length") return target.length;
        if (name === "cmd") return object?.content?.slice(prefix)?.trim()?.split(/ +/)?.shift();
      }
    }
    let data
    if(object?.options?.data?.find(t=>t?.type=="SUB_COMMAND")){
      const sub = object.options.data.find((t) => t.type == "SUB_COMMAND")
      data = sub.options ?? []
    } else data = object?.options?.data
    const arguments = object instanceof Discord.Message ? (object.content.slice(prefix).trim().split(/ +/).slice(1).map((t) => ({ value:t, name:undefined, type:undefined }) )) : object instanceof Discord.CommandInteraction? (data.map(t=>{ t.type = type[t.type] ?? t.type; return t })):undefined
    return arguments === undefined ? []:new Proxy(arguments, handler)
  }
}