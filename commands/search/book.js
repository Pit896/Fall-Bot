const request = require('node-superfetch')
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'book',
    description: 'Search your favorite book',
    category: 'Search',
    usage: 'f!book <query>',
    aliases: ['books', 'booksearch'],
    timeout: 1400,
    run: async (client, message, args) => {
        if(message.channel.nsfw === false) {
            message.channel.send("This channel isn't Marked NSFW!");
        } else {

        try {
            let query = args.join(` `);
            if (!query) return message.channel.send(`Please enter something to search for.`);
            const { body } = await request
                .get('https://www.googleapis.com/books/v1/volumes')
                .query({
                    maxResults: 1,
                    q: query,
                    key: process.env.BOOK
                });
            if (!body) return message.channel.send(`Couldn't find that book.`);
            if (!body.items) return message.channel.send(`Couldn't find that book.`);
            let book = body.items[0].volumeInfo;
            const description = book.description;
            if (!description) return message.channel.send(`Couldn't find that book.`);
            const descriptionfix = description.substr(0, 600);
            let embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`${book.title}`)
                .addField(`Written by:`, book.authors)
                .addField(`Published by:`, book.publisher)
                .addField(`Page count:`, book.pageCount)
                .addField("Description", book.description ? descriptionfix : 'No description found.')
                .addField("Purchase link:", book.canonicalVolumeLink)
                .setThumbnail(book.imageLinks.thumbnail);
            message.channel.send(embed);
        } catch (err) {
            if (err.status === 404) return message.channel.send('Could not find any results.');
            console.log(err);
            return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }            
        }
    }
}
