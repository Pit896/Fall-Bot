const { MessageEmbed } = require('discord.js');
const sendError = require('../../utils/error');


module.exports = {
    name: 'loop',
    category: 'Music',
    description: 'Loop the song',
    usage: 'f!loop',
    run: async (client, message, args) => {

        const serverQueue = message.client.queue.get(message.guild.id);
        const channel = message.member.voice.channel;
        if (!channel) return sendError("You need to be in a voice channel to play music!", message.channel);

        if(!serverQueue) return sendError("There's nothing playing!", message.channel);

        serverQueue.loop = !serverQueue.loop;
    
        const loopembed = new MessageEmbed()
        .setColor(serverQueue.loop ? "#c219d8" : "#ff0e7a")
        .setAuthor(`Loop is now ${serverQueue.loop ? " enabled" : " disabled"}`, "https://cdn.discordapp.com/emojis/769913064194834511.png")

        serverQueue.textChannel.send(loopembed);
    }
}