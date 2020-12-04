const { MessageEmbed } = require('discord.js');
const model = require('../database/models/deleteModel');


module.exports = async (client) => {
    client.on('messageDelete', async (message) => {
        if(message.author.bot) return;

        const settings = await model.findOne({
            guildID: message.guild.id,
            guildName: message.guild.id
        }, async (err, res) => {
            if(err) console.log(err);
            if(!res) {
                const NewRes = new model({
                    guildID: message.guild.id,
                    guildName: message.guild.id,
                    ChannelID: null
                });
                NewRes.save();
            }
        });

        const Channel = settings.ChannelID
        if(Channel === null) return;

        let embed = new MessageEmbed()
        .setFooter("User ID " + message.author.id)
        .setTimestamp()
        .setColor("RED")
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`**🗑 ${message.author.username} has deleted a message in ${message.channel}!\n\n-** ${message.content}`);

        client.channels.cache.get(settings.ChannelID).send(embed);
    });
}