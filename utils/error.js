const { MessageEmbed } = require("discord.js")

  @param {String} 
  @param {TextChannel}

module.exports = async (text, channel) => {
    let embed = new MessageEmbed()
    .setColor("RED")
    .setDescription(text)
    .setFooter("Oops something went wrong :(")
    await channel.send(embed)
}
