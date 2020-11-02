const fall = require('fallguys-api');
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "pattern",
    category: "Fall Guys",
    description: "Send you A pattern info",
    usage: "f!pattern <name_pattern>",
    aliases: ['p'],
    run: async (client, message, args) => {

        if(!args.join(" ")) return message.channel.send(`Unknow Search.`);

        const cb = await fall.getPatterns();

        let c = cb.getPattern(args.join(" "));

        let embed = new MessageEmbed()
        .setFooter(`Requested by | ${message.author.username}`, message.author.displayAvatarURL())
        .setThumbnail(c.img)
        .setColor("#ff00d4")
        .setTitle(c.name)
        .setURL(c.img)
        .addField("Rarity:", c.rarity)
        .addField("Acquire:", c.acquire)
        .addField("Season:", c.season)
        .addField("Tier:", c.tier)

        message.channel.send(embed);
    }
}