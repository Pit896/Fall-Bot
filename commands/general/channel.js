const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'channel-info',
    category: 'General',
    description: 'Send you a server channel info',
    usage: 'f!channel-info | f!channel-info <#channelname>',
    aliases: ['channel'],
    run: async (client, message, args) => {
        const channel = message.mentions.channels.first() || message.channel  
       
        const channelEmbed = new MessageEmbed()
                .setColor('#00E4FF')
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setTitle('Channel Info')
                .addField(':arrow_right: Name', channel.type === 'dm' ? `<@${channel.recipient.username}>` : channel.name, true)
                .addField(':arrow_right: ID', channel.id, true)
                .addField(':arrow_right: Creation Date', channel.createdAt.toDateString(), true)
                .addField(':arrow_right: NSFW', channel.nsfw ? 'Yes' : 'No', true)
                .addField(':arrow_right: Category', channel.parent ? channel.parent.name : 'None', true)
                .addField(':arrow_right: Topic', channel.topic || 'None', true);
     
        message.channel.send(channelEmbed);
    }
}
