const config = require('./../config.json');
exports.run = (client, message, args) =>{
 message.author.send(`Hello ${message.author.username}, here are the commands \n` + "```" + ` ${config.prefix}help - Shows help \n ${config.prefix}level - Shows your level (talking gains you levels!) \n ${config.prefix}say - type in anything after say and the bot will say it!\n ${config.prefix}leaderboard - shows the level system leaderboards\n ${config.prefix}role -role name- obtain roles` + "```")
}
