module.exports = (client) => {
    client.on('error', async function(err) {
        console.log(err);
    });
}