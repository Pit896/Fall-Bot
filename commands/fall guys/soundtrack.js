const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'sounds',
    category: 'Fall Guys',
    description: 'Send you all soundtrack of Fall Guys',
    usage: 'f!sounds',
    aliases: ['sound', 'soundtrack'],
    timeout: 1000,
    run: async (client, message, args) => {

        let pages = [`Everybody Falls (Fall Guys Theme)\n\n**Links:**\n${emoji("768537186139766814")}: [Press Me](https://www.youtube.com/watch?v=ys4rkcMbtjY)\n${emoji("771110229675868190")}: [Press Me](https://open.spotify.com/track/72uR0pYwXZM1jSsyk1YPlf)`, `Everybody Falls (To the Middle Ages)\n\n**Links:**\n${emoji("768537186139766814")}: [Press Me](https://www.youtube.com/watch?v=dF0F8NtLnmI)\n${emoji("771110229675868190")}: [Press Me](https://open.spotify.com/track/0a0tcOVJv6Fqd41EOtomd8)`, `Beans of The Round Table\n\n**Links:**\n${emoji("768537186139766814")}: [Press Me](https://www.youtube.com/watch?v=r0LnBf1YBxw)\n${emoji("771110229675868190")}: [Press Me](https://open.spotify.com/track/17ZNdNlzciqs30vAeKMY57)`, `Fall 'N' Roll\n\n**Links:**\n${emoji("768537186139766814")}: [Press Me](https://www.youtube.com/watch?v=LL70vTa0E2g)\n${emoji("771110229675868190")}: [Press Me](https://open.spotify.com/track/7LfyyDvMQCizrEtKZAdzBL)`, `Fall for the Queen Bean\n\n**Links:**\n${emoji("768537186139766814")}: [Press Me](https://www.youtube.com/watch?v=9_331Y9BFbI)\n${emoji("771110229675868190")}: [Press Me](https://open.spotify.com/track/5xMpr9HwE9nfdV3K1xE5Ig)`, `Survive The Fall\n\n**Links:**\n${emoji("768537186139766814")}: [Press Me](https://www.youtube.com/watch?v=h2TpZXnWVsw)\n${emoji("771110229675868190")}: [Press Me](https://open.spotify.com/track/3G4KJBcwXh2SuF4ubt2uBz)`, `Fall for The Team\n\n**Links:**\n${emoji("768537186139766814")}: [Press Me](https://www.youtube.com/watch?v=2F2OBxqnpU8)\n${emoji("771110229675868190")}: [Press Me](https://open.spotify.com/track/1pgX8ugWyMZ9tgBmLKY4ya)`, `Sir Falls-A-Lot (William Fell)\n\n**Links:**\n${emoji("768537186139766814")}: [Press Me](https://www.youtube.com/watch?v=3sVNVbx7ZQQ)\n${emoji("771110229675868190")}: [Press Me](https://open.spotify.com/track/4KOTyScW84sQI3ZWgTm3cq)`, `Final Fall\n\n**Links:**\n${emoji("768537186139766814")}: [Press Me](https://www.youtube.com/watch?v=qndGfHoXNYA)\n${emoji("771110229675868190")}: [Press Me](https://open.spotify.com/track/2jQw8Hjbt4CchgOTKFvBSa)`,`Didn't Fall! (You Win)\n\n**Links:**\n${emoji("768537186139766814")}: [Press Me](https://www.youtube.com/watch?v=CpeJiGDVMGo)\n${emoji("771110229675868190")}: [Press Me](https://open.spotify.com/track/6MrkLGHB9i5BWsrUNRzvb4)`]
        let page = 1

        let embed = new MessageEmbed()
        .setThumbnail("https://f4.bcbits.com/img/a1074507161_10.jpg")
        .setColor("#f50ac6")
        .setTitle("Fall Guys SoundTrack")
        .setDescription(pages[page-1])
        .setFooter(`SoundTrack ${page} of ${pages.length}`)

        message.channel.send(embed)
        .then(msg => {
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
                embed.setDescription(pages[page-1])
                embed.setFooter(`SoundTrack ${page} of ${pages.length}`)
                msg.edit(embed);
            });

            f2.on('collect', r => {
                if(page === pages.length) return;
                page++;
                embed.setDescription(pages[page-1])
                embed.setFooter(`SoundTrack ${page} of ${pages.length}`)
                msg.edit(embed);
            });

            f3.on('collect', r => {
                msg.delete();
            });
        });

        function emoji (id) {
            return client.emojis.cache.get(id).toString();
        }
    }
}
