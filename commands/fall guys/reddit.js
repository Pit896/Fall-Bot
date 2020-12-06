const image = require('imageapi.js');
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "post",
    category: "Fall Guys",
    description: "Send you a Random Subreddit of r/FallGuysGame",
    usage: "f!post",
    aliases: ['reddit'],
    timeout: 1000,
    run: async (client, message, args) => {

        let subreddit = 'FallGuysGame'
        let img = await image(subreddit);
        let embed = new MessageEmbed()
        .setColor("PINK")
        .setURL(`https://reddit.com/r/${subreddit}`)
        .setTitle("r/FallGuysGame Random Post")
        .setImage(img);

        message.channel.send(embed);
    }
}
