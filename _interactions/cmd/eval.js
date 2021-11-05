const { Message } = require("discord.js")
const { inspect } = require("util")

function security(res){
  if (typeof res !== "string") return inspect(res, true, 0).slice(0,1970)
  return res.replace(new RegExp("token", "g"), "")
}

module.exports.exec = async function(author, channel, guild, memberPermission, options){
  if (!database.config.dev.evalAccess) return { content: "<:close:884084000744939571> ** ** **Cette commande est réservée aux développeurs !", ephemeral: true }
  if (!options || !options[0] || !options[0].value) return;
  try {
    const res = await eval(options.map(e => e.value).join(" "));
    const str = inspect(res, true, 0);
    return { content: "**`SUCCESS`**\n```js\n"+((str.length > 1970 ? security(str).slice(0,1970) : security(res).slice(0,1970)) ?? "\u200b")+"\n```", components: [{ components: [{ disabled: false, emoji: "885157955270488084", label: "", style: 2, type: 2, custom_id: "MSG_DELETE&id="+author.id }], type: 1 }] }
  } catch(err) {
    return { content: "**`ERROR`**\n```js\n"+(String(err).split("\n")[0] ?? "\u200b")+"\n```", components: [{ components: [{ disabled: false, emoji: "885157955270488084", label: "", style: 2, type: 2, custom_id: "MSG_DELETE&id="+author.id }], type: 1 }] }
  }
}

module.exports.config = {
  name: "eval",
  aliase: ["e"],
  category: "user",
  defer: true,
  options: [
    { name: "code", description: "Le code a executer.", type: 3, required: true, full: true }
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