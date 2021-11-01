function getArgs(content, prefix) {
  return ({
    prefix: content.slice(0,prefix.length),
    command: content.slice(prefix.length).trim().split(/\s+/g)[0],
    args: [...content.slice(prefix.length).trim().split(/\s+/g).slice(1)],
  })
}

function getPrefix(guild){
  return "."
}

module.exports = async function(message){
  if (message.author.bot || message.channel.type !== "GUILD_TEXT" || message.content.length < 1) return;
  const { prefix, command, args } = getArgs(message.content.trim().toLowerCase(), getPrefix(message.guild));
  if (prefix !== getPrefix(message.guild) || !command || command.length < 1) return;
  database.CommandsManager.execute({ name: command, id: message.author, prefix: getPrefix(message.guild) }, message, message.author, message.channel, message.guild, message.member.permissions)
}