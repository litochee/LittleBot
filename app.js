const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const sql = require('sqlite');
const checkRank = require('./functions/chRank.js');
sql.open(`./db/mainDB.sqlite`);
const config = require('./config.json');

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split('.')[0];

    client.on(eventName, (...args) => eventFunction.run(client, ...args, sql));
  });
});


client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) {
    //level system!
    // Ignore messages from non-text channels and dms
    if (message.channel.type !== 'text' || message.channel.type === 'dm') return;

    sql.get(`SELECT * FROM userScores WHERE guildID = ${message.guild.id} AND userID = ${message.author.id}`).then(row => {
      if (!row) { //can't find the row
        sql.run(`INSERT INTO userScores (guildID, userID, Username, points, nextPL, level, eventPoints, upin, rank, AccessLevel) VALUES (?,?,?,?,?,?,?,?,?,?)`, [message.guild.id, message.author.id, message.author.username, 1, 100, 0, 0, 0, 0, 1]); //creates user entry
      } else {//can find row
        if (message.channel.id === '317489450106093588') return; //this is for bot testing channel in nudles
        let curPoints = row.points + 1; //add + 1 points

        if (curPoints > row.nextPL) { //leveling up
          let nPLE = Math.floor(row.nextPL * 1.25); //calculates next points to level
          sql.run(`UPDATE userScores SET points = ${row.points + 1}, nextPL = ${nPLE}, level = ${row.level + 1}, username = '${message.author.username}' WHERE userID = ${message.author.id} AND guildID = ${message.guild.id}`); //updates the database
          let levelUp = row.level + 1; //levels up

          message.reply(`You've leveled up to level **${levelUp}**! Congrats!!`); //tell user they leveled up
        }

        checkRank.levelRank(message, sql);
        sql.run(`UPDATE userScores SET points = ${row.points + 1} WHERE userID ='${message.author.id}' AND guildID='${message.guild.id}'`); //updates points
        //SETS rank
        sql.all(`SELECT userID from userScores WHERE guildID='${message.guild.id}' ORDER BY points DESC`).then(rColumns => {
          const users = rColumns.map(r => r.userID); //array methods, THANK YOU EEVIE!!
          let i = 0;
          while (users[i]) {
            sql.run(`UPDATE userScores SET rank = ${i + 1} WHERE userID =${users[i]} AND guildID=${message.guild.id}`);
            i++;
          }

        });
        //END rank
      }
    }).catch(() => {
      sql.run(`CREATE TABLE IF NOT EXISTS userScores (guildID TEXT, userID TEXT, username TEXT, points INTEGER, nextPL INTEGER, level INTEGER, eventPoints INTEGER, upin INTEGER, rank INTEGER, AccessLevel INTEGER)`).then(() => { //creates TABLE
        sql.run(`INSERT INTO userScores (guildID, userID, Username, points, nextPL, level, eventPoints, upin, rank, AccessLevel) VALUES (?,?,?,?,?,?,?,?,?,?)`, [message.guild.id, message.author.id, message.author.username, 1, 100, 0, 0, 0, 0, 1]); //inserts to TABLE
      });
    });
  } else {

    let command = message.content.split(' ')[0];
    command = command.slice(config.prefix.length);

    let args = message.content.split(' ').slice(1);

    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args, sql, Discord);
    } catch (err) {
      return;
    }
  }

});

client.login(config.token);
