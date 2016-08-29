var Cleverbot = require('cleverbot-node');
var Talk = new Cleverbot();
var ent = require('entities');
var antiSpam = {};

setInterval(() => antiSpam = {},3600000);

exports.cleverbot = function(bot, msg) {
	var text;
	if (!msg.channel.isPrivate) text = (msg.cleanContent.split(' ').length > 1) ? msg.cleanContent.substring(msg.cleanContent.indexOf(' ') + 1).replace('@', '') : false;
	else text = msg.content;
	if (text) {
		bot.startTyping(msg.channel);
		Cleverbot.prepare(() => {
			Talk.write(text, resp=>{
				if (/\|/g.test(resp.message)) {
					resp.message = resp.message.replace(/\|/g, '\\u'); //replace | with \u
					resp.message = resp.message.replace(/\\u([\d\w]{4})/gi, (match, grp) => { //unescape unicode
						return String.fromCharCode(parseInt(grp, 16));
					});
				}
				if (!resp.message || !ent.decodeHTML(resp.message)) {
					bot.sendMessage(msg, '⚠ Nothing was returned! Resetting cleverbot...');
					delete require.cache[require.resolve("cleverbot-node")];
					Cleverbot = require('cleverbot-node');
					Talk = new Cleverbot();
					console.log(cWarn(" WARN ") + " Cleverbot returned nothing");
				} else bot.sendMessage(msg, '💬 ' + ent.decodeHTML(resp.message));
			});
		});
		bot.stopTyping(msg.channel);
	} else {
		if (!antiSpam.hasOwnProperty(msg.author.id)) antiSpam[msg.author.id] = "";
		else {
			if (antiSpam[msg.author.id] == "") return;
			else antiSpam[msg.author.id] = "";
		}
		bot.sendMessage(msg, '`Please say something when you mention me`');
	}
};
