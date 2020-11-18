const sendError = require('../../utils/error');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'np',
    description: 'Send you the now playing song',
    catgory: 'Music',
    usage: 'f!np',
    aliases: ['nowplaying'],
    run: async (client, message, args) => {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return sendError("There is nothing playing in this server.", message.channel);
        let song = serverQueue.songs[0]
        let thing = new MessageEmbed()
          .setAuthor("Now Playing", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
          .setThumbnail(song.img)
          .setColor("BLUE")
          .addField("Name", song.title, true)
          .addField("Duration", song.duration, true)
          .addField("Requested by", song.req.tag, true)
          .addField("Text Channel", serverQueue.textChannel, true)
          .addField("Voice Channel", "**" + serverQueue.voiceChannel.name + "**", true)
          .setFooter(`Views: ${song.views} | ${song.ago}`)
        return message.channel.send(thing)
    }
}