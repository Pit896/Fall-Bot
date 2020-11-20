const { MessageEmbed } = require('discord.js');
const sendError = require('../../utils/error');


module.exports = {
    name: 'loop',
    category: 'Music',
    description: 'Loop track',
    usage: 'f!loop',
    run: async (client, message, args) => {

        const serverQueue = message.client.queue.get(message.guild.id);

        if(!serverQueue) return sendError("There's nothing playing.");
        const channel = message.member.voice.channel;
        if (!channel)return sendError("I'm sorry but you need to be in a voice channel to loop music!", message.channel);

        serverQueue.loop = !serverQueue.loop;

        let embed = new MessageEmbed()
        .setAuthor("Looped the Song!", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
        .setDescription(`I have ${serverQueue.loop ? "**Enabled**" : "**Disabled**"} loop.`);

        serverQueue.textChannel.send(embed);
    }
}