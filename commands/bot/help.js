const { MessageEmbed } = require('discord.js');
const prefix = require('../../database/models/prefix');
const { readdirSync } = require('fs')

module.exports = {
    name: 'help',
    description: 'FallGuys Bot help',
    category: 'Bot',
    usage: 'f!help',
    run: async (client, message, args) => {

        const settings = await prefix.findOne({
            guildID: message.guild.id,
            guildName: message.guild.name
        });

        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

        if(!args[0]) {
            let embed = new MessageEmbed()
            .setTitle(`${client.user.username} Help Categories`)
            .setColor(roleColor)
            .setFooter("Requested by " + message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp(Date.now())
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addField("🤖Bot", `\`${settings.prefix}help bot\``, true)
            .addField(`${emoji("772488751045541889")}Fall Guys`, `\`${settings.prefix}help fallguys\``, true)
            .addField("😄Fun", `\`${settings.prefix}help fun\``, true)
            .addField("🛠General", `\`${settings.prefix}help general\``, true)
            .addField("🛑Owner", `\`${settings.prefix}help owner\``, true)
            .addField("🔎Search", `\`${settings.prefix}help search\``, true);

            message.channel.send(embed)
        } else if(args[0] == 'bot') {
            let botembed = new MessageEmbed()
            .setTitle("🤖Bot Category Help")
            .setDescription("`about` **|** `commands` **|** `help` **|** `ping` **|** `prefix` **|** `uptime`")
            .setColor('BLUE')
            .setFooter("Requested by " + message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

            message.channel.send(botembed)
        } else if(args[0] == 'fallguys') {
            let fallembed = new MessageEmbed()
            .setTitle(`${emoji("772488751045541889")}Fall Guys Category Help`)
            .setDescription("`celebration` **|** `color` **|** `dlc` **|** `emote` **|** `face` **|** `news` **|** `pattern` **|** `reddit` **|** `rounds` **|** `skin` **|** `social` **|** `soundtrack` **|** `store`")
            .setColor('RED')
            .setFooter("Requested by " + message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))    
            
            message.channel.send(fallembed);
        } else if(args[0] == 'fun') {
            let funembed = new MessageEmbed()
            .setTitle(`😄Fun Category Help`)
            .setDescription("`8ball` **|** `ascii` **|** `cookie` **|** `dice` **|** `djs` **|** `inverse` **|** `meme` **|** `rip` **|** `wasted` **|** `stringify` **|** `translate` **|** `triggered`")
            .setColor('YELLOW')
            .setFooter("Requested by " + message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))    
            
            message.channel.send(funembed);            
        } else if(args[0] == 'general') {
            let generalembed = new MessageEmbed()
            .setTitle(`🛠General Category Help`)
            .setDescription("`avatar` **|** `channel-info` **|** `server-info` **|** `user-info`")
            .setColor('#444a46')
            .setFooter("Requested by " + message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))    
            
            message.channel.send(generalembed);      
        } else if(args[0] == 'owner') {
            let owenrembed = new MessageEmbed()
            .setTitle(`🛑Owner Category Help`)
            .setDescription("`eval`")
            .setColor('RED')
            .setFooter("Requested by " + message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))    
            
            message.channel.send(owenrembed);     
        } else if(args[0] == 'search') {
            let searchembed = new MessageEmbed()
            .setTitle(`🔎Search Category Help`)
            .setDescription("`book` **|** `gif` **|** `itunes` **|** `mdn` **|** `npm`")
            .setColor('#399e80')
            .setFooter("Requested by " + message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))    
            
            message.channel.send(searchembed);   
        }

        function emoji (id) {
            return client.emojis.cache.get(id).toString();
        }
    }
}
