var moment = require('moment');
exports.run = (client, message, args, sql) =>{
    sql.get(`SELECT * FROM userScores WHERE guildID = '${message.guild.id}' AND userID = '${message.author.id}'`).then(iUser =>{ //gets user row of whos requesting

        var eRedeem = args[0];
        if(!eRedeem){
            message.reply("Please enter a valid event point code.");
        }else{
            sql.get(`SELECT * FROM eventCodes WHERE guildID='${message.guild.id}' AND coupon='${eRedeem}'`).then(crow =>{
                if(!crow){
                    message.reply(`${eRedeem} is not a valid code.`);
                }else{
                    if(crow.status == "Available"){
                        let eDate = moment().format('LLLL');
                        let tAmount = iUser.eventPoints + crow.amount;
                        sql.run(`UPDATE eventCodes SET redeemedBy='${message.author.username}', status='Used', date='${eDate}' WHERE guildID='${message.guild.id}' AND coupon='${eRedeem}'`);
                        sql.run(`UPDATE userScores SET eventPoints=${tAmount} WHERE guildID='${message.guild.id}' AND userID='${message.author.id}'`);
                        message.reply(`CONGRATS! You have redeemed ${eRedeem} for ${crow.amount} event points!`);
                    }else{
                        message.reply(`Sorry this has already been redemeed. Have a great day!`);
                    }
                }
            })
        }
    })
}
