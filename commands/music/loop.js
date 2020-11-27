const { MessageEmbed } = require('discord.js');
const sendError = require('../../utils/error');
const prefix = require('../../database/models/prefix');

module.exports = {
    name: 'loop',
    description: 'Loop song',
    category: 'Music',
    usage: 'f!loop',
    run: async (client, message, args) => {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (serverQueue) {
             serverQueue.loop = !serverQueue.loop;
             return message.channel.send({
                 embed: {
                     color: "GREEN",
                     description: `🔁  **|**  Loop is **\`${serverQueue.loop === true ? "enabled" : "disabled"}\`**`
                 }
             });
         };
     return sendError("There is nothing playing in this server.", message.channel);
    }
}