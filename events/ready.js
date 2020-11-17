module.exports = (client) => {
    client.on('ready', async () => {
        console.log(`${client.user.username} Ready!`);
        let memberCount = client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0)  
        client.user.setPresence({ activity: { name: `FallGuys Bot | f!help 1.0.1 | In ${client.guilds.cache.size} server and with ${memberCount} users`, type: 'STREAMING', url: 'https://www.twitch.tv/smash690' }});    
    });
    client.login(process.env.TOKEN);
}
   
