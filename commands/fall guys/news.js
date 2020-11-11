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
        .setURL("https://fallguys.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fvsmfukibxsuz%2F64APhOAgN8SVexptauoYQL%2Fe3f0f3f4f3a9b620cfb605907ee1917b%2FBig_Fans1.png")
        .setImage("https://cdn.mos.cms.futurecdn.net/2eUcV2529hH4DtBjHAH2b9-970-80.jpg")
        .setAuthor("News", client.user.displayAvatarURL())
        .setTitle("Season 2.5 drops today!")
        .setDescription("After transporting players into the domain of medieval mayhem for Season 2, we’ve dived back in with a hefty order of round remixes, oodles of community-inspired improvements and the addition of all-new Round, ‘Big Fans’. Come meet the content that’ll keep things fresh and fun in the lead up to Season 3… \n*[Press Here For Read More](https://fallguys.com/news/season-2-5-drops-today)*")

        message.channel.send(embed);
    }
}
