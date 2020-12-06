const figlet = require('figlet');

module.exports = {
    name: 'ascii',
    category: 'Fun',
    description: 'Text Generator!',
    usage: 'f!ascii <text>',
    timeout: 2000,
    run: async (client, message, args) => {

        if(!args.join(" ")) return message.channel.send("To Text Provided!");
        figlet.text(args.join(' '), {
            font: 'Standard',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        }, async (err, render) => {
            if(err) {
                console.log(err.stack)
                message.channel.send('Invalid Text!');    
            }

            if(render.length > 2000) return message.channel.send("The Text Is so Long");
            if(render.trim().length === 0) return message.channel.send('Invalid Text!'); 


            message.channel.send("Here is your ascii")
            message.channel.send(render, { code: "md" });
        });
    }
}
