module.exports = {
    name: 'roll',
    description: 'Simple Dice Roll',
    category: 'Fun',
    usage: 'f!roll | f!roll <faces>',
    aliases: ['diceroll', 'dice'],
    timeout: 500,
    run: async (client, message, args) => {

        if(!args[0]) {
            const roll = Math.floor(Math.random() * Math.floor(6));
            message.channel.send(`**🎲Your result is ${roll}**`)
            .then(msg => {
                msg.react('♻').catch(err => console.log(err));
                let filter = (reaction, user) => reaction.emoji.name === '♻' && user.id === message.author.id;

                let f = msg.createReactionCollector(filter, { time: 70000 });

                f.on('collect', r => {
                    const reroll = Math.floor(Math.random() * Math.floor(6));   
                    msg.delete();
                    message.channel.send(`**🎲Rerolled: ${reroll}**`);
                });
            });
        } else {
            if(isNaN(args[0])) return message.channel.send("This is not a number :(");
            const roll = Math.floor(Math.random() * Math.floor(args[0]));
            message.channel.send(`**🎲Your result is ${roll}**`)
            .then(msg => {
                msg.react('♻').catch(err => console.log(err));
                let filter = (reaction, user) => reaction.emoji.name === '♻' && user.id === message.author.id;

                let f = msg.createReactionCollector(filter, { time: 70000 });

                f.on('collect', r => {
                    const reroll = Math.floor(Math.random() * Math.floor(args[0]));   
                    msg.delete();
                    message.channel.send(`**🎲Rerolled: ${reroll}**`);
                });
            });
        }
    }
}
