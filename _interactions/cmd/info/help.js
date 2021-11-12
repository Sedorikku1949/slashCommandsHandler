module.exports.exec = async function(author, channel, guild, memberPermission, options){}

module.exports.config = {
  name: "help",
  aliase: ["h"],
  category: "info",
  defer: true,
  options: [],
  system: {
    requiredPermission: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermission: [],
    staff: false,
    dev: false,
    inProgress: false,
    isUserCommand: false
  },
  lang: null,
  path: null
}