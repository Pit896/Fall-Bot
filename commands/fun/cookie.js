const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'cookie',
    category: 'Fun',
    description: 'Fortune cookie tip',
    usage: 'f!cookie',
    timeout: 1200,
    run: async (client, message, args) => {

        try {
            const res = await fetch('http://yerkee.com/api/fortune');
            const json = await res.json();
            const embed = new MessageEmbed()
              .setColor('RANDOM')
              .setTitle('Fortune Cookie')
              .setDescription(json.fortune);
            return message.channel.send(embed);
        } catch {
            message.channel.send('Couldn\' t obtain fortune cookie!');
        }
    }
}
