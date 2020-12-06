const canvacord = require('canvacord');
const { MessageAttachment } = require('discord.js');


module.exports = {
    name: 'triggered',
    category: 'Fun',
    description: 'Triggering (new verb [;)',
    usage: 'f!triggered',
    timeout: 1200,
    run: async (client, message, args) => {

        const me = message.author;

        let data = canvacord.Canvas.trigger(me.displayAvatarURL({ dynamic: false, format: "png" })).then(buffer => {

            let att = new MessageAttachment(buffer, "triggered.gif");
            message.channel.send(att)
        });
    }
}
