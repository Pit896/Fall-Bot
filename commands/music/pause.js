const { MessageEmbed } = require('discord.js');
const sendError = require('../../utils/error');

module.exports = {
    name: 'pause',
    description: 'Pause the Song',
    category: 'Music',
    usage: 'f!pause',
    run: async (client, message, args) => {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (serverQueue && serverQueue.playing) {
          serverQueue.playing = false;
          serverQueue.connection.dispatcher.pause();
          let xd = new MessageEmbed()
          .setDescription("⏸ Paused the music for you!")
          .setColor("YELLOW")
          .setAuthor("Music has been paused!", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
          return message.channel.send(xd);
        }
        return sendError("There is nothing playing", message.channel);
    }
}