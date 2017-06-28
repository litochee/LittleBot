exports.run = (client, message, args, sql) =>{
  sql.get(`SELECT * FROM mRoles WHERE GuildID = '${message.guild.id}' AND RoleName = '${args.join(" ")}'`).then(iRole =>{ //gets the role row
    if(!iRole){
      message.reply(`There is no role named ${args.join(" ")}, roles are case-sensitive`);
    }else{
      sql.get(`SELECT * FROM userScores WHERE guildID = '${message.guild.id}' AND userID = '${message.author.id}'`).then(iUser =>{ //gets user row of whos requesting
        if(iUser.AccessLevel >= iRole.AccessLevel){ //checks to see if the user has enough permissions
          //check to see if user already has role, if they do take it away
          if(message.member.roles.has(iRole.RoleID)){
            message.member.removeRole(iRole.RoleID).catch(console.error);
            message.reply(`you have been removed from ${args.join(" ")}.`);
          }else{
          message.member.addRole(iRole.RoleID);
          message.reply(`You have been added to ${args.join(" ")} role.`);
          }
        }else{
          message.reply("Sorry you don't have enough access to get this role");
          return;
        }
      }).catch(() =>{
        message.reply("Please type anything in channel and try again.");
      })
    }
  }).catch(() =>{
  	message.channel.send(`Sorry ${args.join(" ")} is not a role. Roles are case sensitive please try again.`);
  	return ;
  });


}
