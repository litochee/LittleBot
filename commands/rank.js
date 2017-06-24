exports.run = (client, message, args, sql) => {

  sql.get(`SELECT * FROM userScores WHERE userId =${message.author.id} AND guildID=${message.guild.id}`).then(row=>{
    if (!row) return message.reply("```" + `\n Sorry... You have no points. Start chatting!` +"```"); //if no points

    message.channel.send("```" + `\n Level:${row.level} \n Points:${row.points}/${row.nextPL} \n Rank:${row.rank}` + "```");//if points, think about rich embed
  })
}
