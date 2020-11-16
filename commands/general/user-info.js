const { MessageEmbed } = require(`discord.js`);
const moment = require(`moment`);

module.exports = {
    name: `user-info`,
    description: `Send you info of a member`,
    category: `General`,
    usage: `f!user-info | f!user-info <member>`,
    aliases: [`userinfo`],
    run: async (client, message, args) => {

		const flags = {
			DISCORD_EMPLOYEE: `${emoji("777839910408159235")} -> Discord Employee`,
			DISCORD_PARTNER: `${emoji("777839085007929346")} -> Discord Partner`,
			BUGHUNTER_LEVEL_1: `${emoji("777840416862634004")} -> Bug Hunter (Level 1)`,
			BUGHUNTER_LEVEL_2: `${emoji("777840547942760468")} -> Bug Hunter (Level 2)`,
			HYPESQUAD_EVENTS: `${emoji("777840851208110080")} -> HypeSquad Events`,
			HOUSE_BRAVERY: `${emoji("777841137363714049")} -> House of Bravery`,
			HOUSE_BRILLIANCE: `${emoji("777841291044192266")} -> House of Brilliance`,
			HOUSE_BALANCE: `${emoji("777841464629657620")} -> House of Balance`,
			EARLY_SUPPORTER: `${emoji("777841882348519455")} -> Early Supporter`,
			TEAM_USER: `${emoji("777839910408159235")} -> Team User`,
			SYSTEM: `${emoji("777842741618147331")} -> System`,
			VERIFIED_BOT: `${emoji("777843343010037772")} -> Verified Bot`,
			VERIFIED_DEVELOPER: `${emoji("777844018163613696")} -> Verified Bot Developer`
		};

        const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]) || message.member;
		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);
			const userFlags = member.user.flags.toArray();			

		const embed = new MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(member.displayHexColor || `BLUE`)
			.addField(`User`, [
				`**❯ Username:** ${member.user.username}`,
				`**❯ Discriminator:** ${member.user.discriminator}`,
				`**❯ ID:** ${member.id}`,
				`**❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(` | `) : `None`}`,				
				`**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
				`**❯ Time Created:** ${moment(member.user.createdTimestamp).format(`LT`)} ${moment(member.user.createdTimestamp).format(`LL`)} ${moment(member.user.createdTimestamp).fromNow()}`
			])
			.addField(`Member`, [
				`**❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? `None` : member.roles.highest}`,
				`**❯ Server Join Date:** ${moment(member.joinedAt).format(`LL LTS`)}`,
				`**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist : `None`}`,
				`**❯ Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(` | `) : roles.length > 10 ? this.client.utils.trimArray(roles) : `None`}`,
				`\u200b`
			]);
		return message.channel.send(embed);

		function emoji (id) {
			return client.emojis.cache.get(id).toString();
		}
    }
}