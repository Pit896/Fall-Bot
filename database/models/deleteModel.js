const mongoose = require('mongoose');

const Deletes = new mongoose.Schema({
    guildID: String,
    guildName: String,
    ChannelID: String
});


module.exports = mongoose.model('deleteMessage', Deletes);