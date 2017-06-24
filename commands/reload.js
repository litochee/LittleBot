exports.run = (client, message, args, sql) => {
  sql.get(`SELECT * FROM userScores WHERE GuildID = ${message.guild.id} AND userID = ${message.author.id}`).then(iUser =>{
    if(iUser.AccessLevel >= 3){
      if(!args || args.size < 1) return message.channel.reply('Must provide a command name to reload.');
      // the path is relative to the *current folder*, so just ./filename.js
      delete require.cache[require.resolve(`./${args[0]}.js`)];
      message.reply(`The command ${args[0]} has been reloaded`);
    }else{
      message.reply("Sorry you don't have access.");
    }
  }).catch(() =>{
    message.reply(`${args[0]} is not a valid command.`);
  });
};
