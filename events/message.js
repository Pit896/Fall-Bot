const mongoose = require('mongoose');
const Guild = require('../database/models/prefix');
const discord = require('discord.js');
const fall = require('fall-guys-api-fixed');
const xptables = require('../database/models/xp');
const num = 150
const canva = require('canvacord');

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

                return message.channel.send(`Please Retype the Command. You are now saved in our Database`).then(m => m.delete({ timeout: 5000 }));

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
        
        let user = await xptables.findOne({
            serverID: message.guild.id,
            userID: message.author.id
        });

        if(message.content.startsWith(prefix + "rank")) {
            let nextLevelXP1 = user.level * num;
            let author = message.author
            let card = new canva.Rank()
            .setAvatar(author.displayAvatarURL({ dynamic: false, format: "png" }))
            .renderEmojis(true)            
            .setUsername(author.username)
            .setDiscriminator(author.discriminator)
            .setCurrentXP(user.exp)
            .setRequiredXP(nextLevelXP1)
            .setStatus(author.presence.status)
            .setLevel(user.level)
            .setBackground("IMAGE", "https://cdn.mos.cms.futurecdn.net/2eUcV2529hH4DtBjHAH2b9-970-80.jpg")
            .setProgressBar(["#ed099a", "#1c1c1f"], "GRADIENT")

            card.build()
                .then(data => {
                    let att = new discord.MessageAttachment(data, "rank.png");
                    message.channel.send(att);
                });
        }

        let amount = Math.ceil(Math.random() * 50) + 1;
        if(!user) {
            await new xptables({
                serverID: message.guild.id,
                userID: message.author.id,
                exp: amount,
                level: 1
            }).save().catch(err => console.log(err));
        } else {
            let nextLevelXP = user.level * num;
            if(user.exp >= nextLevelXP) {
                user.level = user.level- + -1;
                user.exp = 0;
                user.save();
                message.channel.send(`Wow ${message.author}! You get the level **${user.level}**:tada:`);
            } else {
                user.exp = user.exp- + -amount;
                user.save();
            }
        } 
   });   
}
