const hEmbed = require('./../embeds/eHelp.js');
const rEmbed = require('./../embeds/eRoles.js');
exports.run = (client, message, args, sql) =>{
  let hChoice = args[0];
  if (hChoice == "role"){
    rEmbed.roleEmbed(client, message, args, sql);
  }else{
    hEmbed.helpEmbed(client, message, args, sql);
  }
}