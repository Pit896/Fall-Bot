const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'news',
    category: 'Fall Guys',
    description: 'Send you the last Fall Guys news',
    usage: 'f!news',
    aliases: ['n'],
    run: async (client, message, args) => {

        let embed = new MessageEmbed()
        .setColor("#33cccc")
        .setURL("https://fallguys.com/news/season-2-out-now")
        .setImage("https://cdn.mos.cms.futurecdn.net/2eUcV2529hH4DtBjHAH2b9-970-80.jpg")
        .setAuthor("News", client.user.displayAvatarURL())
        .setTitle("Season 2 - OUT NOW!")
        .setDescription("We are absolutely delighted to invite you to Fall Guys Season 2, starting... **right now!** This time, it’s new Rounds in an old world, so prepare to get Medieval on them beans... To kick off Season 2, we’ve cooked up four fresh Rounds, oodles of on-trend costumes and a whole heap of community-focused changes for optimal stumbling fun (with even more to come!) So, dive across the drawbridge and enter our feudal fortress of medieval mayhem!\n*[Press Here For Read More](https://fallguys.com/news/season-2-out-now)*")

        message.channel.send(embed);
    }
}