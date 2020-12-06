const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "dlc",
    category: "Fall Guys",
    description: "Send you all Fall Guys DLC",
    usage: "f!dlc",
    aliases: ['DLC'],
    timeout: 1000,
    run: async (client, message, args) => {

        let pages = ['Dress your Fall Guy in all manners of fantastical costume combinations with this set and gain a discounted 10,000 Kudos to boot! Kudos is an in-game currency you can use to buy in-game items that customise different aspects of your Fall Guy, such as costumes, colours and patterns! This pack gives you 10,000 Kudos! Fall Guys game is required. Kudos is limited by user-account and platform.',
                    'Fall Guys like their food as fast as they are! This Costume pack includes the latest in Fall Guys Fast Food Fashion, including Burger, Fries, and Slushie costumes! Fall Guys game is required. ',
                     'Re-enact the most infamous Medieval Quest of all time with the Dragon Hugger Costume Pack! This pack comes with the Knight, Wizard and Dragon costumes, but you can mix and match in any way you please! ']
        let thumb = ['https://cdn.cloudflare.steamstatic.com/steam/apps/1343612/ss_56db6667224e150923bb20e7af2e06472217cb1b.1920x1080.jpg',
                    'https://cdn.cloudflare.steamstatic.com/steam/apps/1362660/ss_3a845b5f02339d3a2f3680a524861d6f34159edb.1920x1080.jpg',
                    'https://cdn.cloudflare.steamstatic.com/steam/apps/1426910/ss_b042593f344a54ff9c98f67a31913c9deae7da97.1920x1080.jpg']
        let name = ['Fall Guys - Collectors Pack', 'Fall Guys - Fast Food Costume Pack', 'Fall Guys - Dragon Hugger Pack']
        let page = 1

        let embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(name[page-1])
        .setFooter(`DLC Page ${page} of ${pages.length}`)
        .setThumbnail(thumb[page-1])
        .setAuthor("DLCs")
        .setDescription(pages[page-1])
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
                embed.setThumbnail(thumb[page-1])
                embed.setTitle(name[page-1])
                embed.setFooter(`DLC Page ${page} of ${pages.length}`)
                msg.edit(embed);
            });

            f2.on('collect', r => {
                if(page === pages.length) return;
                page++;
                embed.setDescription(pages[page-1])
                embed.setThumbnail(thumb[page-1])
                embed.setTitle(name[page-1])
                embed.setFooter(`DLC Page ${page} of ${pages.length}`)
                msg.edit(embed);
            });

            f3.on('collect', r => {
                msg.delete();
            });
        });
    }
}
