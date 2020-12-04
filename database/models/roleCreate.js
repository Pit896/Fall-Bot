const mongoose = require('mongoose');

const RoleCreate = new mongoose.Schema({
    guildID: String,
    guildName: String,
    ChannelID: String
});

module.exports = mongoose.model('rolesCreate', RoleCreate);