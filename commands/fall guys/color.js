const fall = require('fall-guys-api-fixed');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "color",
    category: "Fall Guys",
    description: "Send you A color info",
    usage: "f!color <name_color>",
    aliases: ['c'],
    timeout: 1000,
    run: async (client, message, args) => {

        if(!args.join(" ")) return message.channel.send(`Unknow Search.`);

        const c = await fall.getColors();

        let color = c.getColor(args.join(" "));

        let embed = new MessageEmbed()
        .setFooter(`Requested by | ${message.author.username}`, message.author.displayAvatarURL())
        .setThumbnail(color.img)
        .setColor("#ff00d4")
        .setTitle(color.name)
        .setURL(color.img)
        .addField("Rarity:", color.rarity)
        .addField("Acquire:", color.acquire)
        .addField("Season:", color.season)
        .addField("Tier:", color.tier)

        message.channel.send(embed);
    }
}
