const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = {
    name: "rounds",
    category: "Fall Guys",
    description: "Send you all fall guys minigames",
    usage: "f!rounds <number between 1 to 29>",
    aliases: ['round'],
    run: async (client, message, args) => {

        let pages = ['**Races:**\`\`\`1 ->  DIZZY HEIGHTS\n2 ->  SEE SAW\n9 ->  TIP TOE\n3 ->  DOOR DASH\n12 -> FRUIT CHUTE\n13 -> GATE CRASH\n14 -> HIT PARADE\n15 -> KNIGHT FEVER\n16 -> SLIME CLIMB\n17 -> THE WHIRLYGIG\n18 -> WALL GUYS\n30 -> BIG FANS\`\`\`', '**Survival:**\`\`\`4 -> JUMP CLUB\n19 -> BLOCK PARTY\n20 -> ROLL OUT\`\`\`', "**Team:**\`\`\`5 ->  EGG SCRAMBLE\n6 ->  ROCK 'N' ROLL\n7 ->  FALL BALL\n23 -> EGG SIEGE\n24 -> HOARDERS\n25 -> HOOPSIE DAISY\n26 -> JINXED\n27 -> TEAM TAIL TAG\`\`\`", '**Logic:** \`\`\`22 -> PERFECT MATCH\`\`\`', '**Hunt:** \`\`\`8 -> TAIL TAG\n21 -> HOOPSIE LEGENDS\`\`\`', '**Final:**\`\`\`10 -> FALL MOUNTAIN\n11 -> HEX-A-GONE\n28 -> JUMP SHOWDOWN\n29 -> ROYAL FUMBLE\`\`\`'];
        let page = 1

        const { body } = await request.get('https://fallguysapi.com/api/rounds')

        let embed = new MessageEmbed()
        .setColor('RANDOM')
        .setFooter(`Round Page ${page} of ${pages.length}`)
        .setThumbnail("https://static.wikia.nocookie.net/fallguysultimateknockout/images/6/62/Fall_Guys_Ultimate_Knockout_logo.png")
        .setAuthor("Rounds:")
        .setDescription(pages[page-1])
        if(!args[0]) return message.channel.send(embed)
        .then(msg => { 
            msg.react('⏪').catch(err => console.log(err))
            msg.react('⏩').catch(err => console.log(err))
            msg.react('❎').catch(err => console.log(err))

            let filter3 = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
            let filter1 = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
            let filter2 = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

            let f = msg.createReactionCollector(filter1, { time: 1000000 })
            let f2 = msg.createReactionCollector(filter2, { time: 1000000 })
            let f3 = msg.createReactionCollector(filter3, { time: 1000000 })

            f.on('collect', r => {
                if(page === 1) return;
                page--;
                embed.setDescription(pages[page-1])
                embed.setFooter(`Page ${page} of ${pages.length}`)
                msg.edit(embed);
            });

            f2.on('collect', r => {
                if(page === pages.length) return;
                page++;
                embed.setDescription(pages[page-1])
                embed.setFooter(`Page ${page} of ${pages.length}`)
                msg.edit(embed);
            });

            f3.on('collect', r => {
                msg.delete();
            });
        });


        if(args[0] > 29) return message.channel.send("Please provide a __number__ between **1** and **29**")
        if(args[0] < 1) return message.channel.send("Please provide a __number__ between **1** and **29**")
        if(isNaN(args[0])) return message.channel.send("Please provide a __number__ between **1** and **29**")

        if(args[0] == '1') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} DIZZY HEIGHTS`)
            .setColor('YELLOW')
            .setTimestamp()
            .setThumbnail(body[0].previewImage)
            .addField("Type:", body[0].type)
            .addField("Size:", body[0].size)
            .addField("Designer:", body[0].designer)
            .setDescription(body[0].description);
    
            message.channel.send(embed);
        } else if(args[0] == '2') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} SEE SAW`)
            .setColor('YELLOW')
            .setTimestamp()
            .setThumbnail(body[1].previewImage)
            .addField("Type:", body[1].type)
            .addField("Size:", body[1].size)
            .addField("Designer:", body[1].designer)
            .setDescription(body[1].description);
    
            message.channel.send(embed);

        } else if(args[0] == '3') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} DOOR DASH`)
            .setColor('YELLOW')
            .setTimestamp()
            .setThumbnail(body[2].previewImage)
            .addField("Type:", body[2].type)
            .addField("Size:", body[2].size)
            .addField("Designer:", body[2].designer)
            .setDescription(body[2].description);
    
            message.channel.send(embed);

        } else if(args[0] == '4') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} JUMP CLUB`)
            .setColor('GREEN')
            .setTimestamp()
            .setThumbnail(body[3].previewImage)
            .addField("Type:", body[3].type)
            .addField("Size:", body[3].size)
            .addField("Designer:", body[3].designer)
            .setDescription(body[3].description);
    
            message.channel.send(embed);

        } else if(args[0] == '5') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} EGG SCRAMBLE`)
            .setColor('RED')
            .setTimestamp()
            .setThumbnail(body[4].previewImage)
            .addField("Type:", body[4].type)
            .addField("Size:", body[4].size)
            .addField("Designer:", body[4].designer)
            .setDescription(body[4].description);
    
            message.channel.send(embed);

        } else if(args[0] == '6') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} ROCK 'N' ROLL`)
            .setColor('RED')
            .setTimestamp()
            .setThumbnail(body[5].previewImage)
            .addField("Type:", body[5].type)
            .addField("Size:", body[5].size)
            .addField("Designer:", body[5].designer)
            .setDescription(body[5].description);
    
            message.channel.send(embed);

        } else if(args[0] == '7') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} FALL BALL`)
            .setColor('RED')
            .setTimestamp()
            .setThumbnail(body[6].previewImage)
            .addField("Type:", body[6].type)
            .addField("Size:", body[6].size)
            .addField("Designer:", body[6].designer)
            .setDescription(body[6].description);
    
            message.channel.send(embed);

        } else if(args[0] == '8') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} TAIL TAG`)
            .setColor('BLUE')
            .setTimestamp()
            .setThumbnail(body[7].previewImage)
            .addField("Type:", body[7].type)
            .addField("Size:", body[7].size)
            .addField("Designer:", body[7].designer)
            .setDescription(body[7].description);
    
            message.channel.send(embed);

        } else if(args[0] == '9') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} TIP TOE`)
            .setColor('YELLOW')
            .setTimestamp()
            .setThumbnail(body[8].previewImage)
            .addField("Type:", body[8].type)
            .addField("Size:", body[8].size)
            .addField("Designer:", body[8].designer)
            .setDescription(body[8].description);
    
            message.channel.send(embed);

        } else if(args[0] == '10') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} FALL MOUNTAIN`)
            .setColor('#f5dd42')
            .setTimestamp()
            .setThumbnail(body[9].previewImage)
            .addField("Type:", body[9].type)
            .addField("Size:", body[9].size)
            .addField("Designer:", body[9].designer)
            .setDescription(body[9].description);
    
            message.channel.send(embed);

        } else if(args[0] == '11') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} HEX-A-GONE`)
            .setColor('#f5dd42')
            .setTimestamp()
            .setThumbnail(body[10].previewImage)
            .addField("Type:", body[10].type)
            .addField("Size:", body[10].size)
            .addField("Designer:", body[10].designer)
            .setDescription(body[10].description);
    
            message.channel.send(embed);

        } else if(args[0] == '12') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} FRUIT CHUTE`)
            .setColor('YELLOW')
            .setTimestamp()
            .setThumbnail("https://images.pushsquare.com/85bbdb2fbc8b3/fall-guys-fruit-chute-ps4-playstation-4.original.jpg")
            .addField("Type:", "Race")
            .addField("Size:", "Medium")
            .addField("Designer:", "N/A")
            .setDescription("Dodge the flying fruit and race up the conveyor belt to reach the finish line!");
    
            message.channel.send(embed);

        } else if(args[0] == '13') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} GATE CRASH`)
            .setColor('YELLOW')
            .setTimestamp()
            .setThumbnail("https://www.pcinvasion.com/wp-content/uploads/2020/08/Fall-Guys-Gate-Crash-tips-800x400.jpg")
            .addField("Type:", "Race")
            .addField("Size:", "Medium")
            .addField("Designer:", "N/A")
            .setDescription("Door Dash is a very simple round in Fall Guys. All you need to do is reach the finish line by busting down the right doors. However, there's no telling which ones will break and which ones won't. The best way to play Door Dash is actually to hang back slightly and let others do most of the leg work.");
    
            message.channel.send(embed);

        } else if(args[0] == '14') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} HIT PARADE`)
            .setColor('YELLOW')
            .setTimestamp()
            .setThumbnail("https://images.pushsquare.com/40df6f5551033/fall-guys-hit-parade-ps4-playstation-4.original.jpg")
            .addField("Type:", "Race")
            .addField("Size:", "Medium")
            .addField("Designer:", "N/A")
            .setDescription("Hit Parade is another obstacle course that's less complex than it looks. You start off presented with some balance beams. These are easy to fall from, but don't worry if you do — in fact, it can be quicker if you just jump down to the lower level here. Either way, make your way to the rotating paddles. You should follow the crowd here. There's no sense pushing the opposite side of a paddle, you'll get nowhere. It's important to remember that the barrier opens and closes at the left and right as well as the middle, so don't rush to the centre if it's easier to go via a side opening");
    
            message.channel.send(embed);

        } else if(args[0] == '15') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} KNIGHT FEVER`)
            .setColor('YELLOW')
            .setTimestamp()
            .setThumbnail("https://images.pushsquare.com/04efd70b85319/fall-guys-knight-fever-ps4-playstation-4.original.jpg")
            .addField("Type:", "Race")
            .addField("Size:", "Large")
            .addField("Designer:", "N/A")
            .setDescription("Navigate the Medieval obstacles and race to the finish line! This is a pretty long obstacle course, but it isn't as tricky as it first appears. It begins with a small section of spinning blades. They're easy enough to avoid, but watch out for holes in the floor. Next up are two sets of large beams with spinning cones. Given how clustered together these obstacles are, they can be hard to dodge, but there are moments where the path is clearer — try to wait for these easier paths.");
    
            message.channel.send(embed);

        } else if(args[0] == '16') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} SLIME CLIMB`)
            .setColor('YELLOW')
            .setTimestamp()
            .setThumbnail("https://images.pushsquare.com/0fbf389f935ea/fall-guys-slime-climb-ps4-playstation-4.original.jpg")
            .addField("Type:", "Race")
            .addField("Size:", "Large")
            .addField("Designer:", "N/A")
            .setDescription("Outrun the rising slime and survive through obstacles to reach the finish line!");
    
            message.channel.send(embed);

        } else if(args[0] == '17') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} THE WHIRLYGIG`)
            .setColor('YELLOW')
            .setTimestamp()
            .setThumbnail("https://images.pushsquare.com/b1a54a0501542/fall-guys-the-whirlygig-ps4-playstation-4.original.jpg")
            .addField("Type:", "Race")
            .addField("Size:", "Large")
            .addField("Designer:", "N/A")
            .setDescription("Like Dizzy Heights, this is an obstacle course, but it swaps out spinning platforms for rotating sweepers and big fan blades you'll need to avoid. The first portion of this stage is easy to deal with, and there's not much punishment for getting hit by the sweepers. In fact, sometimes this can work to your advantage; if the angle is right, they can propel you forwards. This is a bit too unpredictable to be a consistent tactic, but it's nice when it happens.");
    
            message.channel.send(embed);

        } else if(args[0] == '18') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} WALL GUYS`)
            .setColor('YELLOW')
            .setTimestamp()
            .setThumbnail("https://images.pushsquare.com/7929e8e58269f/fall-guys-wall-guys-ps4-playstation-4.original.jpg")
            .addField("Type:", "Race")
            .addField("Size:", "Medium")
            .addField("Designer:", "N/A")
            .setDescription("Grab and move blocks — create paths and jump along to cross walls and reach the finish line");
    
            message.channel.send(embed);

        } else if(args[0] == '19') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} BLOCK PARTY`)
            .setColor('GREEN')
            .setTimestamp()
            .setThumbnail("https://images.pushsquare.com/86ba32dc37959/fall-guys-block-party-ps4-playstation-4.original.jpg")
            .addField("Type:", "Survival")
            .addField("Size:", "Medium")
            .addField("Designer:", "N/A")
            .setDescription("Avoid the moving walls and don't fall off the platform! This one can be deceptively tricky. Your worst enemy here is other players getting in the way, so try and steer clear of them where possible. Dodging the walls is easy for most of the round, but the final 20 seconds or so narrows the playing field considerably. Try and stick to the middle as best you can so you can avoid the obstacles coming your way.");
    
            message.channel.send(embed);

        } else if(args[0] == '20') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} ROLL OUT`)
            .setColor('GREEN')
            .setTimestamp()
            .setThumbnail("https://images.pushsquare.com/84c2c891a1e91/fall-guys-roll-out-ps4-playstation-4.original.jpg")
            .addField("Type:", "Survival")
            .addField("Size:", "Large")
            .addField("Designer:", "N/A")
            .setDescription("Move between rotating rings to avoid falling into the slime! The rotation direction alternates, so you'll need to constantly move across them to stay away from the sides. Our advice is to avoid other players as much as you can, as they tend to grab you to try and throw you off.");
    
            message.channel.send(embed);

        } else if(args[0] == '21') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} HOOPSIE LEGENDS`)
            .setColor('BLUE')
            .setTimestamp()
            .setThumbnail("https://images.pushsquare.com/b4af5aab5fee9/fall-guys-hoopsie-legends-ps4-playstation-4.original.jpg")
            .addField("Type:", "Hunt")
            .addField("Size:", "Large")
            .addField("Designer:", "N/A")
            .setDescription("Hoopsie Legends takes place in a hexagonal arena with various elevation changes and steps to jump onto. There are movable blocks and ramps placed throughout the arena. In the middle of the arena is a set of three platforms that periodically raise and lower; at the exact middle is a bouncy obstacle. Periodically, rings will travel to random positions in the arena. Players will have to use a combination of the fixed elevation changes and the movable blocks/ramps to be able to reach and jump through the hoops. Score is tracked individually at the top of the screen. Normal rings are worth 1 point; golden rings are worth 5 points. This is another map where the climb function (grab and hold onto a ledge then pull yourself up) can be helpful for climbing to higher ledges or onto blocks. ");
    
            message.channel.send(embed);

        } else if(args[0] == '22') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} PERFECT MATCH`)
            .setColor('#bb0dd6')
            .setTimestamp()
            .setThumbnail("https://images.pushsquare.com/0bccd942afca6/fall-guys-perfect-match-ps4-playstation-4.original.jpg")
            .addField("Type:", "Logic")
            .addField("Size:", "Medium")
            .addField("Designer:", "N/A")
            .setDescription("Memorise the icons on the tiles — when an icon is displayed on the screen, move to a matching tile to avoid falling into the slime!");
    
            message.channel.send(embed);

        } else if(args[0] == '23') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} EGG SIEGE`)
            .setColor('RED')
            .setTimestamp()
            .setThumbnail("https://images.pushsquare.com/c892a2f18f470/fall-guys-egg-siege-ps4-playstation-4.original.jpg")
            .addField("Type:", "Team")
            .addField("Size:", "Large")
            .addField("Designer:", "N/A")
            .setDescription("Grab eggs — store them in your team's nest to score points! At the start is a cluster of eggs in the middle. There's a temptation to sabotage other teams immediately, but honestly, your best bet is to just focus on getting as many eggs into your own basket as you can. Don't even worry too much about the golden eggs — this game is all about quantity. If you get a gold egg or two, great, but don't make it your sole mission.");
    
            message.channel.send(embed);

        } else if(args[0] == '24') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} HOARDERS`)
            .setColor('RED')
            .setTimestamp()
            .setThumbnail("https://images.pushsquare.com/57cb4ddd81ba9/fall-guys-hoarders-ps4-playstation-4.original.jpg")
            .addField("Type:", "Team")
            .addField("Size:", "Large")
            .addField("Designer:", "N/A")
            .setDescription("Keep balls in your area to earn points for your team! This one is similar to Egg Scramble in some ways. There are only a few balls rolling around, and you want to try and keep as many in your team's area as possible");
    
            message.channel.send(embed);

        } else if(args[0] == '25') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} HOOPSIE DAISY`)
            .setColor('RED')
            .setTimestamp()
            .setThumbnail("https://images.pushsquare.com/e6d522e463012/fall-guys-hoopsie-daisy-ps4-playstation-4.original.jpg")
            .addField("Type:", "Team")
            .addField("Size:", "Large")
            .addField("Designer:", "N/A")
            .setDescription("Hoops descend from the heavens in random spots throughout the map, and all you need to do is hop through them. When the game loads up, swivel the camera around to see if you're near any rings, and make that your first target. Once the chaos begins, try to focus on hoops nearest to you. If you spot a hoop far away and there are already others closing in on it, leave it and find a closer one. Most of the time, there will be competition for each hoop, but don't assume opponents nearby will take it; they might make a silly mistake and leave it open. Another approach is to find a spot that's not very populated and wait for the hoops to arrive.");
    
            message.channel.send(embed);

        } else if(args[0] == '26') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} JINXED`)
            .setColor('RED')
            .setTimestamp()
            .setThumbnail("https://images.pushsquare.com/1ae3354516bdc/fall-guys-jinxed-ps4-playstation-4.original.jpg")
            .addField("Type:", "Team")
            .addField("Size:", "Large")
            .addField("Designer:", "N/A")
            .setDescription("The first team to get completely Jinxed are eliminated! When you get caught, grab the opposing team to Jinx them! There are two states of being in this round — you're either jinxed or you aren't. You'll know when you are because you'll be surrounded by little pink clouds. So, if you haven't been jinxed yet, you need to run and hide from the opposition who have that pink colouring for as long as you can. If you're jinxed, the game changes, and you must track down un-jinxed enemies and grab.");
    
            message.channel.send(embed);

        } else if(args[0] == '27') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} TEAM TAIL TAG`)
            .setColor('RED')
            .setTimestamp()
            .setThumbnail("https://images.pushsquare.com/064e93395ad73/fall-guys-team-tail-tag-ps4-playstation-4.original.jpg")
            .addField("Type:", "Team")
            .addField("Size:", "Large")
            .addField("Designer:", "N/A")
            .setDescription("Grab a tail — make sure that your team has more tails than the rest when the timer runs out! The same tips as seen above in Tail Tag can be employed here, but this time you have a team to support. Remember, only the team in last place will get eliminated, so try to steal a tail from that colour. At the end of the day, though, any tail will do.");
    
            message.channel.send(embed);

        } else if(args[0] == '28') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} JUMP SHOWDOWN`)
            .setColor('#f5dd42')
            .setTimestamp()
            .setThumbnail("https://images.pushsquare.com/934e3f19a3e86/fall-guys-jump-showdown-ps4-playstation-4.original.jpg")
            .addField("Type:", "Final")
            .addField("Size:", "Medium")
            .addField("Designer:", "N/A")
            .setDescription("Jump over the spinning beam and avoid the falling floor to WIN the CROWN!");
    
            message.channel.send(embed);

        } else if(args[0] == '29') {
            let embed = new MessageEmbed()
            .setTitle(`${emoji("770670042060161074")} ROYAL FUMBLE`)
            .setColor('#f5dd42')
            .setTimestamp()
            .setThumbnail("https://static.wikia.nocookie.net/fallguysultimateknockout_gamepedia_en/images/5/50/Splash_RoyalRumble.png")
            .addField("Type:", "Final")
            .addField("Size:", "Large")
            .addField("Designer:", "N/A")
            .setDescription("Grab the tail and make sure you're wearing it when the timer runs out to WIN! This is Tail Grab, except there's only one tail. If you're lucky, you'll start the round with the tail, and can spend the entire time evading others. This isn't a huge advantage, though, as the only thing that matters is who's wearing the tail when the clock reaches zero.");
    
            message.channel.send(embed);

        }


        function emoji (id) {
            return client.emojis.cache.get(id).toString();
        }
    }
}

