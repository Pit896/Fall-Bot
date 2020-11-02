const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'about',
    category: 'Bot',
    description: 'Send you all info about me',
    usage: 'f!about',
    run: async (client, message, args) => {

        let embed = new MessageEmbed()
        .setThumbnail("https://static.wikia.nocookie.net/fallguysultimateknockout/images/6/62/Fall_Guys_Ultimate_Knockout_logo.png")
        .setTitle("Thank for using me!")
        .setDescription(`Hey **${message.author}**. My name's __**${client.user.username}**__! I'm a \`Fall Guys Tracker Bot\`, I get Info of the game \`Fall Guys\`. My default prefix is **f!**. Use f!help for more info of me. Enjoy Fun with me!`)
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL());
        message.channel.send(embed);

    }
}