const { MessageEmbed } = require("discord.js");
const sendError = require("../../utils/error");

module.exports = {
    name: 'stop',
    category: 'Music',
    description: 'Stop the Music',
    usage: 'f!stop',
    run: async (client, message, args) => {
        const channel = message.member.voice.channel
        if (!channel)return sendError("You need to be in a voice channel to play music!", message.channel);
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue)return sendError("There is nothing playing that I could stop for you :(", message.channel);
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end("Stop the music");
        let embed = new MessageEmbed()
        .setColor('BLURPLE')
        .setDescription("Stopped the song 👍")
        .setTimestamp()
        .setAuthor("Stopped!")

        message.channel.send(embed);
    }
}