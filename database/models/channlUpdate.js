const mongoose = require('mongoose');

const ChannelUpdate = new mongoose.Schema({
    guildID: String,
    guildName: String,
    ChannelID: String
});

module.exports = mongoose.model('channelUpdate', ChannelUpdate);