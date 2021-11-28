function tr(nb) {
  if (nb < 150) return 1
  else if (nb < 300) return 2
  else if (nb < 450) return 3
  else 4
}

module.exports.exec = async function(author, channel, guild, memberPermission, options){
  return guild.translate("commands.ping.assets", client.ws.ping, guild.translate(`commands.ping.misc[${tr(client.ws.ping)}]`));
}

module.exports.config = {
  name: "ping",
  aliase: [],
  category: "info",
  defer: true,
  options: [],
  system: {
    requiredPermission: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermission: [],
    staff: false,
    dev: false,
    inProgress: false,
    isUserCommand: false,
    isSlashCommand: true
  },
  lang: null,
  path: null
}