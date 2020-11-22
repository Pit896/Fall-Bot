const discord = require('discord.js');
const client = new discord.Client({
    disableEveryone: true
});
const { readdir } = require('fs');
const config = require('./config/config.json');

require('dotenv').config();
const DBL = require('dblapi.js');
const dbl = new DBL(process.env.DBL, client);


client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.colors = config.colors;
client.emotes = config.emotes;
client.queue = new Map();

readdir('./events/', async (err, files) => {
    if(err) console.log(err.stack)
    files.forEach(async file => {
        if(!file.endsWith(".js")) return;
        const events = require(`./events/${file}`)(client);
    });
});

readdir('./handlers/', async (err, files) => {
    if(err) console.log(err.stack)
    files.forEach(file => {
        if(!file.endsWith(".js")) return;
        const handlers = require(`./handlers/${file}`)(client);
    });
});

readdir('./database/', async (err, files) => {
    if(err) return console.log(err.stack);
    files.forEach(file => {
        if(!file.endsWith(".js")) return;
        const database = require(`./database/${file}`)(client);
    });
});

readdir('./DBL/', async (err, files) => {
    if(err) return console.log(err.stack);
    files.forEach(file => {
        if(!file.endsWith(".js")) return;
        const DBL = require(`./DBL/${file}`)(dbl);
    });
});
