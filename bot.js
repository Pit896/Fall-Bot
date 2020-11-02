const discord = require('discord.js');
require('dotenv').config();
const client = new discord.Client({
    disableEveryone: true
});

client.commands = new discord.Collection();
client.aliases = new discord.Collection();


["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client)
});

["ready"].forEach(ready => {
    require(`./events/${ready}`)(client)
});

["message"].forEach(message => {
    require(`./events/${message}`)(client)
});

["botjoin"].forEach(botj => {
    require(`./events/${botj}`)(client)
});

["connect"].forEach(connect => {
    require(`./database/${connect}`)(client)
});
