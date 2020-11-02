const fall = require('fallguys-api');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "store",
    category: "Fall Guys",
    description: "Send you the daily shop",
    usage: "f!store",
    aliases: ['shop'],
    run: async (client, message, args) => {
        

            const daily = await fall.getDaily();

            let page = 1
            let desc = [`**Name:** ${daily.pcStore[0].name}\n\n**Rarity:** ${daily.pcStore[0].rarity}\n\n**Price:** ${daily.pcStore[0].price} ${daily.pcStore[0].currency}`,
                        `**Name:** ${daily.pcStore[1].name}\n\n**Rarity:** ${daily.pcStore[1].rarity}\n\n**Price:** ${daily.pcStore[1].price} ${daily.pcStore[1].currency}`,
                        `**Name:** ${daily.pcStore[2].name}\n\n**Rarity:** ${daily.pcStore[2].rarity}\n\n**Price:** ${daily.pcStore[2].price} ${daily.pcStore[2].currency}`]

            let embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle("STORE FALL GUYS")
            .setTimestamp()
            .setDescription(desc[page-1])
            .setFooter(`Store | Page ${page} of ${desc.length} | If Double Item An is Upper and the second is the Lower`, message.author.displayAvatarURL());

            message.channel.send(embed).then(msg => {
                msg.react('⏪').catch(err => console.log(err))
                msg.react('⏩').catch(err => console.log(err))
                msg.react('❎').catch(err => console.log(err))
    
                let filter3 = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
                let filter1 = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
                let filter2 = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;
    
                let f = msg.createReactionCollector(filter1, { time: 1000000 })
                let f2 = msg.createReactionCollector(filter2, { time: 1000000 })
                let f3 = msg.createReactionCollector(filter3, { time: 1000000 })
    
                f.on('collect', r => {
                    if(page === 1) return;
                    page--;
                    embed.setDescription(desc[page-1])
                    embed.setFooter(`Store | Page ${page} of ${desc.length} | If Double Item An is Upper and the second is the Lower`, message.author.displayAvatarURL());
                    msg.edit(embed);
                });
    
                f2.on('collect', r => {
                    if(page === desc.length) return;
                    page++;
                    embed.setDescription(desc[page-1])
                    embed.setFooter(`Store | Page ${page} of ${desc.length} | If Double Item An is Upper and the second is the Lower`, message.author.displayAvatarURL());
                    msg.edit(embed);
                });
    
                f3.on('collect', r => {
                    msg.delete();
                });
            });
    }
}