const { MessageEmbed } = require('discord.js');
const util = require('util')

module.exports = {
    name: 'eval',
    decription: 'ONLY BOT OWNER',
    category: 'Owner',
    usage: 'f!eval <code>',
    aliases: ['evaluate'],
    run: async (client, message, args) => {

        if(message.author.id !== '723123419670904852') {
            return message.channel.send("You are not bot owner!");
        } else {
            try {
                let codein = args.join(" ");
                let code = eval(codein);

                if(typeof code !== 'string')
                    code = util.inspect(code, { depth: 0 });

                    let embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor("Evaluate")
                    .addField("Input", `\`\`\`js\n${codein}\`\`\``)
                    .addField("Output", `\`\`\`js\n${code}\n\`\`\``);

                    message.channel.send(embed);
            } catch (e) {
                let embed1 = new MessageEmbed()
                .setAuthor("ERROR")
                .setDescription(`\`\`\`js\n${e}\n\`\`\``)
                .setColor("RED")

                message.channel.send(embed1);
            }
        }
    }
}