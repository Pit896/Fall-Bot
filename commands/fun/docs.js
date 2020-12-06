const fetch = require('node-fetch');
const sendError = require('../../utils/error');

module.exports = {
    name: 'djs',
    description: 'Integrations with discord.js docs',
    category: 'Fun',
    usage: 'f!djs <somethings>',
    aliases: ['docs'],
    timeout: 1000,
    run: async (client, message, args) => {

        const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args.join(" "))}`;

        const docFetch = await fetch(url);
        const embed = await docFetch.json();

        if(!embed || embed.error) {
            return sendError("No Results Found!", message.channel);
        }

        if(!message.guild) {
            return message.channel.send({ embed });
        }

        const msg = await message.channel.send({ embed });

        msg.react('❌')
        .then(async m => {
            let react;

            try {
                react = await msg.awaitReactions(
                    (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id,
                    { max: 1, errors: ['time'] }
                )
            } catch {
                return;      
            }

            if(react && react.first()) {
                msg.delete();
                message.delete();
            }

            return message;
        });
    } 
}
