  const Discord = require('discord.js');
const db = require("quick.db")
const acarayarlar = require('../acarregister/botayarlari.json');
let acar = require('../acarregister/botayarlari.json');
exports.run = async (client, message, args) => {
const emoji3 = client.emojis.find(emoji => emoji.name === acarayarlar.tagemojiadi);
 if (!message.member.roles.has(acarayarlar.registercommandid) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.morparıltı}   Bilgi` , `${acarayarlar.ünlem}  Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.morparıltı}  Bilgi` , `${acarayarlar.ünlem}  Bir kullanıcı etiketlemelisin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
 //let isim = args[1]
   //   if(!isim) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.morparıltı} Bilgi` , `${acarayarlar.ünlem}  Bir isim girmelisin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp())
await 
  member.setNickname(`${acarayarlar.tagsiz} ' ${acar.yenibiriisim}`)
      message.guild.members.get(member.id).roles.forEach(r => {
message.guild.members.get(member.id).removeRole(r) 

   
})
    await member.addRole(acarayarlar.kayıtsızrol) // kayıtsız 1
  
    message.react(acarayarlar.siyahtikid);
  let embed = new Discord.RichEmbed() 
  .setColor("BLACK")
  .addField(`${acarayarlar.tag} ${acarayarlar.sunucuadi}`, `${emoji3} ${member.user} **adlı üyeye** <@&${acarayarlar.kayıtsızrol}> **rolünü verip kayıtsıza attım.**`)                                                                             
  .setFooter(message.author.tag ,message.author.avatarURL)
  .setTimestamp()
  return message.channel.send(embed).then(msg => msg.delete(5000));

 
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayıtsız"],
  kategori: "Yetkili Komutları",
  permLevel: 0
};
exports.help = {
  name: "kayıtsız",
  description: "Kayıtsıza atar ?",
  usage: "kayıtsız"
};

exports.acar = {
    acardizini: 'acar-kayıtsız.js',
    acarprefix: acar.prefix,
};