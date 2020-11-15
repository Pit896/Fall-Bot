const { MessageEmbed } = require('discord.js');

module.exports = {
    name: '8ball',
    description: '8Ball is fun (;',
    category: 'Fun',
    usage: 'f!8ball <question>',
    run: async (client, message, args) => {

        if(!args.join(" ")) {
            message.channel.send('Please ask me a question.');
        } 
        else {
            let eightball = [
                'Play Fall Guys',
                'Don\' t teaming',
                'Season 2.5 is now live!',
                '(;',
                '[Fall Guys Steam Link](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjG8KOi2ITtAhWMm6QKHauSAksQFjAAegQIARAD&url=https%3A%2F%2Fstore.steampowered.com%2Fapp%2F1097150%2FFall_Guys_Ultimate_Knockout%2F&usg=AOvVaw0QrxZdeZNPyF4-EEqjkiHL)',
                'Vote me on Top.gg (;',
                'No sense',
                'No way!',
                `${emoji("777542904230051840")} hahahaha`,
                'You sus, you don\' t have Fall Guys',
                'Noob',
                'Lmao',
                'Noice',
                'https://discord.gg/uUt3yMAUNM',
                'No',
                'Try Again',
                'Yaz',
                'Shut Up',
                'PLAY FALL GUYS',
                'NO AMONG US',
                'There\' s an among us player among us?',
                'It is certain.',
                'It is decidedly so.',
                'Without a doubt.',
                'Yes definitely.',
                'You may rely on it.',
                'As I see it, yes.',
                'Most likely.',
                'Outlook good.',
                'Yes.',
                'Signs point to yes.',
                'Reply hazy try again.',
                'Ask again later.',
                'Better not tell you now.',
                'Cannot predict now.',
                'Concentrate and ask again.',
                'Don\'t count on it.',
                'My reply is no.',
                'My sources say no.',
                'Outlook not so good.',
                'Very doubtful.',
                'No way.',
                'Maybe',
                'The answer is hiding inside you',
                'No.',
                'Depends on the mood of the CS god',
                'Hang on',
                'It\'s over',
                'It\'s just the beginning',
                'Good Luck',
            ];
            let index = (Math.floor(Math.random() * Math.floor(eightball.length)));
            let embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle("8Ball")
            .setFooter("🔮 | I see... you", client.user.displayAvatarURL())
            .setDescription(`**Question:**\n${args.join(" ")}\n\n**Response:**\n${eightball[index]}`);
            message.channel.send(embed);
        }
            function emoji (id) {
                return client.emojis.cache.get(id).toString();
            }
    }
}
