const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'kick',
    category: 'General',
    description: 'Kick a member from the server',
    usage: 'f!kick <member>',
    run: async (client, message, args) => {

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`You don't have \`KICK MEMBERS\` permission to do that!`)
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.channel.send("Please specify a member to kick.");

        try {
        let reason;
        reason = args.slice(1).join(" ") || 'None';

        let embed = new MessageEmbed()
        .setColor("RED")
        .setTitle("Kicked From Server: " + message.guild.name)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setAuthor(`Action: Kick by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Kicked **${member.user.username}** by **${message.author.username}**\nReason: ${reason}`)

        member.kick();
        message.channel.send(embed); 
        } catch {
             return message.channel.send(`I don't have permission to kick **${member.user.username}**`)  
        }
    }
}
