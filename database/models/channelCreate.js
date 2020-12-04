const mongoose = require('mongoose');

const ChannelCreate = new mongoose.Schema({
    guildID: String,
    guildName: String,
    ChannelID: String
});

module.exports = mongoose.model('channelCreate', ChannelCreate);