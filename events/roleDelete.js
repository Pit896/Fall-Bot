const model = require('../database/models/roleDelete');
const { MessageEmbed } = require('discord.js');

module.exports = async (client) => {
    client.on('roleDelete', async role => {
        const settings = await model.findOne({
            guildID: role.guild.id,
            guildName: role.guild.id
        }, async (err, res) => {
            if(err) console.log(err);
            if(!res) {
                const NewRes = new model({
                    guildID: role.guild.id,
                    guildName: role.guild.id,
                    ChannelID: null
                });
                NewRes.save();
            }
        });

        const Channel = settings.ChannelID
        if(Channel === null) return;

        let embed = new MessageEmbed()
        .setFooter("Role ID " + role.id)
        .setTimestamp()
        .setColor("RED")
        .setDescription(`⚔**\`${role.name}\` has been a deleted!**`);

        client.channels.cache.get(settings.ChannelID).send(embed);
    });
}