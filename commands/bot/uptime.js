const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: "uptime",
    category: "Bot",
    description: "Bot uptime",
    usage: "f!uptime",
    timeout: 2000,
    run: async (client, message, args) => {

        message.channel.send('Calculating Uptime...').then(m => m.delete({ timeout: 2000 }))
        .then(resultMessage => {
            const uptime = ms(client.uptime, { long: true })

            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`🖤Uptime: **${uptime}**`)


            message.channel.send(embed);
        });
    }
}
