exports.run = (client, message, args, sql) =>{
    sql.get(`SELECT * FROM userScores WHERE guildID = '${message.guild.id}' AND userID = '${message.author.id}'`).then(iUser =>{
        if(AccessLevel >= 2){
            const user = message.mentions.users.first();
            const amount = !!parseInt(args[1]) ? parseInt(args[2]) : parseInt(args[1]);
            if (!amount) return message.reply('Must specify an amount to delete!');
            if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
            message.channel.fetchMessages({
            limit: amount,
            }).then((messages) => {
            if (user) {
                const filterBy = user ? user.id : Client.user.id;
                messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
            }
            message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
            });
        }else{
            message.reply("Sorry you don't have permission");
        }

    })
}
