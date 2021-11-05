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
        news: []
			});
		});
	}
};

module.exports.name = '/';