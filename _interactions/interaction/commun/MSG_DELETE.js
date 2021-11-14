module.exports = {
  exec: async function(interaction, args) {
    console.log(args)
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

