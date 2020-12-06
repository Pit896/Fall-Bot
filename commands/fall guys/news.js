const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'news',
    category: 'Fall Guys',
    description: 'Send you the last Fall Guys news',
    usage: 'f!news',
    aliases: ['n'],
    timeout: 1000,
    run: async (client, message, args) => {

        let embed = new MessageEmbed()
        .setColor("#33cccc")
        .setURL("https://fallguys.com/news/season-2-5-drops-today")
        .setImage("https://www.pcinvasion.com/wp-content/uploads/2020/11/Fall-Guys-Big-Fans-update-800x400.jpg")
        .setAuthor("News", client.user.displayAvatarURL())
        .setTitle("Season 2.5 drops today!")
        .setDescription("After transporting players into the domain of medieval mayhem for Season 2, we’ve dived back in with a hefty order of round remixes, oodles of community-inspired improvements and the addition of all-new Round, ‘Big Fans’. Come meet the content that’ll keep things fresh and fun in the lead up to Season 3… \n*[Press Here For Read More](https://fallguys.com/news/season-2-5-drops-today)*")

        message.channel.send(embed);
    }
}
