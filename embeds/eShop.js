module.exports.shopEmbed = function(client, message, iUser, sql, Discord) {
    var embed = new Discord.RichEmbed()
        .setTitle(user.username)
        .setDescription(`**Event Points:** ${iUser.eventPoints} \n**Level:** ${iUser.level} \n**Exp:** ${iUser.points} / ${iUser.nextPL}\n**Rank:** ${iUser.rank}`)
        .setColor(0x00AE86)
        .setThumbnail(user.avatarURL);

    message.channel.send({embed: embed});
}