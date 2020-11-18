const lyric = require('lyrics-finder');
const { MessageEmbed } = require('discord.js');
const sendError = require('../../utils/error');


module.exports = {
    name: 'lyrics',
    description: 'Search song lyrics',
    category: 'Music',
    usage: 'f!lyrics',
    run: async (client, message, args) => {
        const queue = message.client.queue.get(message.guild.id);
        //If no Queue Error
        if (!queue) return sendError("There is nothing playing", message.channel);

        let lyrics = null;
        //define the temporary Embed
        let temEmbed = new MessageEmbed()
        .setAuthor("Searching...", "https://cdn.discordapp.com/emojis/757632044632375386.gif?v=1").setFooter("Lyrics")
        .setColor("#f300e5")
        //send it and safe it in a variable
        let result = await message.channel.send(temEmbed)
        //try to find lyrics
        try {
          //use lyricsfinder
          lyrics = await lyric(queue.songs[0].title,"");
          //If no Lyrics define no lyrics
          if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title}.`;
        }
        //catch any error
        catch (error) {
          lyrics = `No lyrics found for ${queue.songs[0].title}.`;
        }
        //define lyrics Embed
        let lyricsEmbed = new MessageEmbed()
          .setTitle("Lyrics")
          .setDescription(lyrics)
          .setColor("#f300e5")
        //if to long make slice it
        if (lyricsEmbed.description.length >= 2048)
          //slice the embed description and redefine it
          lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
          //edit to approve
        return result.edit(lyricsEmbed).catch(console.error);
    }
}