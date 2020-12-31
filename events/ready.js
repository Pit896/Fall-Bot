const { token } = requre('../config/config.json')

module.exports = (client) => {
    client.on('ready', async function() {
        console.log(`${client.user.username} Ready!`);
//        let memberCount = client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0)  
//        client.user.setPresence({ activity: { name: `FallGuys Bot | f!help 1.1.0 | 🔮New Leveling System`, type: 'STREAMING', url: 'https://www.twitch.tv/smash690' }});    
          client.user.setPresence({ activity: { name: 'FallGuys Bot | f!help 1.1.1 or f!commands | New Logger System', type: 'LISTENING' }}); 
    });
    client.login(token);
}
   
