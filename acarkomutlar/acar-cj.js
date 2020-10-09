const Discord = require('discord.js');
const ms = require("ms");
const db = require("quick.db")
const acarayarlar = require('../acarregister/botayarlari.json');
let acar = require('../acarregister/botayarlari.json');
exports.run = async (client, message,  args) => {
  if (!message.member.roles.has(acarayarlar.jailhammerid) && !message.member.roles.has(acarayarlar.bancırolid) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.morparıltı}    Bilgi`, `${acarayarlar.ünlem}  Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("2e0101").setFooter(message.author.tag, message.author.avatarURL).setTimestamp());
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.tag} ${acarayarlar.sunucuadi} Moderasyon`, `${acarayarlar.ünlem}  Bir kullanıcıyı Cezalıya atıcaksam etiketlemelisin!`).setColor("RANDOM"));
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı);
  if (member.user.bot) return message.reply("Bot'a jail atamazsınız!")
  if (member.highestRole.position >= message.member.highestRole.position || !member.bannable) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.tag} ${acarayarlar.sunucuadi} Moderasyon`, `${acarayarlar.ünlem}  Bu kullanıcıyı cezalıya atmanız için yetkiniz bulunmamaktadır!`).setColor("RANDOM"));
  let reason = args.slice(1).join(" ") || `Sebep girilmemiş.`;
      if(!reason) return message.channel.send(acarayarlar.ünlem+" Tabi atabilmem için geçerli bi sebebin olmalıdır!").then(m => m.delete(5000));
      message.guild.members.get(member.id).roles.forEach(r => {
message.guild.members.get(member.id).removeRole(r) 

   
})
    await(member.addRole(acarayarlar.cezalırolid));
  
    const kanal = message.guild.channels.find(c => c.id == acarayarlar.cezaişlemid) 
    const embed1 = new Discord.RichEmbed() 
        .setDescription(`${kullanıcı} adlı üye **${reason}** sebebi ile jaile atıldı!`)
    .setColor("RED")
    .setFooter(message.author.tag , message.author.avatarURL)
    .setTimestamp()
  

  
  db.set(`jail.${kullanıcı.id}` , '1') 
  
   let embed = new Discord.RichEmbed() 
  .setDescription(`${kullanıcı} adlı üye cezalıya atıldı! \n Atılma sebepi: **${reason}** \n Atılan süre: **Kalıcı**`) 
  .setFooter(message.author.tag , message.author.avatarURL)
  .setTimestamp()
  return message.channel.send(embed).then(kanal.send(embed1)).then(m => m.delete(5000));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ceza","cezalandır"],
  kategori: "Yetkili Komutları",
  permLevel: 0
};

exports.help = {
  name: 'jail',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '!jail @etiket Sebebep'
};

exports.acar = {
    acardizini: 'acar-cj.js',
    acarprefix: acar.prefix,
};