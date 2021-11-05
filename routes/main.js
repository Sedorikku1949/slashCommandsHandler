const { Router } = require('express');

module.exports.Router = class Home extends Router {
	constructor() {
		super();
		this.get('/', function(req, res) {
			res.status(200).render('main.ejs', {
				bot: client,
				user: req.user,
				is_logged: Boolean(req.session.user),
        users: (client.guilds.cache.reduce((a,b) => a += b.memberCount, 0)).shortNumber(),
        news: [],
        inviteURL: "https://discord.com/api/oauth2/authorize?client_id=858766319506554899&permissions=8&scope=applications.commands%20bot"
			});
		});
	}
};

module.exports.name = '/';