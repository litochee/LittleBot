exports.run = (client, member, args) =>{
  const channel = member.guild.channels.find('name', 'welcome_users');
  if (!channel){
    guild.defaultChannel.send(`Welcome to the server ${member}`)
  }else{
    channel.send(`Welcome ${member}`).catch(console.error);
  }
}
