exports.run = (client, message, args, sql) =>{
    sql.get(`SELECT * FROM userScores WHERE userID ='${message.author.id}' AND guildID='${message.guild.id}'`).then(row=>{//looks up users row in DB
      message.author.send(`Your pin is: ${row.upin}`); //Direct messages user to let them know their pin
    })
    const channel = message.guild.channels.find('name', 'bot_logs'); //checks for bot logs
    if (!channel) { //if it doesn't find channel
      console.log(`${message.author.username} requested their pin.`); //console log
    }else{//if it finds the channel
      channel.send(`${message.author.username} requested their pin.`); //channel log
    }
}
