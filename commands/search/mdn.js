const request = require('node-superfetch');
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'mdn',
    category: 'Search',
    description: 'Search on Mozilla Developer Network',
    usage: 'f!mdn <query>',
    aliases: ['mozilla'],
    run: async (client, message, args) => {
        try {
            const query = args.join(" ");
            const {
              body
            } = await request
              .get('https://developer.mozilla.org/en-US/search.json')
              .query({
                q: query,
                locale: 'en-US',
                highlight: false
              });
            if (!body.documents.length) return message.channel.send('Could not find any results.');
            const data = body.documents[0];
            const embed = new MessageEmbed()
              .setColor('RANDOM')
              .setAuthor('Mozilla Developer Network', 'https://i.imgur.com/DFGXabG.png', 'https://developer.mozilla.org/')
              .setURL(data.url)
              .setTitle(data.title)
              .setDescription(data.excerpt);
            return message.channel.send(embed);
          } catch (err) {
            if (err.status === 404) return message.channel.send('Could not find any results.');
            console.log(err);
            return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }
    }
}