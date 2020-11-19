const { MessageEmbed } = require('discord.js');
const sendError = require('../../utils/error');
const search = require('yt-search');


module.exports = {
    name: 'search',
    category: 'Search song to play on youtube',
    category: 'Music',
    usage: 'f!search <song_name>',
    run: async (client, message, args) => {

        const query = args.join(" ");
        const r = await search(query);

        const videos = r.videos.slice(0, 1);
        if(!videos) return sendError("No Results Found!", message.channel);
        videos.forEach(v => {
            let views = String(v.views).padStart(10, ' ');
            let embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setThumbnail(v.thumbnail)
            .setTitle(v.title)
            .setAuthor(v.author.name)
            .addField(`Video Link`, `[Link](${v.url})`, true)
            .addField("Duration:", v.timestamp, true)
            .addField("Ago:", v.ago, true)
            .setDescription(v.description)
            .setFooter(`Views ${views} | Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))

            message.channel.send(embed).then(msg => {
                msg.react('▶').catch(err => console.log(err));

                let filter = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;

                let f = msg.createReactionCollector(filter);

                f.videos = v;

                f.on('collect', r => {
                    const file = require('./play');
                    file.run(client, message, [f.videos.url])
                });
            });
        });
    }
}