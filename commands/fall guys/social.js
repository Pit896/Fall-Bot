const { MessageEmbed } = require(`discord.js`);

module.exports = {
    name: `social`,
    category: `Fall Guys`,
    usage: `f!social`,
    description: `Send all social links of Fall Guys`,
    run: async (client, message, args) => {

        let embed = new MessageEmbed()
        .setTitle(`Fall Guys | Social`)
        .setColor(`BLURPLE`)
        .setDescription(`Fall Guys is a massively multiplayer party game with up to 60 players online in a free-for-all struggle through round after round of escalating chaos until one victor remains!`)
        .setImage(`https://images.pushsquare.com/85a8ef8f462c0/fall-guys-guide-ps4-playstation-4-1.original.jpg`)
        .addField(`${emoji("772487412428832778")}Recent Reviews:`, `Very Positive`)
        .addField(`${emoji("772487412428832778")}All Reviews:`, `Very Positive`)
        .addField(`${emoji("772487771943993345")}Release Date:`, `4 Aug, 2020`)
        .addField(`${emoji("772488219786608640")}Discord:`, `[Discord Link](https://discord.gg/uUt3yMAUNM)`)
        .addField(`${emoji("772488751045541889")}Website:`, `[Website Link](https://fallguys.com/)`)
        .addField(`${emoji("772488751045541889")}Website Support:`, `[Website Support Link](https://support.fallguys.com/)`)
        .addField(`${emoji("772802791222935552")}Twitter:`, `[Twitter Link](https://twitter.com/fallguysgame?lang=en)`)
        .addField(`${emoji("768537186139766814")}Youtube:`, `[Youtube Link](https://www.youtube.com/playlist?list=PLeF76CCdo1_cgHWhk-MAD5FjhNGOgh3hX)`)
        .addField(`${emoji("777531182392410112")}Twitch:`, `[Twitch Link](https://www.twitch.tv/directory/game/Fall%20Guys)`)
        .addField(`${emoji("772802979635265576")}Steam:`, `[Steam Link](https://store.steampowered.com/app/1097150/Fall_Guys_Ultimate_Knockout/)`)
        .addField(`${emoji("772803203024027658")}PlayStation:`, `[PlayStation Link](https://www.playstation.com/en-us/games/fall-guys-ultimate-knockout-ps4/)`)
        .addField(`${emoji("772803426135965697")}Instagram:`, `[Instagram Link](https://www.instagram.com/fallguysgame/?hl=en)`)
        .addField(`${emoji("772803645002743818")}Facebook:`, `[Facebook Link](https://www.facebook.com/pages/category/Interest/Fall-Guys-Ultimate-Knockout-107652380974225/)`)
        .addField(`${emoji("772826097556783125")}Tik Tok:`, `[Tik Tok Link](https://www.tiktok.com/@fallguysgame)`)
        .setThumbnail(`https://www.mercurynews.com/wp-content/uploads/2020/08/Fall-Guys-Key-Art_Thumb-1.jpg`)
        .setFooter(`Fall Guys by MEDIATONIC`, `https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Mediatonic.svg/220px-Mediatonic.png`);

        message.channel.send(embed);

        function emoji (id) {
            return client.emojis.cache.get(id).toString();
        }
    }
}
