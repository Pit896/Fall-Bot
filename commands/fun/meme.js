const { Random } = require('something-random-on-discord');
const random = new Random();

module.exports = {
    name: 'meme',
    category: 'Bot',
    description: 'Send you a random meme',
    usage: 'f!meme',
    timeout: 1000,
    run: async (client, message, args) => {

        let data = await random.getMeme();

        message.channel.send(data);
    }
}
