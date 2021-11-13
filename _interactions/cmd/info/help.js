const Help = require("../../../functions/Help.js")

module.exports.exec = async function(author, channel, guild, memberPermission, options){
  const cmd = database.commands.array().find(cmd => cmd.config.name == options[0]?.value || cmd.config.aliase?.includes(options[0]?.value))
  if (options[0]?.value) return help.sendSpecificCommandHelp(cmd, guild);
  const actualCtg = Help.getAllCategory(database.commands.array())[0];
  return ({
    embeds: [{
      color: "#5865F2",
      author: { name: "Liste des commandes", icon_url: client.user.displayAvatarURL({ size: 512, format: "png" }) },
      title: Help.generateCategoryStringList(Help.getAllCategory(database.commands.array()), actualCtg),
      description: Help.generateCommandStringList(Help.getCategoryCommands(database.commands.array(), actualCtg)),
      thumbnail: { url: client.user.displayAvatarURL({ size: 2048, format: "png" }) },
    }],
    components: [
      {
        // BUTTONS
        components: [
          { disabled: false, emoji: "885157955270488084", label: "", style: 2, type: 2, custom_id: `HELP_REDO&ctg=${actualCtg}` }
        ],
        type: 1
      }
    ]
  })
}

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
    inProgress: false,-
    isUserCommand: false
  },
  lang: null,
  path: null
}