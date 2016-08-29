var config = require("./config.json")
	  , discord	= require("discord.js")
	  , cleverbot	= require("./cleverbot.js").cleverbot
    , bot = new discord.Client({maxCachedMessages: 1000, forceFetchUsers: true});

bot.on("message", (msg) => {
	if (msg.author.id == bot.user.id) return; //Ignore other bots
	if (msg.channel.isPrivate) {
			cleverbot(bot, msg);
			return;
		} else {
		if (msg.mentions.length !== 0) {
			if (msg.isMentioned(bot.user) && new RegExp('^<@!?' + bot.user.id + '>').test(msg.content)) {
					cleverbot(bot, msg);
          return;
				}
			}
		}
});

console.log("Logging in...");
setTimeout(() => {console.log("Your bot should be good to go, have fun!");}, 5000);
bot.loginWithToken(config.token, (err, token) => {
	if (err) {
		console.log(err);
		setTimeout(() => {
			process.exit(1);
		}, 2000);
	}
	if (!token) {
		console.log("Error: failed to connect...");
		setTimeout(() => {
			process.exit(0);
		}, 2000);
	}
});
