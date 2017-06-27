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
        value: "**:?help** - Shows this help document \n**:?leaderboard** - shows leaderboards for server \n**:?rank** - shows rank on leaderboard \n**:?say** 'message' - Tell the bot what to say! \n**:?role** 'role name' - add a role to yourself (the roles must be setup in crole first!)"
      },
      {
        name: "Access Level 2 - Mods",
        value: "**:?announce** 'announcement' - You don't need to put the @everyone, it will add it automatically the owner(s) will be DM'd the announcement to approve."
      },
      {
        name: "Access Level 3 - Guild Owners",
        value: "**:?al** '@name' <number 1-3> - Giving someone access level default is 1 \n\n**:?setup** - sets up server settings on the bot \n\n**:?setup** welcome/leave/announce <channel name> - setting up channels for when people join, leave, and for announcements \n\n**:?crole** <name> - creates role and sets up for **:?role** <role name> (default is 1 - anyone can get these roles) \n\n**:?ann** approve/decline <id> - approve the announcement that a mod has submitted. (if you decline you must put a reason after the id) \n\n**:?rlevel** <level> <name of role> - user get's this role when they reach a level on the points system"
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