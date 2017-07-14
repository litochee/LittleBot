var cc = require('coupon-code');
var moment = require('moment');
var isDigit = require('is_digit');
exports.run = (client, message, args, sql, Discord) =>{
    sql.get(`SELECT * FROM userScores WHERE guildID = '${message.guild.id}' AND userID = '${message.author.id}'`).then(iUser =>{ //gets user row of whos requesting
        if(iUser.AccessLevel > 2){
            if(!args[0]){
                message.reply("please set an amount and how many points it's worth. Ex. :?epoints 1 75");
                return;
            }else if(!isDigit(args[0])){
                message.reply("Only numbers are accepted.");
            }else if(!args[0] && !args[1]){
                message.reply("please set an amount and how many points it's worth. Ex. :?epoints 1 75");
            }else if(args[0] > 5){
                message.reply("Sorry, you can't make more than 5 codes at a time.");
                return;
            }else{
                let eMulti = args[0];
                let eAmount = args[1];
                let eDate = moment().format('LLLL');
                for(i = 0; i < eMulti; i++){
                    let eCode = cc.generate();
                    var toReq = toReq + "\n" + eCode;
                    sql.run(`INSERT INTO eventCodes (guildID, coupon, amount, date, status, madeBy) VALUES (?,?,?,?,?,?)`, [message.guild.id, eCode, eAmount, eDate, "Available", message.author.username]);

                }
                var toReq = toReq.slice(9);
                client.users.get(message.author.id).send(`${eMulti} codes\n ${toReq}`);
            }
        }else{
            message.reply("Sorry you don't have access to this command.");
        }

    })
}