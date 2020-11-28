const canvacord = require('canvacord');
const { MessageAttachment } = require('discord.js');


module.exports = {
    name: 'inverse',
    category: 'Fun',
    description: 'Ib]verse your AVATAR',
    usage: 'f!INVERSE',
    run: async (client, message, args) => {

        const me = message.author;

        canvacord.Canvas.invert(me.displayAvatarURL({ dynamic: false, format: "png" })).then(buffer => {

            let att = new MessageAttachment(buffer, "invert.png");
            message.channel.send(att);
        });
    }
}