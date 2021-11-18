const Discord = require("discord.js");

const { isObject } = require("../functions/Utils");

Discord.GuildMember.prototype.isStaff = function isStaff(){
  return database.guilds.get(this.guild.id)?.moderation?.staffRoles?.length > 0
    ? database.guilds
      .get(this.id, "moderation.staffRoles")
      .some(r => this.roles.cache.has(r))
    : this.permissions.has("MANAGE_MESSAGES");
}

Discord.GuildMemberManager.prototype.select = function select(args, options = { fetch: false, bot: false, user: false }){
  if (typeof args !== "string" || typeof options !== "object" || Array.isArray(options)) return null;
  if (args.length < 1) return null;
  const guild = this.cache.find((m) => (options.bot ? true : !m.user.bot) && (m.id == args.replace(/\D+/g, '') || m.user.username.match(new RegExp(args.toLowerCase(), 'g')) || m.displayName.match(new RegExp(args.toLowerCase(), 'g')) || m.user.discriminator.match(new RegExp(args.toLowerCase(), ''), "g")));
  const callback = (m) => (options.bot ? true : !m.bot) && (m.id == args.replace(/\D+/g, '') || m.username.match(new RegExp(args.toLowerCase(), 'g')) || m.discriminator.match(new RegExp(args.toLowerCase(), "g")))
  const data = (options.fetch ?
    (options.user ? (guild?.user || this.client.users.cache.find(callback) || this.client.users.fetch(args.replace(/\D+/g, '')).catch(() => null) ) : (guild || this.client.users.cache.find(callback) || this.client.users.fetch(args.replace(/\D+/g, '')).catch(() => null) ))
    : (options.user ? guild?.user : guild));
  return ((data instanceof Discord.User) ? data : (data?.user ? data?.user : null ))
}

Discord.GuildChannelManager.prototype.select = function select(args, options = { fetch: false, type: "GUILD_TEXT" }){
  if (typeof args !== "string" || typeof options !== "object" || Array.isArray(options)) return null;
  const guild = this.cache.find((m) => (options.type !== "ANY" ? m.type == options.type : true) && (m.id == args.replace(/\D+/g, '') || m.name.match(new RegExp(args.toLowerCase(), 'g'))));
  const callback = (m) => (options.type !== "ANY" ? m.type == options.type : true) && (m.id == args.replace(/\D+/g, '') || m.name.match(new RegExp(args.toLowerCase(), 'g')))
  return (options.fetch ? 
    (guild || this.client.channels.cache.find(callback) || this.client.channels.fetch(args.replace(/\D+/g, '')).catch(() => null) )
    : guild)
}

Discord.RoleManager.prototype.select = function select(args){
  if (typeof args !== "string") return null;
  return this.cache.find((m) => m.id == args.replace(/\D+/g, '') || m.name.match(new RegExp(args.toLowerCase(), 'g')));
}

Number.prototype.shortNumber = function() {
  const tab = ['y', 'z', 'e', 'p', 't', 'g', 'm', 'k']
  for (let i = 24, y = 0; i > 0; i -= 3, y++) if (this >= 10 ** i) return (this / 10 ** i).toFixed((this / 10 ** i).toFixed(1).toString().includes('.0') ? 0 : 1) + tab[y].toUpperCase()
  return this
}

Discord.Guild.prototype.registerCommands = function registerCommands(){ return database.SlashCommands.loadGuild(this); }
Discord.AnonymousGuild.prototype.registerCommands = function registerCommands(){ return database.SlashCommands.loadGuild(this); }

const translateArgs = (txt, ...args) => txt.replace(/\$[1-9]+/g, (match, p1) => args[Number(match.replace(/[^0-9]/g, ""))-1]);

function notAstring(obj, ...args){
  if (typeof obj == "string") return translateArgs(obj, ...args);
  else if (Array.isArray(obj)) {
    return obj.map((elm) => notAstring(elm, ...args));
  }
  else if (isObject(obj)) {
    const data = {};
    Object.entries(obj).forEach((elm) => data[elm[0]] = notAstring(elm[1], ...args));
    return data;
  } else return obj;
}

Discord.Guild.prototype.translate = function(key, ...args){ 
  if (!key || typeof key !== "string") return 'ERROR';
  const obj = database.Language.find(database.guilds.get(this.id)?.lang ?? "fr", key);
  return notAstring(obj, ...args);
}

Discord.Guild.prototype.getLanguage = function getLanguage(){ return database.guilds.get(this.id)?.lang ?? "fr"; };