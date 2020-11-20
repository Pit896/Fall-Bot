const { MessageEmbed } = require('discord.js');
const sendError = require('../../utils/error');

module.exports = {
    name: 'volume',
    description: 'Set the music volume',
    category: 'Music',
    usage: 'volume <1/10>',
    run: async (client, message, args) => {
        if(!args[0]) return sendError("Please specify the volume", message.channel);
        if(args[0] > 10) return sendError("Please a number between 1 and 10", message.channel);
        if(args[0] < 0) return sendError("Please a number between 1 and 10", message.channel);

        const channel = message.member.voice.channel;
        if (!channel)return sendError("You need to be in a voice channel to set volume!", message.channel);
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return sendError("There is nothing playing.", message.channel);
        if (!args[0])return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
        serverQueue.volume = args[0]; 
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
        let xd = new MessageEmbed()
        .setDescription(`I set the volume to: **${args[0]}/10**`)
        .setAuthor("Server Volume Manager", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
        .setColor("BLUE")
        return message.channel.send(xd);
    }
}
