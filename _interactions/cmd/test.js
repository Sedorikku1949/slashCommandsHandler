module.exports.exec = async function(author, channel, guild, memberPermission, options){
  return "hello";
}

module.exports.config = {
  name: "test",
  aliase: [],
  category: "dev",
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