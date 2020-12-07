const discord = require('discord.js');
const os = require('os');

module.exports = {
    name: 'botinfo',
    description: 'See info about FallGuys Bot',
    category: 'Bot',
    usage: 'f!botinfo',
    run: async (client, message, args) => {

        let servercount = client.guilds.cache.size;
        let usercount = client.users.cache.size;
        let arch = os.arch();
        let discordV = discord.version
        let shards = client.ws.shards.size
        let nodeV = process.version
        let cores = os.cpus().length;


        let embed = new discord.MessageEmbed()
        .setColor('#0000')
        .setTitle(`${client.user.username} Info`)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .addField("🖥Server Count:", servercount, true)
        .addField("👪Users Count:", usercount, true)
        .addField("⚒Architecture:", arch, true)
        .addField("🗡Discord.js Version:", discordV, true)
        .addField("⌨️Node.js Version", nodeV, true)
        .addField("📡Shards Count:", shards, true)
        .addField("💕Cores Count:", cores, true);

        message.channel.send(embed);
    }
}