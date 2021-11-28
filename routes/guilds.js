const { Router } = require('express');
const CheckAuth = require('../middlewares/CheckAuth');
const stream = require('stream');
const { getDate } = require("../functions/Utils");

const sessionsAvailable = ["general"]
module.exports.Router = class Server extends Router {
	constructor() {
		super();
    this.get("/", [CheckAuth], (req, res) => {
      res.status(200).render('guilds.ejs', {
				bot: client,
				user: req.user,
				is_logged: Boolean(req.session.user),
        guilds: client.guilds.cache.filter(g => g.members.cache.get(req.user.id)?.permissions.has("MANAGE_GUILD")),
				avatarURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=256`,
				iconURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`,
        inviteURL: "https://discord.com/api/oauth2/authorize?client_id=806438484159102996&permissions=8&scope=applications.commands%20bot"
			});
    })
		this.get('/:id', [CheckAuth], async(req, res) => {
			const guild = client.guilds.cache.get(req.params.id);
			if (!guild) return res.redirect("https://discord.com/api/oauth2/authorize?client_id=806438484159102996&permissions=8&scope=applications.commands%20bot");
			if ( !guild.members.cache.get(req.user.id)?.permissions?.has('MANAGE_GUILD')) return res.status(401).render("Unauthorized to access to this guild !");
			res.status(200).render('specificGuild.ejs', {
				bot: client,
				user: req.user,
				is_logged: Boolean(req.session.user),
        guilds: client.guilds.cache.filter(g => g.members.cache.get(req.user.id)?.permissions.has("MANAGE_GUILD")),
				avatarURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=256`,
				iconURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`,
        inviteURL: "https://discord.com/api/oauth2/authorize?client_id=806438484159102996&permissions=8&scope=applications.commands%20bot",
				textChannels: guild.channels.cache.filter(c => c.type === "GUILD_TEXT").sort((a,b) => a.rawPosition - b.rawPosition).map(e => e.name),
				nickname: guild.members.cache.get(client.user.id)?.displayName,
				db: JSON.stringify((global["database"].guilds.get(guild.id) ?? { error: "DATA_NOT_FOUND" }), null, 2).trim(),
				prefix: guild.getPrefix(),
				save: req.query?.save ? true : false,
				guild
			});
		});
		this.post('/:id/:section', [CheckAuth], async (req, res) => {
			console.log(req.body);
			if (!req.params["id"] || !req.params["section"] || !sessionsAvailable.includes(req.params["section"])) return res.status(400).send("Bad request has occured, please contact development team!");
			const guild = client.guilds.cache.get(req.params["id"]);
			if (!guild) return res.status(400).send("Cannot find the guild !");

			// Threat data given by the request
			switch(req.params["section"]) {
				case "general": {}
			}
			// redirect
			res.status(200).send({ message: "success" })
		});

		this.get("/:id/download_database/:type", [CheckAuth], async (req, res) => {
			const guild = client.guilds.cache.get(req.params.id);
			if (!guild) return res.redirect("https://discord.com/api/oauth2/authorize?client_id=806438484159102996&permissions=8&scope=applications.commands%20bot");
			if (!req.user.id || !guild.members.cache.get(req.user.id)?.permissions?.has('MANAGE_GUILD')) return res.status(401).render("Unauthorized to access to this guild !");
			console.log(req.params)
			const buff = Buffer.from(JSON.stringify((global["database"].guilds.get(guild.id) ?? { error: "DATA_NOT_FOUND" }), null, 2));
			const readStream = new stream.PassThrough();
			readStream.end(buff);
			res.set('Content-disposition', `attachment; filename=${req.params.id}_DATABASE_${getDate(Date.now(), "[DD]-[MM]-[YYYY]")}.${req.params.type}`);
  		res.set('Content-Type', req.params.type == "json" ? "application/json": 'text-plain');
			readStream.pipe(res);
		})
	}
};

module.exports.name = '/guilds';
