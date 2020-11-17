const { MessageEmbed } = require("discord.js")

/** 
 * @param {String} text - Message which is need to send
 * @param {TextChannel} channel - A Channel to send error
 */
module.exports = async (text, channel) => {
    let embed = new MessageEmbed()
    .setColor("RED")
    .setDescription(text)
    .setFooter("Oops something went wrong :(")
    await channel.send(embed)
}