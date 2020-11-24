module.exports = (client) => {
    client.on('disconnect', async function() {
        console.log(`${client.user.usename} has disconnected!`);
    });
}