const mongoose = require('mongoose');

const Updates = new mongoose.Schema({
    guildID: String,
    guildName: String,
    ChannelID: String
});


module.exports = mongoose.model('updateMessage', Updates);