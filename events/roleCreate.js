const model = require('../database/models/roleCreate');
const { MessageEmbed } = require('discord.js');

module.exports = async (client) => {
    client.on('roleCreate', async role => {
        const perms = role.permissions.toArray().map(e => {
            const words = e.split("_").map(x => x[0] + x.slice(1).toLowerCase());
            return words.join(" ");
        }).join(",\n");
        
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
        .setDescription(`📑**\`${role.name}\` has been a created!**`)
        .addField('Hex Color:', `${role.hexColor}`, true)
        .addField('Permissions:', perms, true)
        .addField('Created at:', role.createdAt, true)

        client.channels.cache.get(settings.ChannelID).send(embed);
    });
}