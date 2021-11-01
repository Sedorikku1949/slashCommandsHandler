module.exports = {
  resolveOptions: (message, content, cmdOptions) => {
    console.log(content.split(/\s+/g).filter((elm, index) => console.log(index)))
    const args = content.trim().split(/\s+/g).filter((elm, index) => cmdOptions[index]);
    //console.log(args)
    const res = args.map((cnt, index) => {
      switch(cmdOptions[index].type) {
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

    return res;
  }
}