const { Router } = require('express');
const CheckAuth = require('../middlewares/CheckAuth');

module.exports.Router = class Profile extends Router {
	constructor() {
		super();
		this.get('/', [CheckAuth], (req, res) => {
			res.status(200).render('profile.ejs', {
				bot: client,
				user: req.user,
				is_logged: Boolean(req.session.user),
				avatarURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=256`,
				iconURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`,
        banner: "img/defaultWallpaper.jpg",
        inviteURL: "https://discord.com/api/oauth2/authorize?client_id=858766319506554899&permissions=8&scope=applications.commands%20bot"
			});
		});
		this.post('/', [CheckAuth], async (req, res) => {});
	}
};

module.exports.name = '/profile';
