const Help = require("../../../functions/Help.js")

module.exports = {
  exec: async function(interaction, args) {
    const allCtg = Help.getAllCategory(database.commands.array());
    const newCategory = interaction.values[0];
    console.log(newCategory);
    if (typeof newCategory !== "string" || !allCtg.includes(newCategory)) return interaction.reply({ content: ":x: **Une erreur est survenue !**\n```js\nError : newCategory can be only a string\n >> exit command code 1```", ephemeral: true });
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
    name: "HELP_CTG_MENU",
    defer: false,
    permissions: {
      user: 'NONE',
      bot: 'NONE'
    },
    args: [],
    type: "SELECT_MENU",
    description: 'Deletes the message that triggered the button.',
    hidden: true
  }
}