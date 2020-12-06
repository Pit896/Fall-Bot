const fall = require('fall-guys-api-fixed');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "face",
    category: "Fall Guys",
    description: "Send you A face info",
    usage: "f!face <name_face>",
    aliases: ['f'],
    timeout: 1000,
    run: async (client, message, args) => {

        try {
            if(!args.join(" ")) return message.channel.send(`Unknow Search.`);

            const c = await fall.getFaces();
    
            let face = c.getFace(args.join(" "));
    
            let embed = new MessageEmbed()
            .setFooter(`Requested by | ${message.author.username}`, message.author.displayAvatarURL())
            .setThumbnail(face.img)
            .setColor("#ff00d4")
            .setTitle(face.name)
            .setURL(face.img)
            .addField("Rarity:", face.rarity)
            .addField("Acquire:", face.acquire)
    
            message.channel.send(embed);
        } catch {
            return message.channel.send("Invalid Face!").then(msg => msg.delete({ timeout: 5000 }));
        }
    }
}
