module.exports = async (client) => {
    client.on('message', async message => {
        if(message.author.bot) return;

        console.info(`[${new Date}](${message.guild.name}:${message.author.username}) ${message.content} (ID: ${message.id})`);
    });
}   