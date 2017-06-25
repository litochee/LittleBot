exports.run = (client, member, sql) =>{
  let guild = member.guild;

  sql.get(`SELECT * FROM gSettings WHERE GuildId = ${guild.id}`).then(gset =>{
    if(!gset){
      guild.defaultChannel.send(`Bye **${member}**`);
    }else{
      let channel = guild.channels.find('name', gset.leave);
      if (!channel){
        guild.defaultChannel.send(`Bye **${member}**`);
      }else{
        channel.send(`Bye **${member}**`);
      }
    }
  });
}