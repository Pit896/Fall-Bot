const { Random } = require('something-random-on-discord');
const random = new Random();

module.exports = {
    name: 'stringify',
    category: 'Fun',
    description: 'Stringify',
    usage: 'f!stringify | f!stringify <number>',
    timeout: 2000,
    run: async (client, message, args) => {

        if(!args[0]) {
            let data = await random.getString(10);

            message.channel.send(`\`\`\`${data}\`\`\``);
        } else {
            if(isNaN(args[0])) return message.channel.send(`\`${args[0]}\` isn't a number!`);
            if(args[0] == 0) return message.channel.send("I can't send you nothing!");
                let data = await random.getString(args[0]);

                if(data === undefined) return message.channel.send("The number is too long...");
                message.channel.send(`\`\`\`${data}\`\`\``);
        }
    }
}
