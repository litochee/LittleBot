const sEmbed = require('./../embeds/eSettings.js');
exports.run = (client, message, args, sql, Discord) =>{
    let subCommand = args[0];
    let secondArgu = args[1];
    sql.get(`SELECT * FROM userScores WHERE guildID=${message.guild.id} AND userID=${message.author.id}`).then(iUser =>{
        if(iUser.AccessLevel == 3 || iUser.userID == message.guild.ownerID){
            if(!subCommand){
                    sql.run(`INSERT INTO gSettings (GuildID, OwnerID, OwnerUser) VALUES (?,?,?)`,[message.guild.id, message.guild.ownerID, message.author.username]);
                    sql.run(`UPDATE userScores SET AccessLevel = 3 WHERE guildID = ${message.guild.id} AND userID = ${message.author.id}`);
                    message.reply(`Setup has been run correctly. **${message.author.username}** set as owner.`);        
            }else if(subCommand == "welcome"){
                const channel = message.guild.channels.find('name', secondArgu);
                if(!channel){
                    message.reply(`Sorry **${secondArgu}** is not a channel.`);
                }else{
                    sql.get(`SELECT * FROM gSettings WHERE guildID = ${message.guild.id}`).then(gRow =>{
                        if(!gRow){
                            message.reply("Please run the **:?setup** command before running this.");
                            return;
                        }else{
                            sql.run(`UPDATE gSettings SET welcome = '${secondArgu}' WHERE guildID = ${message.guild.id}`)
                            message.reply(`Welcome channel has been set to **${secondArgu}**.`);
                        }
                    })
                }
            }else if(subCommand == "leave"){
                const channel = message.guild.channels.find('name', secondArgu);
                if(!channel){
                    message.reply(`Sorry **${secondArgu}** is not a channel.`);
                }else{
                    sql.get(`SELECT * FROM gSettings WHERE guildID = ${message.guild.id}`).then(gRow =>{
                        if(!gRow){
                            message.reply("Please run the **:?setup** command before running this.");
                            return;
                        }else{
                            sql.run(`UPDATE gSettings SET leave = '${secondArgu}' WHERE guildID = ${message.guild.id}`)
                            message.reply(`Leave channel has been set to **${secondArgu}**.`);
                        }
                    })
                }
            }else if(subCommand == "view"){
                sEmbed.settingsEmbed(client, message, sql, Discord);
            }else{
                message.reply(`Sorry ${secondArgu} is not a command.`);
            }
        }else{
            message.reply("Sorry you don't have access");
        }

    })//end SQLGet
}

//GuildId, OwnerId, OwnerUser, welcome, leave, announce
