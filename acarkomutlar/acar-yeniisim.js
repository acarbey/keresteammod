  const Discord = require('discord.js');
const db = require("quick.db")
const acarayarlar = require('../acarregister/botayarlari.json');
let acar = require('../acarregister/botayarlari.json');
exports.run = async (client, message, args) => {
const emoji3 = client.emojis.find(emoji => emoji.name === acarayarlar.tagemojiadi);
 if (!message.member.roles.has(acarayarlar.boosterrolid) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.morparıltı}   Bilgi` , `${acarayarlar.ünlem}  Bu komutu sadece sunucuya destek çıkanlar kullanabilir!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
  let kullanıcı = message.author;
  if (!kullanıcı) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.morparıltı}  Bilgi` , `${acarayarlar.ünlem}  Bir kullanıcı etiketlemelisin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
 let isim = args.slice(0).join(" ");
     if(!isim) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.morparıltı} Booster Bilgi` , `${acarayarlar.ünlem}  Yeni ismini belirlemelisin destekçi!`).setColor("2e0101"));
await 
  member.setNickname(`${acarayarlar.tag} ' ${isim}`)
    message.react(acarayarlar.siyahtikid);
  let embed = new Discord.RichEmbed() 
  .setColor("BLACK")
  .addField(`${acarayarlar.tag} ${acarayarlar.sunucuadi}`, `${emoji3} ${member.user} **yeni ismini senin için belirledim.**`)                                                                             
  .setFooter(message.author.tag ,message.author.avatarURL)
  .setTimestamp()
  return 
  message.channel.send(embed).then(msg => msg.delete(5000));

 
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["y"],
  kategori: "Yetkili Komutları",
  permLevel: 0
};
exports.help = {
  name: "y",
  description: "Kayıtsıza atar ?",
  usage: "y"
};

exports.acar = {
    acardizini: 'acar-yeniisim.js',
    acarprefix: acar.prefix,
};