exports.run = (client, message, args, sql) =>{
  sql.get(`SELECT * FROM userScores WHERE guildID = ${message.guild.id} AND userID = ${message.author.id}`).then(iUser =>{
    if(iUser.AccessLevel >= 3){
      let alvl = args[0]; //get's the level
      let pRole = args.splice(1); //only get's the name of the role
      let nRole = message.guild.roles.find("name", pRole.join(" ")); //checks for the role

      if (!nRole){
        message.reply(`no role found ${pRole.join(" ")}`);
      }else{
        sql.get(`SELECT * FROM levelRoles WHERE guildID = ${message.guild.id} AND roleID = ${nRole.id}`).then(oRole =>{
          if (!oRole){
            sql.run(`INSERT INTO levelRoles (guildID, roleID, roleName, level) VALUES (?,?,?,?)`,[message.guild.id, nRole.id, pRole.join(" "), alvl]);
            message.reply(`${pRole} has been set for level ${alvl}.`)
          }else{
            sql.run(`UPDATE levelRoles SET guildID = ${message.guild.id} AND roleID = ${nRole.id} AND roleName = ${pRole.join(" ")} AND level = ${alvl} WHERE guildID='${message.guild.id}' AND level='${alvl}'`);
            message.reply(`${pRole} has been updated for level ${alvl}.`)
          }
        }).catch(() =>{
          message.reply("need to create table");
        })
      }
    }else{
      message.reply("Sorry you don't have access.");
    }
  }).catch(console.error);
}
