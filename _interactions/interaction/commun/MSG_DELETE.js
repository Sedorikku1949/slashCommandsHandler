module.exports = {
  exec: async function(interaction, args) {
    if (args[0].key == "id" && interaction.user.id !== args[0].value) return;
    interaction.message?.delete().catch(() => false)
  },
  config: {
    name: "MSG_DELETE",
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

