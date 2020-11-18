const discord = require('discord.js');
const sendError = require('../../utils/error');
const Guild = require('../../database/models/prefix');

module.exports = {
    name: 'shuffle',
    description: 'Shufffle the queue',
    category: 'Music',
    usage: 'f!shuffle',
    run: async (client, message, args) => {

        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if(err) console.log(err);
        });

        if(!message.guild) return;
        const channel = message.member.voice.channel;
        if (!channel) return sendError("I'm sorry but you need to be in a voice channel to play music!", message.channel);
    

        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return sendError("There is nothing in queue.", message.channel);

        let songs = serverQueue.songs
        for (let i = songs.length - 1; i > 1; i--) {
            let j = 1 + Math.floor(Math.random() * i);
            [songs[i], songs[j]] = [songs[j], songs[i]];
        }

        serverQueue.songs = songs;

        message.client.queue.set(message.guild.id, serverQueue);

        let embed = new discord.MessageEmbed()
        .setColor('BLUE')
        .setAuthor("Shuffled the Queue!", 'https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif')
        .setFooter(`Current server volume is ${serverQueue.volume}`)
        .setDescription("Shuffled te queue...")

        if(serverQueue.songs.length === 1) embed.setDescription(`No songs. To play next add songs by \`${settings.prefix}play <song_name> | ${settings.prefix}play <song_link>\``)

        message.channel.send(embed);
    }
}