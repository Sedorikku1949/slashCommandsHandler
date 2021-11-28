module.exports.exec = async function(author, channel, guild, memberPermission, options){
  let user = await (options[0] ? (typeof options[0] !== "string" ? options[0] : guild.members.select(options[0], { fetch: true, bot: true, user: true }) ) : author);
  if (!user && options[0]) return ":x: ** ** **Je ne sais pas quel personne cherchée !**"
  if (!user) return ":x: ** ** **Une erreur est survenue !**"
  if (user["user"]) user = user["user"]
  const url = user.displayAvatarURL({format: "png", dynamic: true, size: 2048 })
  return guild.translate("commands.avatar.assets", user.tag, url, (await url.averageColor("hex") ?? guild.translate("color.secondary")) )
}

module.exports.config = {
  name: "avatar",
  aliase: ["pp"],
  category: "user",
  defer: true,
  options: [
    { name: "user", description: "L'utilisateur dont vous voulez voir la photo de profile.", type: 6, required: false }
  ],
  system: {
    requiredPermission: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermission: [],
    staff: false,
    dev: false,
    inProgress: false,
    isUserCommand: true,
    isSlashCommand: true
  },
  lang: null,
  path: null
}