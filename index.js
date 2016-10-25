var config = require("./config.json")
	  , discord	= require("discord.js")
	  , cleverbot	= require("./cleverbot.js").cleverbot
          , bot = new discord.Client({maxCachedMessages: 1000, forceFetchUsers: true});

bot.on("message", (msg) => {
	if (msg.user.bot) return; //Ignore other bots
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

try {
console.log("Logging in...");
setTimeout(() => {console.log("Your bot should be good to go, have fun!");}, 5000);
bot.loginWithToken("Bot " + config.token);
} catch(err) {
  console.log(`Error Caught: ${err}\nMake sure you've input a valid token into the config.`);
});
