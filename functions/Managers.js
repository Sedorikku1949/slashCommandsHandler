module.exports = {
  resolveOptions: (message, content, cmdOptions) => {
    if (!cmdOptions[0].full) {
      console.log("not full")
      const args = content.trim().split(/\s+/g).filter((elm, index) => cmdOptions[index]);
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

      return res
    } else {
      return [{
        name: cmdOptions[0]?.name,
        type: cmdOptions[0]?.name,
        value: content.trim(),
        options: [],
      }]
    }
  }
}