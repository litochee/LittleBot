module.exports.shopEmbed = function(client, message, iUser, sql, Discord) {
    sql.all(`SELECT * FROM mShop WHERE guildID='${message.guild.id}' ORDER BY Price DESC`).then(cShop =>{
        let iName = cShop.map(z=>z.Name);
        let iPrice = cShop.map(y=>y.Price);
        let iDescription = cShop.map(x=>x.Description);
        
        var mShopOutp = iName.map(function(a,b){
            return['**'+iPrice[b]+'**' + ' ***' + a + '***'+ '\n' + iDescription[b]];
        })
        var mShopOut = mShopOutp.join("\n");

        var embed = new Discord.RichEmbed()
            .setTitle(`${message.guild.name}'s Shop`)
            .setDescription(`Use the **:?buy** command to buy anything here.`)
            .setColor(0x00AE86)
            .addField(`SHOP`, `${mShopOut}`, true)
            .setThumbnail(message.guild.iconURL);
        message.channel.send({embed: embed});

    })
}