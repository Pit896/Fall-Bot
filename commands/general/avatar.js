const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    desription: 'Send you the member mentioned avatar',
    category: 'General',
    usage: 'f!avatar | f!avatar <member>',
    run: async (client, message, args) => {

        const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]) || message.member;
        const target = member.author;

        let embed = new MessageEmbed()
        .setColor(member.displayHexColor || "GREEN")
        .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setDescription(`[Link to Avatar](${member.user.displayAvatarURL()})`)
        .setURL(member.user.displayAvatarURL())
        .setTitle(`${member.user.tag} Avatar`);

        message.channel.send(embed)

    }
}