const Guild = require('../database/models/prefix.js');

module.exports = (client) => {
       client.on('ready', async () => {
        
       const settings = await Guild.findOne({
           guildID: message.guild.id
       }, (err, guild) => {
           if(err) console.log(err);
       });
           
        console.log(`${client.user.username} Ready!`);
        let memberCount = client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0)
        client.user.setActivity(`FallGuys Bot | ${settings.prefix} 1.0.1 | In ${client.guilds.cache.size} server and with ${memberCount} users`, {
            type: 'PLAYING'
        });
    });

    client.login(process.env.TOKEN);
}
