const mongoose = require('mongoose');

const ChannelDelete = new mongoose.Schema({
    guildID: String,
    guildName: String,
    ChannelID: String
});

module.exports = mongoose.model('channelDelete', ChannelDelete);