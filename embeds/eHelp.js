module.exports.helpEmbed = function(client, message, args, sql) {
    message.author.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Little bot - Help Document",
    description: "This will show you what little bot can do! When using commands, you don't need to use the quotes Ex. :?say hello, how are you",
    fields: [{
        name: "Acess Level 1 - All users",
        value: "**:?profile** - View your profile! \n**:?help** - Shows this help document \n**:?leaderboard** - shows leaderboards for server \n**:?rank** - shows rank on leaderboard \n**:?say** 'message' - Tell the bot what to say! \n**:?role** 'role name' - add a role to yourself (the roles must be setup in crole first!)"
      },
      {
        name: "Access Level 2 - Mods",
        value: "None Yet"
      },
      {
        name: "Access Level 3 - Guild Owners",
        value: "**:?al** '@name' <number 1-3> - Giving someone access level default is 1 \n\n**:?setup** - sets up server settings on the bot (do setup view to see the setup) \n\n**:?setup** welcome/leave <channel name> - setting up channels for when people join, leave\n\n**:?crole** <name> - creates role and sets up for **:?role** <role name> (default is 1 - anyone can get these roles) \n\n**:?rlevel** <add/remove> <level> <name of role> - add or remove roles when they reach a level on the points system\n\n**:?stat** - get stats of all servers littlebot is running on.\n**:?drole** <name of role> - delete from roles db (people can't get with :?role)\n**:?arole** <name of role> - add's role to use for :?role."
      },
      {
        name: "Want this bot in your server?",
        value: "[**Click Here**](https://discordapp.com/oauth2/authorize?permissions=1610087633&scope=bot&client_id=318300462703181824)"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Litochee"
    }
  }
  });

}