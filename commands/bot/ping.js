const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "ping",
    category: "Fun",
    description: "Bot latency",
    usage: "f!ping",
    run: async (client, message, args) => {

        message.channel.send('Calculating Latency...').then(m => m.delete({ timeout: 2000 }))
        .then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp

            let embed = new MessageEmbed()
            .setDescription(`Bot Ping: **${ping}**ms\n\nAPI Ping: **${client.ws.ping}**ms`)
            .setColor('RANDOM');

            message.channel.send(embed);
        });
    }
}
