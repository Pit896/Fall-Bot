const mongoose = require('mongoose');

module.exports = async (client) => {
    console.log("Connecting...");    
    
    await mongoose.connect(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log("Connected to Database Fall bot"))
}
