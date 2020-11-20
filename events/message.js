const mongoose = require('mongoose');
const Guild = require('../database/models/prefix');
const discord = require('discord.js');
const fall = require('fall-guys-api-fixed');

module.exports = async (client) => {
    client.on("message", async message => {
        if(message.author.bot) return;
        if(message.channel.type == 'news') return;
        if(message.channel.type == 'dm') return;

        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if(err) console.log(err);
            if(!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.prefix
                });

                newGuild.save()
                .then(res => console.log(res))
                .catch(err => console.log(err));

                return message.channel.send(`Please Retype the Command`).then(m => m.delete({ timeout: 5000 }));

            }
        });

        const prefix = settings.prefix;

        if(!message.content.startsWith(prefix)) return;
    
        if (!message.member) message.member = await message.guild.fetchMember(message);
    
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        
        if (cmd.length === 0) return;
        
    
        let command = client.commands.get(cmd);
    
        if (!command) command = client.commands.get(client.aliases.get(cmd));
    
        if (command) 
            command.run(client, message, args);        
      
            function emoji (id) {
                return client.emojis.cache.get(id).toString();
            }
        });
}
