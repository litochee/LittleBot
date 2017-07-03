const sEmbed = require('./../embeds/eShop.js');
exports.run = (client, message, args, sql, Discord) =>{
    sql.get(`SELECT * FROM userScores WHERE guildID = '${message.guild.id}' AND userID = '${message.author.id}'`).then(iUser =>{ //gets user row of whos requesting
    	sEmbed.shopEmbed(client, message, iUser, Discord);
    })
}
