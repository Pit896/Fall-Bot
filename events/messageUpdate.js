const { MessageEmbed } = require('discord.js');
const model = require('../database/models/updateModel');

module.exports = async (client) => {
    client.on('messageUpdate', async (oldMessage, newMessage) => {
        if(newMessage.author.bot) return;
        
        const settings = await model.findOne({
            guildID: newMessage.guild.id,
            guildName: newMessage.guild.id
        }, async (err, res) => {
            if(err) console.log(err);
            if(!res) {
                const NewRes = new model({
                    guildID: newMessage.guild.id,
                    guildName: newMessage.guild.id,
                    ChannelID: null
                });
                NewRes.save();
            }
        });

        const Channel = settings.ChannelID
        if(Channel === null) return;

        let embed = new MessageEmbed()
        .setFooter("User ID " + newMessage.author.id)
        .setTimestamp()
        .setColor("RED")
        .setAuthor(`${newMessage.author.tag}`, newMessage.author.displayAvatarURL({ dynamic: true }))
        .setThumbnail(newMessage.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`**🗯 ${newMessage.author.username} has edited a message in channel ${newMessage.channel}!**\n\n**- **${oldMessage.content} **->** ${newMessage.content}`);

        client.channels.cache.get(settings.ChannelID).send(embed);
    });  
}