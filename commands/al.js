const config = require('./../config.json'); //comand is prefix al @user <access level>
exports.run = (client, message, args, sql) =>{
  if(message.author.id == config.ownerID){
      let member = message.mentions.users.first();
      sql.run(`UPDATE userScores SET AccessLevel = ${args[1]} WHERE userID=${member.id} AND guildID=${message.guild.id}`);
      message.reply(`${member.username} has been granted access level of ${args[1]}`);
    }else{
      sql.get(`SELECT * FROM userScores WHERE guildID = '${message.guild.id}' AND userID = '${message.author.id}'`).then(iUser =>{
        if (iUser.AccessLevel >= 3){
          let member = message.mentions.users.first();
          if(iUser.AccessLevel < args[1]){
            message.channel.send(`Sorry you don't have the appropriate access.`);
          }else{
            sql.run(`UPDATE userScores SET AccessLevel = ${args[1]} WHERE userID=${member.id} AND guildID=${message.guild.id}`);
            message.reply(`${member.username} has been granted access level of ${args[1]}`);
          }
        }else{
          message.channel.send(`Sorry you don't have access to this cmand.`);
        }
      }).catch(() =>{
        console.error
        message.channel.send(`Sorry you don't have access to this command.`);
        return ;
      });
    }
}
