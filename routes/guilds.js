const { Router } = require('express');
const CheckAuth = require('../middlewares/CheckAuth');

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
        inviteURL: "https://discord.com/api/oauth2/authorize?client_id=858766319506554899&permissions=8&scope=applications.commands%20bot"
			});
    })
		this.get('/:guildID', [CheckAuth], (req, res) => {
			const guild = client.guilds.cache.get(req.params.guildID);
			if (!guild) return res.redirect("https://discord.com/api/oauth2/authorize?client_id=858766319506554899&permissions=8&scope=applications.commands%20bot");
			if (!guild.members.cache.get(req.user.id)?.permissions?.has('MANAGE_GUILD')) return res.status(401).render("Unauthorized to access to this guild !");
			res.status(200).render('specificGuild.ejs', {
				bot: client,
				user: req.user,
				is_logged: Boolean(req.session.user),
        guilds: client.guilds.cache.filter(g => g.members.cache.get(req.user.id)?.permissions.has("MANAGE_GUILD")),
				avatarURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=256`,
				iconURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`,
        inviteURL: "https://discord.com/api/oauth2/authorize?client_id=858766319506554899&permissions=8&scope=applications.commands%20bot",
				guild
			});
		});
		this.post('/:guildID', [CheckAuth], async (req, res) => {
			if (!req.body.send_CHANNELID || req.body.send_CHANNELID === 'NOT_SET') return res.status(400).send('Erreur, pas de salon spécifié !');
			if (!req.body.send_MESSAGE || req.body.send_MESSAGE.length === 0) return res.status(400).send('Erreur, pas de message spécifié !');
			if (!req.bot.guilds.cache.get(req.params.guildID).members.cache.get(req.user.id).hasPermission('MANAGE_GUILD')) return res.redirect('/profile');
			await req.bot.guilds.cache.get(req.params.guildID).channels.cache.get(req.body.send_CHANNELID).send(req.body.send_MESSAGE);
			await res.redirect(`/server/${req.params.guildID}`);
		});
	}
};

module.exports.name = '/guilds';
