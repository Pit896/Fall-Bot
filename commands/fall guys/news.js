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
        .setColor("#2783e6")
        .setURL("https://fallguys.com/news/season-3-theme-reveal-20-off-sale-golden-joysticks")
        .setImage("https://fallguys.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fvsmfukibxsuz%2F5k7tFPZGllG9xT3g5oXC5A%2Fcb75ec4f8bbcdb9b2fc73f9f303b366c%2FSeason3__1_.jpg&w=1200&q=75")
        .setAuthor("News", client.user.displayAvatarURL())
        .setTitle("Fall Guys Season 3 - Winter Knockout revealed!")
        .setDescription("The tenacity, inventiveness and puzzle-solving skills of the Fall Guys community have, of course, never been in doubt. But even we were shocked by the lightning pace players threw their collective will into solving __Operation #JigSawus__, revealing the icy cold aesthetic of Fall Guys Season 3 - Winter Knockout! But what in the Blunderdome is Operation #JigSawus..? Well, we decided to shatter some delightful Season 3 art into 300 pieces and spread them far and wide across the __digital plains__ of the Fall Guys fandom! Less than 24 hours later, the community had conquered our conundrum, piecing together the deeply chilly art work now before your eyes. Amazing. We are beyond excited to share more information on the wonders of Fall Guys Season 3 soon...and we strongly recommend tuning into __The Game Awards on December 10th..!__ But for now, please look forward to the slew of snowy shenanigans to come. And the penguin. Just look at that tiny, tiny penguin.\n*[Press Here For Read More](https://fallguys.com/news/season-3-theme-reveal-20-off-sale-golden-joysticks)*")

        message.channel.send(embed);
    }
}
