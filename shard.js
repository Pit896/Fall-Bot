const { ShardingManager } = require('discord.js');
require('dotenv').config();
const { token } = require('./config/config.json')

const shards = new ShardingManager('./bot.js', {
    token: token,
    totalShards: "auto"
});

shards.on('shardCreate', shard => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launching shard #${shard.id}...`);
    shard.on('ready', () => {
        console.log(`Shard #${shard.id} Spawned!`);
    });

    shard.on('error', err => {
        console.log(`Shard Error ${err.stack}!`);
    });

    shard.on('reconnecting', () => {
        console.log("Shard loose connection");
    });

    shard.on('spawn', spawn => {
        spawn.on('disconnect', () => {
            console.log("Shard Disconnected!")
        });
    });
});

shards.spawn(shards.totalShards, 10000)
