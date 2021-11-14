module.exports = {
  getAllCategory: function getAllCategory(arr){
    let ctg = [];
    arr.forEach(function(item){
      if (!ctg.includes(item.config.category)) ctg.push(item.config.category);
    });
    return ctg;
  },
  sortCommand: function sortCommand(commands, ctg){
    if (!Array.isArray(commands) || !Array.isArray(ctg)) throw new Error("Invalid arrays was provided, cannot sort commands with categories provided");
    let obj = {};
    ctg.forEach((c) => obj[c] = []);
    commands.forEach((cmd) => {
      if (!obj[cmd.config.category]) obj[cmd.config.category] = [];
      obj[cmd.config.category].push(cmd);
    });
    return obj;
  },
  getCategoryCommands: function getCategoryCommands(commands, ctg){
    if (!Array.isArray(commands) || typeof ctg !== "string") throw new Error("Invalid arrays was provided, cannot sort commands with categories provided");
    return [...commands.filter(cmd => cmd.config.category === ctg)];
  },
  generateCategoryStringList: function generateCategoryStringList(ctg, actualCategory){
    if (!Array.isArray(ctg) || ctg.some(c => typeof c !== "string")) throw new Error("Invalid categories was provided, cannot generate category string list");
    if (typeof actualCategory !== "string") throw new Error("Invalid actual category was provided, cannot generate category string list");
    let str = "";
    ctg.forEach((c, index) => {
      const sep = ((index + 1) == ctg.length) ? "" : " / ";
      str += (c === actualCategory) ? `[ ${c} ]${sep}` : `${c}${sep}`;
    });
    return str;
  },
  generateCommandStringList: function generateCommandStringList(cmds, noCommandTxt = "Aucune commande."){
    if (!Array.isArray(cmds)) throw new Error("Invalid commands was provided, cannot generate command string list");
    return `\`\`\`\n${cmds.length > 0 ? "⇒ " : noCommandTxt}${cmds.map(c => c.config.name).join("\n⇒ ")}\n\`\`\``
  },
  sendSpecificCommandHelp: function sendSpecificCommandHelp(cmd, guild){
    return ({
      embeds: [{
        author: { name: client.user.tag, icon_url: client.user.displayAvatarURL({ size: 512, format: "png" }) },
        title: `Aide de la commande "${cmd.config.name}" :`,
        color: "#5865F2",
        fields: [
          { name: "Aliase :", value: "```\n"+(cmd.config.aliases?.length > 0 ? cmd.config.aliases.join(", ") : "Aucun aliase.")+"```", inline: true },
          { name: "Catégorie :", value: "```\n"+(cmd.config.category ?? "...")+"```", inline: true },
          { name: "Description :", value: "```\n"+(cmd.config.description ?? "...")+"```", inline: false },
          { name: "Utilisation :", value: "```\n"+(cmd.config.usage ?? "...")+"```", inline: false },
        ]
      }],
      ephemeral: true,
    })
  }
}