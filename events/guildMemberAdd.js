exports.run = (client, member, sql) =>{
  let guild = member.guild;

  sql.get(`SELECT * FROM gSettings WHERE GuildId = ${guild.id}`).then(gset =>{
    if(!gset){
      return;
    }else{
      let channel = guild.channels.find('name', gset.welcome);
      if (!channel){
        guild.defaultChannel.send(`Welcome **${member}** to the server!!`);
      }else{
        channel.send(`Welcome **${member}** to the server!!`);
      }
    }
  });
}
