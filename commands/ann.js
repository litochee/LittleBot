exports.run = (client, message, args, sql) =>{
    sql.get(`SELECT * FROM userScores WHERE guildID=${message.guild.id} AND userID=${message.author.id}`).then(iUser =>{
        if(iUser.AccessLevel >= 3){
            let choice = args[0];
            if (choice == "approve"){
                sql.get(`SELECT * FROM gAnnounce WHERE guildID=${message.guild.id} AND aID=${args[1]}`).then(chAnn =>{
                    sql.get(`SELECT * FROM gSettings WHERE GuildID=${message.guild.id}`).then(gSet =>{
                    const channel = message.guild.channels.find('name', gSet.announce);
                        if (!channel){
                            message.guild.defaultChannel.send(`@everyone, ${chAnn.announce}`);
                            sql.run(`UPDATE gAnnounce SET status = 'approved' WHERE guildID=${message.guild.id} AND aID=${args[1]}`);
                        }else{
                            channel.send(`@everyone, ${chAnn.announce}`);
                            sql.run(`UPDATE gAnnounce SET status = 'approved' WHERE guildID=${message.guild.id} AND aID=${args[1]}`);
                        }
                     client.users.get(chAnn.requesterID).send(`**Announcement Status**\n**ID**:${chAnn.aID}\n**Announcement**: ${chAnn.announce}\n**Status**: Approved`);
                    })
                })
            }else if(choice == "decline"){
                sql.get(`SELECT * FROM gAnnounce WHERE guildID=${message.guild.id} AND aID=${args[1]}`).then(chAnn =>{
                    args.splice(0,2);
                    let dMessage = args.join(" ");
                    sql.run(`UPDATE gAnnounce SET status = 'declined' WHERE guildID=${message.guild.id} AND aID=${args[1]}`);
                    client.users.get(chAnn.requesterID).send(`**Announcement Status**\n**ID**:${chAnn.aID}\n**Announcement**: ${chAnn.announce}\n**Status**: declined\n**Reason**:${dMessage}`);
                })
            }else{
                message.reply("You have not made a choice");
            }
        }else{
            message.reply("Sorry you do not have permission.");
        }
    })
}
