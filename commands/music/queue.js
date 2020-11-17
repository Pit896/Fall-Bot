const { MessageEmbed } = require("discord.js");
const sendError = require("../../utils/error");
const Guild = require('../../database/models/prefix');


module.exports = {
    name: 'queue',
    description: 'Send you all song in queue',
    category: 'Music',
    usage: 'f!queue',
    run: async (client, message, args) => {

        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if(err) console.log(err);
        });

        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return sendError("There is nothing playing.", message.channel);
    
        let queue = new MessageEmbed()
        .setAuthor("Server Songs Queue", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
        .setColor("BLUE")
        .addField("Now Playing", serverQueue.songs[0].title, true)
        .addField("Text Channel", serverQueue.textChannel, true)
        .addField("Voice Channel", "**" + serverQueue.voiceChannel.name + "**", true)
        .setDescription(serverQueue.songs.map((song) => {
          if(song === serverQueue.songs[0])return
          return `**-** ${song.title}`
        }).join("\n"))
        .setFooter("Currently Server Volume is "+serverQueue.volume)
        if(serverQueue.songs.length === 1)queue.setDescription(`No songs. To play next add songs by \`${settings.prefix}play <song_name>\``)
        message.channel.send(queue)
    }
}