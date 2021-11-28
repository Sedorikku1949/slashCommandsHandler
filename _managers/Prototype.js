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
  const guild = this.cache.find((m) => (options.bot ? true : !m.user.bot) && (m.id == args.replace(/\D+/g, '') || m.user.username.toLowerCase().match(new RegExp(args.toLowerCase(), 'g')) || m.displayName.toLowerCase().match(new RegExp(args.toLowerCase(), 'g')) || m.user.discriminator.match(new RegExp(args.toLowerCase(), ''), "g")));
  const callback = (m) => (options.bot ? true : !m.bot) && (m.id == args.replace(/\D+/g, '') || m.username.toLowerCase().match(new RegExp(args.toLowerCase(), 'g')) || m.discriminator.toLowerCase().match(new RegExp(args.toLowerCase(), "g")))
  console.log(guild)
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

const translateArgs = (txt, ...args) => txt.replace(/\$[1-9](?:[0-9]+)?/g, (match, p1) => args[Number(match.replace(/[^\d]+/g, ""))-1]);

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
  if (args.length < 1) return obj;
  return notAstring(obj, ...args);
}

Discord.Guild.prototype.getLanguage = function getLanguage(){ return database.guilds.get(this.id)?.lang ?? "fr"; };
Discord.Guild.prototype.getPrefix = function getPrefix(){ return database.guilds.get(this.id)?.prefix ?? "="; };

const { getPixels } = require("../functions/Img.js")

Array.prototype.rgbToHex = function() {
  function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
  }
  return "#"+this.map(t=>componentToHex(t)).join("")
}
Array.prototype.rgbToHsl = function() {
  let [r,g,b]=this
  r /= 255; g /= 255; b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [ Math.round(h * 360), Math.round(s*100), Math.round(l*100) ]
}
String.prototype.averageColor = async function(format="rgb"){
  let arr = []
  const pixels = await getPixels(this.toString())
  for (let i=0, len=pixels.data.length; i<len; i+=200) {
      arr.push([pixels.data[i + 0],pixels.data[i + 1],pixels.data[i + 2]])
  }
  const rgb = arr.reduce((a,t)=>a.map((y,ind)=>y+t[ind])).map(t=>Math.trunc(t/(pixels.data.length/200)))
  if(format === "hex"){
      return rgb.rgbToHex()
  }else if(format === "rgb"){
      return rgb
  }else if(format === "hsl"){
      return rgb.rgbToHsl()
  }
}