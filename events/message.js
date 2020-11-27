const mongoose = require('mongoose');
const Guild = require('../database/models/prefix');
const pr = require('../config/config.json');
const discord = require('discord.js');
const xptables = require('../database/models/xp');
const num = 150
const canva = require('canvacord');


module.exports = async (client) => {
    client.on("message", async function(message) {
        if(message.author.bot) return;
        if(message.channel.type == 'news') return;
        if(message.channel.type == 'dm') return;
        if(message.channel.id === '781503906903097354' || '781803035525513216' || '781503617621426186' || '781915829360656397' || '781522050892169256' || '781522488755748874' || '781522082831663116' || '781522133523365929' || '781522729455190057' || '781522601930391552') return; //my support server channel blacklist        

        const settings = await Guild.findOne({
            guildID: message.guild.id,
            guildName: message.guild.name
        });

        const prefix = settings.get('prefix');

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
            let diff = (user.level * num);
            let author = message.author
            let card = new canva.Rank()
            .setAvatar(author.displayAvatarURL({ dynamic: false, format: "png" }))
            .setUsername(author.username)
            .renderEmojis(true)
            .setDiscriminator(author.discriminator)
            .setCurrentXP(user.exp)
            .setRequiredXP(diff)
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
