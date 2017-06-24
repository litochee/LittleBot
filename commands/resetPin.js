const gpc = require('generate-pincode'); //pincode npm

exports.run = (client, message, args, sql) =>{
    let setPin = gpc(6); //gpc sets a 6 digit pin
    const channel = message.guild.channels.find('name', 'bot_logs'); //finds the channel bot_logs

    if (!channel) { //if no channel just console.log it
      console.log(`${message.author.username}'s new pin is ${setPin}`); //console log new pin
    }else{
    channel.send(`${message.author.username}'s new pin is ${setPin}`); //channel send new pin
    }
    message.author.send(`Your new pin is: ${setPin}`); //direct message to user with their new pin
    sql.run(`UPDATE userScores SET upin = ${setPin} WHERE userId = ${message.author.id} AND guildID = ${message.guild.id}`); //updates the new pin
}
