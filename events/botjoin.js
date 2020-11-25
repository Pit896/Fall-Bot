const discord = require('discord.js');
const Guild = require('../database/models/prefix');
const mongoose = require('mongoose');

module.exports = (client) => {
    client.on('guildCreate', async function(guild) {
        const settings = await Guild.create({
            _id: mongoose.Types.ObjectId(),
            guildID: guild.id,
            guildName: guild.name,
            prefix: "f!"
        }).then(console.log("Saved new Guild on The Database!"));

        let embed = new discord.MessageEmbed()
        .setThumbnail("https://static.wikia.nocookie.net/fallguysultimateknockout/images/6/62/Fall_Guys_Ultimate_Knockout_logo.png")
        .setTitle("Thanks for adding Me!")
        .setDescription(`Hey **${guild.name}**, thanks for adding me. My name's __**${client.user.username}**__! I'm a \`Fall Guys Tracker Bot\`, I get Info of the game \`Fall Guys\`. My default prefix is **f!**. Use f!help for more info of me. Enjoy Fun with me!`)
        .setFooter(`${client.user.username} join ${guild.name}`, client.user.avatarURL());
        guild.systemChannel.send(embed);
    });   
}