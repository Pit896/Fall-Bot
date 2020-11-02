const mongoose = require('mongoose');
const Guild = require('../../database/models/prefix');
const prefix = require('../../config/config.json');

module.exports = {
    name: "prefix",
    category: "Bot",
    description: "Set your guild prefix",
    usage: "f!prefix <new_prefix>",
    aliases: ['pr'],
    run: async (client, message, args) => {

        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You don't have \`MANAGE GUILD\` permission to do that!`)
        .then(m => m.delete({ timeout: 10000 }));

        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if(err) console.log(err);
            if(!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: prefix.prefix
                });

                newGuild.save()
                .then(res => console.log(res))
                .catch(err => console.log(err));

                return message.channel.send(`Please Retype the Command`).then(m => m.delete({ timeout: 5000 }));

            }
        });

        if(!args[0]) return message.channel.send(`Your Guild Prefix is \`${settings.prefix}\``)

        await settings.updateOne({
            prefix: args[0]
        });

        return message.channel.send(`✅ Prefix Changed to \`${args[0]}\``);
    }
}