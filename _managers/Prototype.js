const Discord = require("discord.js");

Discord.GuildMember.prototype.isStaff = function isStaff(){
  return database.guilds.get(this.guild.id)?.moderation?.staffRoles?.length > 0
    ? database.guilds
      .get(this.id, "moderation.staffRoles")
      .some(r => this.roles.cache.has(r))
    : this.permissions.has("MANAGE_MESSAGES");
}

Discord.GuildMemberManager.prototype.select = function select(args, options = { fetch: false, bot: false, user: false }){
  if (typeof args !== "string" || typeof options !== "object" || Array.isArray(options)) return null;
  const guild = this.cache.find((m) => (options.bot ? true : !m.user.bot) && (m.id == args.replace(/\D+/g, '') || m.user.username.match(new RegExp(args.toLowerCase(), 'g')) || m.displayName.match(new RegExp(args.toLowerCase(), 'g')) || m.user.discriminator.match(new RegExp(args.toLowerCase(), ''), "g")));
  const callback = (m) => (options.bot ? true : !m.bot) && (m.id == args.replace(/\D+/g, '') || m.username.match(new RegExp(args.toLowerCase(), 'g')) || m.discriminator.match(new RegExp(args.toLowerCase(), "g")))
  const data = (options.fetch ?
    (options.user ? (guild?.user || this.client.users.cache.find(callback) || this.client.users.fetch(args.replace(/\D+/g, '')).catch(() => null) ) : (guild || this.client.users.cache.find(callback) || this.client.users.fetch(args.replace(/\D+/g, '')).catch(() => null) ))
    : (options.user ? guild?.user : guild));
  return {
    user: ((data instanceof Discord.User) ? data : (data?.user ? data?.user : null )),
    member: ((data instanceof Discord.GuildMember) ? data : null)
  }
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