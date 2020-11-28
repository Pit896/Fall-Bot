const { MessageEmbed } = require('discord.js');
const sendError = require('../../utils/error');
const prefix = require('../../database/models/prefix');

module.exports = {
    name: `remove`,
    category: 'Music',
    description: `Remove song from the queue`,
    usage: `f!remove <Queue Number>`,
    run: async (client, message, args) => {
        const settings = await prefix.findOne({
            guildID: message.guild.id,
            guildName: message.guild.name
        });

        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return sendError(`There is no queue.`, message.channel).catch(async function (err) { console.log(err) });
        if (!args.length) return sendError(`Usage: ${settings.prefix}\`remove <Queue Number>\``);
        if (isNaN(args[0])) return sendError(`Usage: ${settings.prefix}\`remove <Queue Number>\``);

        const song = queue.songs.splice(args[0] - 1, 1);
        let embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`Removed: **\`${song[0].title}\`** from the queue.`);
        
        message.channel.send(embed);
    } 
}
