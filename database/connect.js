const mongoose = require('mongoose');

console.log("Connecting...");

module.exports = async (client) => {
    await mongoose.connect('mongodb+srv://Fall_bot:Fall_Bot@cluster0.l64gy.mongodb.net/FallBot?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log("Connected to Database Fall bot"))
}