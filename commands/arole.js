exports.run = (client, message, args, sql) =>{
    sql.get(`SELECT * FROM userScores WHERE guildID='${message.guild.id}' AND userID='${message.author.id}'`).then(iUser =>{ //gets user row of whos requesting
        if(iUser.AccessLevel >= 3){
            sql.get(`SELECT * FROM mRoles WHERE guildID='${message.guild.id}' AND RoleName='${args.join(" ")}'`).then(ar =>{
                if(!ar){
                let chRole = message.guild.roles.find("name", args.join(" "));
                    if (!chRole){
                        message.reply(`Sorry ${args.join(" ")} is not a role.`);
                    }else{
                        sql.run(`INSERT INTO mRoles (guildID, RoleName, RoleID, OwnerID, OwnerName, AccessLevel) VALUES (?,?,?,?,?,?)`, [message.guild.id, chRole.name, chRole.id, message.author.id, message.author.username, 1]);
                        message.reply(`${args.join(" ")} has been added to the database. Users may now get this role with **:?role**`);
                    }
                }else{
                message.reply(`Sorry ${args.join(" ")} is already added to the DataBase.`);
                return;
                }
            })
        }else{
            message.reply("Sorry you don't have acces.");
        }
    })
}
