const mongoose = require('mongoose');

const RoleDelete = new mongoose.Schema({
    guildID: String,
    guildName: String,
    ChannelID: String
});

module.exports = mongoose.model('rolesDelete', RoleDelete);