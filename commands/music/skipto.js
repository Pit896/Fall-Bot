const { MessageEmbed } = require('discord.js');
const sendError = require('../../utils/error');
const prefix = require('../../database/models/prefix');


module.exports = {
    name: 'skipto',
    description: 'Skip to a song in queue',
    category: 'Music',
    usage: 'f!skipto <number>',
    run: async (client, message, args) => {

        let settings = await prefix.findOne({
            guildID: message.guild.id,
            guildName: message.guild.name
        });

        if (!args.length || isNaN(args[0]))
        return message.channel.send({
                          embed: {
                              color: "GREEN",
                              description: `**Usage**: \`${settings.prefix}skipto <number>\``
                          }
     
                     }).catch(console.error);
          
  
      const queue = message.client.queue.get(message.guild.id);
      if (!queue) return sendError("There is no queue.",message.channel).catch(console.error);
      if (args[0] > queue.songs.length) return sendError(`The queue is only ${queue.songs.length} songs long!`,message.channel).catch(console.error);
      if(args[0] == 1) return sendError("Please specify a number above one");
  
      queue.playing = true;
  
      if (queue.loop) {
        for (let i = 0; i < args[0] - 2; i++) {
          queue.songs.push(queue.songs.shift());
        }
      } else {
        queue.songs = queue.songs.slice(args[0] - 2);
      }
       try{
      queue.connection.dispatcher.end();
        }catch (error) {
          queue.voiceChannel.leave()
          message.client.queue.delete(message.guild.id);
         return sendError(`:notes: The player has stopped and the queue has been cleared.: ${error}`, message.channel);
        }
      
      queue.textChannel.send({
                          embed: {
                              color: "GREEN",
                              description: `${message.author} ⏭ skipped \`${args[0] - 1}\` songs`
                          }
     
                     }).catch(console.error);
    }
}
