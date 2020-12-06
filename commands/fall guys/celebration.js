const fall = require('fall-guys-api-fixed');
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "celebration",
    category: "Fall Guys",
    description: "Send you A celebration info",
    usage: "f!celebration <name_celebration>",
    aliases: ['cb'],
    timeout: 1000,
    run: async (client, message, args) => {

        if(!args.join(" ")) return message.channel.send(`Unknow Search.`);

        const cb = await fall.getCelebrations();

        let c = cb.getCelebration(args.join(" "));

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
