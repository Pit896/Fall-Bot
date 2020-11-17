const discord = require('discord.js');
const client = new discord.Client({
    disableEveryone: true
});

const DBL = require('dblapi.js');
const config = require('./config/config.json');
const dbl = new DBL(process.env.DBL, client);

const { Player } = require("discord-player");

const player = new Player(client);

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.config = config;
client.player = player;


["posted"].forEach(d => {
    require(`./DBL/${d}`)(dbl)
});

//["error"].forEach(d => {
//    require(`./DBL/${d}`)(dbl)
//});

//["getBot"].forEach(d => {
//    require(`./DBL/${d}`)(dbl)
//});

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
