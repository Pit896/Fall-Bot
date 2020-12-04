const { MessageEmbed } = require('discord.js');
const model = require('../database/models/channelCreate');

module.exports = async (client) => {
    client.on('channelCreate', async channel => {
        const settings = await model.findOne({
            guildID: channel.guild.id,
            guildName: channel.guild.id
        }, async (err, res) => {
            if(err) console.log(err);
            if(!res) {
                const NewRes = new model({
                    guildID: channel.guild.id,
                    guildName: channel.guild.id,
                    ChannelID: null
                });
                NewRes.save();
            }
        });

        const Channel = settings.ChannelID
        if(Channel === null) return;

        let embed = new MessageEmbed()
        .setColor(`BLUE`)
        .setFooter("Channel ID " + channel.id)
        .setTimestamp()
        .setDescription(`**⚔\`${channel.name}\` has been created!**`)
        .addField('Type:', channel.type)
        .addField('Created At:', channel.createdAt)

        client.channels.cache.get(settings.ChannelID).send(embed);
    });
}