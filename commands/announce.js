exports.run = (client, message, args, sql) =>{
    sql.get(`SELECT * FROM userScores WHERE GuildID = ${message.guild.id} AND userID = ${message.author.id}`).then(iUser =>{
        if (iUser.AccessLevel >= 2){
            sql.run(`INSERT INTO gAnnounce (requester, requesterID, guildID, announce, status) VALUES (?,?,?,?,?)`, [message.author.username, message.author.id, message.guild.id, args.join(" "), "pending"]);
            sql.all(`SELECT * FROM userScores WHERE guildID = ${message.guild.id} AND AccessLevel >= 3`).then(sApp =>{
                const ownap = sApp.map(e=>e.userID);
                sql.all(`SELECT * FROM gAnnounce WHERE guildID = ${message.guild.id} AND status = 'pending'`).then(pAnn =>{
                    const req = pAnn.map(a=>a.requester);
                    const ann = pAnn.map(b=>b.announce);
                    const stat = pAnn.map(c=>c.status);
                    const annID = pAnn.map(d=>d.aID);
                    for(i = 0; i < req.length; i++){
                        for( f = 0; f < sApp.length; f++){
                            client.users.get(ownap[f]).send(`**${req[i]}** is requesting to announce:\n ***${ann[i]}***.\n Status: **${stat[i]}**\n ID: **${annID[i]}**\n Type (in bot commands)\n **:?ann approve ${annID[i]}** to approve.\n **:?ann decline ${annID[i]} <message>** to decline.`);
                        }                        
                    }
                })
            })
                
        }else{
            message.reply("Sorry you don't have access to announce.");
        }
    })
}