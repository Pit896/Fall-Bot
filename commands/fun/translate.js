const { MessageEmbed } = require('discord.js');
const translate = require('@k3rn31p4nic/google-translate-api');
const sendError = require('../../utils/error');


module.exports = {
    name: 'translate',
    category: 'Fun',
    description: 'Translate something...',
    usgae: 'f!translate <language> <text>',
    run: async (client, message, args) => {

        let lang = args[0]
        let txt = args.slice(1).join(" ");

        if(!lang) {
            return sendError("No Language provided!", message.channel);
        }

        if(lang.length !== 2) {
            return sendError("Language must be 2 letter alias. E.g. English > en", message.channel)
        }

        if(!txt) {
            return sendError("No text provided!", message.channel);
        }

        let result = await translate(txt, { to: lang });
        let embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(result.text)
        .setAuthor("Translater", "https://cdn.slashgear.com/wp-content/uploads/2020/02/google_translate_main-1280x720.jpg");

        message.channel.send(embed);
    }
}