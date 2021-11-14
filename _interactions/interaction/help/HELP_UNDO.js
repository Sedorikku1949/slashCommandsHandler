const Help = require("../../../functions/Help.js")

module.exports = {
  exec: async function(interaction, args) {
    console.log(args[0].value)
    const allCtg = Help.getAllCategory(database.commands.array());
    console.log(allCtg.length+(allCtg.findIndex(e => e === args[0].value)-1))
    const newCategory = allCtg[(allCtg.length+(allCtg.findIndex(e => e === args[0].value)-1))%allCtg.length];
    console.log(newCategory);
    if (newCategory < 0) return interaction.reply({ content: ":x: **Une erreur est survenue !**\n```js\nError : newCategory can be only a string\n >> exit command code 1```", ephemeral: true });
    interaction.update({
      embeds: [{
        color: "#5865F2",
        title: "Help",
        title: Help.generateCategoryStringList(Help.getAllCategory(database.commands.array()), newCategory),
        description: Help.generateCommandStringList(Help.getCategoryCommands(database.commands.array(), newCategory)),
        author: { name: "Liste des commandes", icon_url: client.user.displayAvatarURL({ size: 512, format: "png" }) },
        thumbnail: { url: client.user.displayAvatarURL({ size: 2048, format: "png" }) },
      }],
      components: [
        { components: [ { type: 'SELECT_MENU', customId: `HELP_CTG_MENU&ctg=${newCategory}`, placeholder: 'Quel catégorie souhaite-tu voir ?', options: [...Help.getAllCategory(database.commands.array()).map((c) => ({ label: c, customId: `HELP_CTG_SELECT&ctg=${c}`, value: c, default: false }) )] } ], type: 'ACTION_ROW' },
        {
          // BUTTONS 
          components: [
            { disabled: false, emoji: "885157955241115698", label: "", style: 2, type: 2, custom_id: `HELP_UNDO&ctg=${newCategory}&user=${interaction.member.id}` },
            { disabled: false, emoji: "885157955459235870", label: "", style: 2, type: 2, custom_id: `HELP_REDO&ctg=${newCategory}&user=${interaction.member.id}` },
            { disabled: false, emoji: "885157955182428220", label: "", style: 2, type: 2, custom_id: `HELP_SEARCH&ctg=${newCategory}&user=${interaction.member.id}` },
            { disabled: false, emoji: "885157955270488084", label: "", style: 2, type: 2, custom_id: `MSG_DELETE&ctg=${newCategory}&user=${interaction.member.id}` },
          ],
          type: 1
        }
      ]
    })
  },
  config: {
    name: "HELP_UNDO",
    defer: false,
    permissions: {
      user: 'NONE',
      bot: 'NONE'
    },
    args: [],
    type: "BUTTON",
    description: 'Deletes the message that triggered the button.',
    hidden: true
  }
}