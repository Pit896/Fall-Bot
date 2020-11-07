const fall = require('fall-guys-api-fixed');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "achievements",
    category: "Fall Guys",
    description: "Send you An achievements info",
    usage: "f!achievements <name_achievements>",
    aliases: ['ac', 'a'],
    run: async (client, message, args) => {

        try {
            if(!args.join(" ")) return message.channel.send(`Unknow Search.`);

            const el = await fall.getAchievements();

            let e = await el.getAchievement(args[0]);
    
            let embed = new MessageEmbed()
            .setFooter(`Requested by | ${message.author.username}`, message.author.displayAvatarURL())
            .setThumbnail(e.icon)
            .setColor("#ff00d4")
            .setDescription(e.description)
            .setTitle(e.name)
            .setURL(e.icon)
    
            message.channel.send(embed);
        } catch {
            return message.channel.send("Invalid achievements!").then(msg => msg.delete({ timeout: 5000 }));
        }
    }
}
