exports.run = (client, message, args, sql) =>{
  sql.get(`SELECT * FROM userScores WHERE GuildID = ${message.guild.id} AND userID = ${message.author.id}`).then(iUser =>{
  	if(iUser.AccessLevel >= 3){
  		message.guild.createRole({
  			name: `${args.join(" ")}`//,
  			//color: '',
  		}).then(role =>{
        message.reply(`${role.name} has been created`)
          sql.run(`INSERT INTO mRoles (guildID, RoleName, RoleID, OwnerID, OwnerName, AccessLevel) VALUES (?,?,?,?,?,?)`, [message.guild.id, role.name, role.id, message.author.id, message.author.username, 1]);
      } ).catch(console.error);
  	}else{
  	message.reply("Sorry you do not have permission.");
  	}
  }).catch(() =>{
  	message.reply("Sorry you do not have permission.");
  });
}
