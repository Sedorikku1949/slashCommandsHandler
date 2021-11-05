module.exports = async function(interaction){
  if (interaction.isSelectMenu()) {
    // select-Menu
  } else if (interaction.isButton()) {
    // button
    return database.ButtonsManager.execute(interaction);
  } else if (interaction.isCommand()) {
    if (!interaction.inGuild()) return;
    return database.CommandsManager.execute(
      { name: interaction.commandName, id: interaction.user.id }, interaction, interaction.user, interaction.channel, interaction.guild, interaction.memberPermissions, interaction.options.data
    )
  }
}