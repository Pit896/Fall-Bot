const mongoose = require('mongoose');

const RoleUpdate = new mongoose.Schema({
    guildID: String,
    guildName: String,
    ChannelID: String
});

module.exports = mongoose.model('rolesUpdate', RoleUpdate);