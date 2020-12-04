const { MessageEmbed } = require('discord.js');
const model = require('../database/models/channlUpdate');

module.exports = async (client) => {
    client.on('channelUpdate', async (oldChannel, newChannel) => {
        const settings = await model.findOne({
            guildID: newChannel.guild.id,
            guildName: newChannel.guild.id
        }, async (err, res) => {
            if(err) console.log(err);
            if(!res) {
                const NewRes = new model({
                    guildID: newChannel.guild.id,
                    guildName: newChannel.guild.id,
                    ChannelID: null
                });
                NewRes.save();
            }
        });

        const Channel = settings.ChannelID
        if(Channel === null) return;

        let embed = new MessageEmbed()
        .setColor(`RED`)
        .setFooter("Channel ID " + newChannel.id)
        .setTimestamp()
        .setDescription(`**📔\`${newChannel.name}\` has been updated!**`)
        .addField("Created At:", oldChannel.createdAt)
        .addField("Edited at:", new Date);

        client.channels.cache.get(settings.ChannelID).send(embed);
    });
}