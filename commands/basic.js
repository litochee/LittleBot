exports.run = (client, message, args, sql) =>{
    sql.get(`SELECT * FROM userScores WHERE guildID = '${message.guild.id}' AND userID = '${message.author.id}'`).then(iUser =>{ //gets user row of whos requesting

    })
}
