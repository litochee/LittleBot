const hEmbed = require('./../embeds/ehelp.js');
exports.run = (client, message, args, sql) =>{
  if(args == "role"){
    
  }else{
    hEmbed.helpEmbed(client, message, args, sql);
  }
}