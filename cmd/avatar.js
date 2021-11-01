module.exports.exec = async function(author, channel, guild, memberPermission, options){
  const user = Array.isArray(options) && typeof options[0] == "object" ? options[0].user ?? author : author
  console.log(options)
  return { embeds: [{
    description: `[ link ](${user.displayAvatarURL({ format: "png", size: 2048, dynamic: true })})`,
    image: { url: user.displayAvatarURL({ format: "png", size: 2048, dynamic: true }) }
  }] }
}

module.exports.config = {
  name: "avatar",
  aliase: ["pp"],
  category: "user",
  options: [
    { name: "user", description: "L'utilisateur dont vous voulez voir la photo de profile.", type: 6, required: false }
  ],
  system: {
    requiredPermission: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermission: [],
    staff: false,
    dev: false,
    inProgress: false,
    isUserCommand: true
  },
  lang: null,
  path: null
}