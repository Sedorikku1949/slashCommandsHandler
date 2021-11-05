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
        news: [
          { name: "Les commandes slashs sont disponibles !", url: "/news/slashs-here", img: "https://cdn.discordapp.com/attachments/832164618956832799/906229890649583666/slash-here.jpg", littleDesc: "Voici la liste des changements." },
          { name: "Les dernières nouvelles de discord", url: "/news/message-intents", img: "https://cdn.discordapp.com/attachments/832164618956832799/906229888825065503/message-intents.jpg", littleDesc: "On vous explique ce qui change." },
          { name: "Les chatons", url: "/news/cat", img: "https://cdn.discordapp.com/attachments/832164618956832799/906229888560812032/cat.png", littleDesc: "Miaou" }
        ],
        inviteURL: "https://discord.com/api/oauth2/authorize?client_id=858766319506554899&permissions=8&scope=applications.commands%20bot"
			});
		});
	}
};

module.exports.name = '/';