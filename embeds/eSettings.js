module.exports.settingsEmbed = function(client, message, sql, Discord) {

    sql.get(`SELECT * FROM gSettings WHERE guildID = '${message.guild.id}'`).then(sRow =>{
        if(!sRow){
            message.reply("Please have the settings setup with :?setup");
        }else{
            sql.all(`SELECT roleName, level FROM levelRoles WHERE guildID = '${message.guild.id}'`).then(rRow =>{
                if(!rRow[0]){
                    var rlOut = "None";
                }else{
                    var rlName = rRow.map(z=>z.roleName);
                    var rlLevel = rRow.map(x=>x.level);
                    var rlOutp = rlLevel.map(function(a,b){
                        return['L: ' + `**${a}**` + '  N: ' + `**${rlName[b]}**`];
                    })
                    var rlOut = rlOutp.join("\n");
                }
                sql.all(`SELECT RoleName FROM mRoles WHERE guildID = '${message.guild.id}'`).then(mrRow =>{
                    if(!mrRow[0]){
                        var mrOut = "None";
                    }else{
                        var mrOutp = mrRow.map(z=>z.RoleName);
                        var mrOut = mrOutp.join("\n");
                    }
                    var embed = new Discord.RichEmbed()
                        .setTitle("LittleBot Settings")
                        .setDescription(`**Settings for ${message.guild.name} server**`)
                        .setColor(0x00AE86)
                        .addField("Settings", `Owner: **${sRow.OwnerUser}**\nWelcome Channel: **${sRow.welcome}**\nLeave Channel: **${sRow.leave}**`, true)
                        .addField("Roles", `${mrOut}`, true)
                        .addBlankField(true)
                        .addField("Level Up Roles", `${rlOut}`, true)
                    message.channel.send({embed: embed});
                    });
            });
        }
    });

}