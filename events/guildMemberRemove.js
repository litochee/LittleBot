exports.run = (client, member, args) =>{
  const channel = member.guild.channels.find('name', 'bot_logs');
  if (!channel){
    guild.defaultChannel.send(`Welcome to the server ${member}`)
  }else{
    channel.send(`Bye ${member}`).catch(console.error);
  }
}
