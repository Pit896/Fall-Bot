const { Random } = require('something-random-on-discord');
const random = new Random();

module.exports = {
    name: 'meme',
    category: 'Fun',
    description: 'Send you a random meme',
    usage: 'f!meme',
    run: async (client, message, args) => {

        let data = await random.getMeme();

        message.channel.send(data);
    }
}
