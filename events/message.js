const mongoose = require('mongoose');
const xptables = require('../database/models/users');
const num = 150
const Guild = require('../database/models/prefix');
const discord = require('discord.js');
const fall = require('fall-guys-api-fixed');

module.exports = async (client) => {
    client.on("message", async message => {
        if(message.author.bot) return;
        if(message.channel.type == 'news') return;

        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if(err) console.log(err);
            if(!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: procees.env.prefix
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

            let amount = Math.ceil(Math.random() * 16);     

            let user = await xptables.findOne({
                serverID: message.guild.id,
                userID: message.author.id
            });

            if(message.content.startsWith(prefix + 'tier')) {
                let embed = new discord.MessageEmbed()
                .setTitle(`${message.author.username}#${message.author.discriminator} Tier Card`)
                .setAuthor("Season 1")
                .setColor('RED')
                .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                if(user) {
                    let diff = (user.level * num) - user.exp;
                    embed
                    .addField(`Tier ${emoji("770670042060161074")}`, user.level)
                    .addField(`XP`, user.exp)
                    .setFooter(`Missing ${diff} XP for get the next Tier.`, message.author.displayAvatarURL({dynamic: true}))
                } else {
                    embed
                    .addField(`Tier ${emoji("770670042060161074")}`, "1")
                    .addField(`XP`, "0")
                    .setFooter(`Missing ${num} XP for get the next Tier.`, message.author.displayAvatarURL({dynamic: true}))                   
                }
                message.channel.send(embed);
            }
    
            if(!user) {
                await new xptables({
                    serverID: message.guild.id,
                    userID: message.author.id,
                    exp: amount,
                    level: 1
                }).save();
            } else {
                let nextlevelxp = user.level * num;
                if(user.exp >= nextlevelxp) {
                    user.level = user.level- + -1;
                    user.exp = 0;
                    user.save();
                    let embed = new discord.MessageEmbed()
                    .setColor('BLUE')
                    .setThumbnail()
                    .setTimestamp("https://miro.medium.com/max/700/1*ULyYA9TQ64rYrlMVxAuLiw.jpg")
                    .setTitle("🌠 CONGRATULATION 🌠")
                    .setFooter(`Reached level ${user.level}!`)
                    .setDescription(`Congratulations. You have reached level **${user.level}**\nCan you get level ${user.level + 1}?`);
    
                    message.channel.send(embed);
                } else {
                    user.exp = user.exp- + -amount;
                    user.save();
                }
            }
            function emoji (id) {
                return client.emojis.cache.get(id).toString();
            }
    });
}
