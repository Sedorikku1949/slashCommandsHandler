module.exports = {
  exec: async function(button, args) {
    console.log(args)
    button.message?.delete().catch(() => false)
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

