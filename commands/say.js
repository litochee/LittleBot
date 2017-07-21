exports.run = (client, message, args) =>{

  message.channel.send(args.join(" ")); //joins it back together
  const channel = message.guild.channels.find('name', 'bot_logs'); //checks for bot logs
  message.delete();
  if (!channel) { //if it doesn't find channel
    retun;
  }else{
    channel.send(`${message.author.username} said: ${message.content}`);
  }
}
