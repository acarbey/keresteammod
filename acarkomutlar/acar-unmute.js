const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db")
const client = new Discord.Client();
const acarayarlar = require('../acarregister/botayarlari.json');
const muteayarlari = require('../acarregister/rol.json')
let acar = require('../acarregister/botayarlari.json');

exports.run = async (receivedMessage, msg, args) => {
      if (!msg.member.roles.has(acarayarlar.mutecommandid) && !msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Bir yetkili değilsin bu yüzden komutu kullanamazsın!")
var mod = msg.author
let reason = args.slice(1).join(" ");
      if(!reason) return msg.reply('Mute kaldırabilmem için bir sebep girmelisin.')
let user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
  if (!user) return msg.reply('Bir kullanıcı etiketlemelisin.')
  let mute = msg.guild.roles.find(r => r.name === muteayarlari.muteroladi); //verilecek chat mute rolü ismi
          
  let mutetime = args[1];

  const muteembed = new Discord.RichEmbed()
  .setColor('RANDOM')    
  .addField(`${acarayarlar.tag} ${acarayarlar.sunucuadi}` , ` ${mod} adlı yetkili **<@${user.id}>** adlı kullanıcıyı **${reason}** sebebi ile sustururmasını kaldırıldı.`)
  .setFooter(msg.author.tag , msg.author.avatarURL)
    msg.channel.send(muteembed);
    db.set(`mute.${user.id}`,'0')
  setTimeout(function(){
    db.set(`mute.${user.id}`,'0') 
    user.removeRole(mute.id);
    
  }, ms(mutetime));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unmute",'uncmute'],
  permLevel: 0,
  kategori:'yetkili',
};

exports.help = {
  name: "unchatmute",
  description: "Belirttiğiniz kullanıcıyı belirttiğiniz zamana göre susturmasını kaldırır.",
  usage: ""
};

exports.acar = {
    acardizini: 'acar-unmute.js',
    acarprefix: acar.prefix,
};