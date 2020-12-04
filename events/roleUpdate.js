const model = require('../database/models/roleUpdate');
const { MessageEmbed } = require('discord.js');

module.exports = async (client) => {
    client.on('roleUpdate', async (oldRole, newRole) => {
        const oldperms = oldRole.permissions.toArray().map(e => {
            const words = e.split("_").map(x => x[0] + x.slice(1).toLowerCase());
            return words.join(" ");
        }).join(",\n");

        const newperms = newRole.permissions.toArray().map(e => {
            const words = e.split("_").map(x => x[0] + x.slice(1).toLowerCase());
            return words.join(" ");
        }).join(",\n");
        
        const settings = await model.findOne({
            guildID: newRole.guild.id,
            guildName: newRole.guild.id
        }, async (err, res) => {
            if(err) console.log(err);
            if(!res) {
                const NewRes = new model({
                    guildID: newRole.guild.id,
                    guildName: newRole.guild.id,
                    ChannelID: null
                });
                NewRes.save();
            }
        });

        const Channel = settings.ChannelID
        if(Channel === null) return;

        let embed = new MessageEmbed()
        .setFooter("Role ID " + newRole.id)
        .setTimestamp()
        .setColor("RED")
        .setDescription(`✏**\`${newRole.name}\` has been a updated!**`)
        .addField('Hex Color:', `${oldRole.hexColor} **->** ${newRole.hexColor}`, true)
        .addField('Old Permissions:', `${oldperms}`, true)
        .addField('New Permissions:', `${newperms}`, true)
        .addField('Created at:', oldRole.createdAt, true)

        client.channels.cache.get(settings.ChannelID).send(embed);
    });
}