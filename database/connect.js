const mongoose = require('mongoose');

console.log("Connecting...");

module.exports = async (client) => {
    await mongoose.connect(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log("Connected to Database Fall bot"))
}
