module.exports = (client) => {
    client.on('warn', async function() {
        console.log(`${client.user.usename} has been warned!`);
    });
}