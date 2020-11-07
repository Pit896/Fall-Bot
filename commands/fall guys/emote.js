const fall = require('fall-guys-api-fixed');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "emote",
    category: "Fall Guys",
    description: "Send you An emote info",
    usage: "f!emote <name_emote>",
    aliases: ['e'],
    run: async (client, message, args) => {

        try {
            if(!args.join(" ")) return message.channel.send(`Unknow Search.`);

            const e = await fall.getEmotes();
    
            let emote = e.getEmote(args.join(" "));
    
            let embed = new MessageEmbed()
            .setFooter(`Requested by | ${message.author.username}`, message.author.displayAvatarURL())
            .setThumbnail(emote.img)
            .setColor("#ff00d4")
            .setTitle(emote.name)
            .setURL(emote.img)
            .addField("Rarity:", emote.rarity)
            .addField("Acquire:", emote.acquire)
    
            message.channel.send(embed);
        } catch {
            return message.channel.send("Invalid Emote!").then(msg => msg.delete({ timeout: 5000 }));
        }
    }
}
