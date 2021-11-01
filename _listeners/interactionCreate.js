module.exports = async function(interaction){
  if (interaction.isSelectMenu()) {
    // select-Menu
  } else if (interaction.isButton()) {
    // button
  } else if (interaction.isCommand()) {
    if (!interaction.inGuild()) return;
    return database.CommandsManager.execute(
      { name: interaction.commandName, id: interaction.user.id }, interaction, interaction.user, interaction.channel, interaction.guild, interaction.memberPermissions, interaction.options.data
    )
    const command = database.commands.array().find(cmd => cmd.config.name == interaction.commandName || cmd.config.aliases?.includes(interaction.commandName));
    // commands
    if (!command) return;
    if (database.cooldown.command[interaction.user.id] > Date.now()) return
    else database.cooldown.command[interaction.user.id] = Date.now() + 1000

    const res = await command.exec(interaction.user, interaction.channel, interaction.guild, interaction.memberPermissions, interaction.options.data);
    if (res && ((typeof res == "object" && !Array.isArray(res)) || typeof res == "string")) return interaction.reply(res);
  }
}