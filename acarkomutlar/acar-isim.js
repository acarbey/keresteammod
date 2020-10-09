const Discord = require('discord.js');
const acarayarlar = require('../acarregister/botayarlari.json');
let acar = require('../acarregister/botayarlari.json');
exports.run = async (client, message, args) => {
const emoji3 = client.emojis.find(emoji => emoji.name === acarayarlar.tagemojiadi);
  if (!message.member.roles.has(acarayarlar.botcommandid, acarayarlar.registercommandid) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.morparıltı} Bilgi` , `${acarayarlar.ünlem} Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
  let member = message.mentions.members.first()
  if (!member) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.morparıltı} Bilgi` , `${acarayarlar.ünlem} Bir kullanıcı etiketlemelisin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
  let isim = args[1]
      if(!isim) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.morparıltı} Bilgi` , `${acarayarlar.ünlem}  Bir isim girmelisin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp())
  let yas = args[2]
      if(!yas) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.morparıltı} Bilgi` , `${acarayarlar.ünlem}  Kayıtı bitirebilmem için lütfen bir yaş girmelisin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp())
  await member.setNickname(`${acarayarlar.tag} ' ${isim} | ${yas}`)
  const embed = new Discord.RichEmbed()
  .setColor('BLACK')
  .addField(`${acarayarlar.tag} ${acarayarlar.sunucuadi}`, `${emoji3} ${member.user} **adlı üyenin adını** \`${acarayarlar.tag} ' ${isim} | ${yas}\` **olarak değiştirdim** `)
  .setFooter(message.author.tag ,message.author.avatarURL)
  .setTimestamp()
  message.react(acarayarlar.siyahtikid)
  message.channel.send(embed).then(msg => msg.delete(5000));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['nickname' , 'nick' , 'isim','i'],
  permLevel: 0
};

exports.help = {
  name: 'isim',
  description: "İsim değiştirmeye ne dersin yakışıklı",
  usage: 'isim <yeni nick>'
};

exports.acar = {
    acardizini: 'acar-isim.js',
    acarprefix: acar.prefix,
};