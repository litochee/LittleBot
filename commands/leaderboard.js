exports.run = (client, message, args, sql) => {
  sql.all(`SELECT username, points, nextPL from userScores WHERE guildID=${message.guild.id} ORDER BY points DESC`).then(rLead=>{
    //console.log(rLead);
    const lBoardN = rLead.map(r=>r.username);
    const lBoardP = rLead.map(p=>p.points);
    const lBoardNPL = rLead.map(npl=>npl.nextPL);
    message.reply("```" + `***Leaderboards for ${message.guild.name}***\n 1. ${lBoardN[0]} ${lBoardP[0]}/${lBoardNPL[0]}\n 2. ${lBoardN[1]} ${lBoardP[1]}/${lBoardNPL[1]}\n 3. ${lBoardN[2]} ${lBoardP[2]}/${lBoardNPL[2]}\n 4. ${lBoardN[3]} ${lBoardP[3]}/${lBoardNPL[3]}\n 5. ${lBoardN[4]} ${lBoardP[4]}/${lBoardNPL[4]}` + "```");
  })
}
