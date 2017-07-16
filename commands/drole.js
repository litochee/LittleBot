exports.run = (client, message, args, sql) =>{
    sql.get(`SELECT * FROM userScores WHERE guildID='${message.guild.id}' AND userID='${message.author.id}'`).then(iUser =>{ //gets user row of whos requesting
        if(iUser.AccessLevel >= 3){
            let chRole = message.guild.roles.find("name", args.join(" "));
            if(!chRole){
                message.reply(`Sorry ${args.join(" ")} is not a role.`);
            }else{
                    sql.run(`DELETE FROM mRoles WHERE guildID=${message.guild.id} AND RoleID=${chRole.id}`);
                    message.reply(`${args.join(" ")} has been deleted from the database.`); 
            }
        }else{
            message.reply("Sorry you don't have acces.");
        }
    })
}
