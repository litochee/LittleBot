exports.run = (client, message, args, sql) => {
  let member = message.mentions.users.first();
  if(!member){
    sql.get(`SELECT * FROM userScores WHERE userId =${message.author.id} AND guildID=${message.guild.id}`).then(iUser=>{
      if (!iUser) return message.reply("```" + `\n Sorry... You have no points. Start chatting!` +"```"); //if no points

      message.channel.send("```" + `\n Level:${iUser.level} \n Points:${iUser.points}/${iUser.nextPL} \n Rank:${iUser.rank}` + "```");//if points, think about rich embed
    })
  }else{
    sql.get(`SELECT * FROM userScores WHERE userId=${member.id} AND guildID=${message.guild.id}`).then(iUser=>{
      if (!iUser) return message.reply("```" + `\n Sorry... You have no points. Start chatting!` +"```"); //if no points

      message.channel.send("```" + ` Username:${iUser.username}\n Level:${iUser.level} \n Points:${iUser.points}/${iUser.nextPL} \n Rank:${iUser.rank}` + "```");//if points, think about rich embed
    })
  }

}
