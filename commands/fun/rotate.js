const canvacord = require('canvacord');
const { MessageAttachment } = require('discord.js');


module.exports = {
    name: 'wasted',
    category: 'Fun',
    description: 'Wastering (new verb [;)',
    usage: 'f!wasted',
    timeout: 1100,
    run: async (client, message, args) => {

        const me = message.author;

        canvacord.Canvas.wasted(me.displayAvatarURL({ dynamic: false, format: "png" })).then(buffer => {

            let att = new MessageAttachment(buffer, "wasted.png");
            message.channel.send(att);
        });
    }
}
