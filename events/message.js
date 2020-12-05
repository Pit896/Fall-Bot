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
        
        const prefix = 'f!';

        if(!message.content.startsWith(prefix)) return;
    
        if (!message.member) message.member = await message.guild.fetchMember(message);
    
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        
        if (cmd.length === 0) return;
          
        let command = client.commands.get(cmd);
    
        if (!command) command = client.commands.get(client.aliases.get(cmd));
    
        if (command) {
            if(command.timeout) {
                if(client.timeout.has(`${command.name}${message.author.id}`)) {
                    return message.channel.send(`**⚔ You are on Cooldown. You need to wait ${ms(client.timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}**`);
                }
                command.run(client, message, args);
                client.timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout);
                setTimeout(() => {
                    client.timeout.delete(`${command.name}${message.author.id}`);
                }, command.timeout);
            } else {
                command.run(client, message, args);
            }
        }
            
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
            .setBackground("IMAGE", "https://www.thegamesmachine.it/wp-content/uploads/2020/11/fall-guys-winter-update-1536x864.jpg")
            .setProgressBar(["#5161db", "#161617"], "GRADIENT")

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
