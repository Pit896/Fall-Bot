const cheerio = require('cheerio')
const request = require('request')
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'imagfy',
    description: 'Search a photo in internet',
    category: 'Fun',
    usage: 'f!imagfy',
    aliases: ['imgfy'],
    run: async (client, message, args) => {
    
        image(message, args);

        async function image(message, args) {

            let query = args.join(" ");
            if(!query) return message.channel.send("Unknow Search.");
            if(query == 'Porn' || 'porn') return message.channel.send("This is NSFW!")
            if(query == 'Waifu' || 'waifu') return message.channel.send("This is NSFW!")
            if(query == 'Sexy' || 'sexy') return message.channel.send("This is NSFW!")
            if(query == 'XXX' || 'xxx') return message.channel.send("This is NSFW!")
            if(query == 'Sex' || 'sex') return message.channel.send("This is NSFW!")
            if(query == 'dick' || 'Dick') return message.channel.send("This is NSFW!")
            if(query == 'NSFW' || 'nsfw') return message.channel.send("This is NSFW!")
            if(query == 'Nsfw') return message.channel.send("This is NSFW!")
            if(query == 'Dick' || 'dick') return message.channel.send("This is NSFW!")

            const options = {
                url: "http://results.dogpile.com/serp?qc=images&q=" + query,
                method: "GET",
                headers: {
                    "Accept": "text/html",
                    "User-Agent": "Chrome"
                }
            }
            request(options, (error, response, responseBody) => {
                if(error) return;

                let $ = cheerio.load(responseBody);

                const links = $(".image a.link");

                const url = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

                if(!url.length) return message.channel.send("No Results Found");

                let embed = new MessageEmbed()
                .setColor("GREEN")
                .setURL(url[0])
                .setTimestamp()
                .setImage(url[0])
                .setDescription("**I Found This:**")
                .setAuthor(query)

                message.channel.send(embed);
            });
        }
    }
}