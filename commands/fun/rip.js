const canvacord = require('canvacord');
const { MessageAttachment } = require('discord.js');


module.exports = {
    name: 'rip',
    category: 'Fun',
    description: 'Are you dying?',
    usage: 'f!rip',
    aliases: ['die'],
    run: async (client, message, args) => {

        const me = message.author;

        canvacord.Canvas.rip(me.displayAvatarURL({ dynamic: false, format: "png" })).then(buffer => {

            let att = new MessageAttachment(buffer, "die.png");
            message.channel.send(att);
        });
    }
}