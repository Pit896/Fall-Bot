const model = require('../../database/models/roleCreate');


module.exports = {
    name: 'r-creater',
    category: 'Logger',
    description: 'Manage the log channel of log type: "Role Create"',
    usage: 'f!r-creater <#channel> | f!r-creater disable',
    run: async (client, message, args) => {

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You don't have \`MANAGE MESSAGES\` permission to do that!`)
        .then(m => m.delete({ timeout: 10000 }));

        let Guild = await model.findOne({
            guildID: message.guild.id,
            guildName: message.guild.id            
        }, async (err, guild) => {
            if(err) console.log(err);
            if(!guild) {
                const NewRes = new model({
                    guildID: message.guild.id,
                    guildName: message.guild.id,
                    ChannelID: null
                });
                NewRes.save();

                return message.channel.send("You are now in our Database with command `r-creater`, retype the command!");
            }
        });

        if(args[0] == 'disable') {
            if(Guild.ChannelID === null) {
                message.channel.send("⚠ The Role Creater is arleady disabled!");
            } else {
                await Guild.updateOne({
                    ChannelID: null
                });

                message.channel.send(`🛑 Role Creater Logger Disabled!`);
            }
        } else {
            const channel = message.mentions.channels.first();
            if(!channel) return message.channel.send("No Channel Specifited!");

            await Guild.updateOne({
                ChannelID: channel.id
            });
            message.channel.send(`🔰 Seted The Role Creater in Channel ${channel}`);
        }
    }
}