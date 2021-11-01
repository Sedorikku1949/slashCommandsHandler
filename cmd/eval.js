const { inspect } = require("util")

function security(res){
  if (typeof res !== "string") return inspect(res, true, 0).slice(0,1970)
  return res.replace(new RegExp("token", "g"), "")
}

module.exports.exec = async function(author, channel, guild, memberPermission, options){
  console.log("a")
  if (!database.config.dev.evalAccess) return { content: "<:close:884084000744939571> ** ** **Cette commande est réservée aux développeurs !", ephemeral: true }
  if (!options || !options[0] || !options[0].value) return;
  try {
    const res = await eval(options[0].value);
    const str = inspect(res, true, 0);
    console.log(str)
    return { content: "**`SUCCESS`**\n```js\n"+((str.length > 1970 ? security(str).slice(0,1970) : security(res).slice(0,1970)) ?? "\u200b")+"\n```" }
  } catch(err) {
    return { content: "**`ERROR`**\n```js\n"+(String(err).split("\n")[0] ?? "\u200b")+"\n```" }
  }
}

module.exports.config = {
  name: "eval",
  aliase: ["e"],
  category: "user",
  options: [
    { name: "code", description: "Le code a executer.", type: 3, required: true }
  ],
  system: {
    requiredPermission: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermission: [],
    staff: false,
    dev: true,
    inProgress: false,
    isUserCommand: false
  },
  lang: null,
  path: null
}