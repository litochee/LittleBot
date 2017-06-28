module.exports.roleEmbed = function(client, message, args, sql) {
sql.all(`SELECT RoleName FROM mRoles WHERE GuildID='${message.guild.id}'`).then(prRole =>{
    let aRoles = prRole.map(z=>z.RoleName);
    message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Roles",
    description: "List of Roles you can assign yourseld with the :?role <role name> command!",
    fields: [{
        name: "Roles",
        value: `${aRoles.join("\n")}`
      },
      {
        name: "How to use",
        value: "Example: :?role top\n**note** these roles are case sensitive!"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Example"
    }
  }
});

});

}