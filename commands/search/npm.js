const { MessageEmbed } = require('discord.js');
const req = require('node-superfetch');
const moment = require('moment')


module.exports = {
    name: 'npm',
    category: 'Search',
    description: 'Npm Search',
    usage: 'f!npm <query>',
    timeout: 1500,
    run: async (client, message, args) => {
        const pkg = args.join(' ');
        if (!pkg) return funcs.send('Provided no input.');
        try {
          const {
            body
          } = await req.get(`https://registry.npmjs.com/${pkg}`);
          if (body.time.unpublished) return funcs.send('This package no longer exists.');
          const version = body.versions[body['dist-tags'].latest];
          const maintainers = body.maintainers.map(user => user.name);
          const dependencies = version.dependencies ? Object.keys(version.dependencies) : null;
          const embed = new MessageEmbed()
            .setColor('RED')
            .setAuthor('NPM', 'https://i.imgur.com/ErKf5Y0.png', 'https://www.npmjs.com/')
            .setTitle(body.name)
            .setURL(`https://www.npmjs.com/package/${pkg}`)
            .setDescription(body.description || 'No description.')
            .addField('Version', body['dist-tags'].latest, true)
            .addField('License', body.license || 'None', true)
            .addField('Author', body.author ? body.author.name : '???', true)
            .addField('Creation Date', moment.utc(body.time.created).format('MM/DD/YYYY h:mm A'), true)
            .addField('Modification Date', moment.utc(body.time.modified).format('MM/DD/YYYY h:mm A'), true)
            .addField('Main File', version.main || 'index.js', true)
            .addField('Dependencies', dependencies && dependencies.length ? dependencies.join(', ') : 'None')
            .addField('Maintainers', maintainers.join(', '));
          return message.channel.send(embed);
        } catch (err) {
          if (err.status === 404) return message.channel.send('Could not find any results.');
          return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
      }
    }
}
