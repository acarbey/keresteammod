const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db")
const client = new Discord.Client();
const acarayarlar = require('../acarregister/botayarlari.json');
const muteayarlari = require('../acarregister/rol.json')
let acar = require('../acarregister/botayarlari.json');

exports.run = async (receivedMessage, msg,  args) => {
if (!msg.member.roles.has(acarayarlar.mutecommandid) && !msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Bir yetkili değilsin bu yüzden komutu kullanamazsın!")
var mod = msg.author
let user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
let reason = args[2] || `Sebep girilmemiş.`;
if (!user) return msg.reply('Bir kullanıcı etiketlemelisin.').then(msg => msg.delete(5000));
if (user.user.bot) return msg.reply("Bot'a mute atamazsınız!").then(msg => msg.delete(5000));
if (user.highestRole.position >= msg.member.highestRole.position || !user.bannable) return  msg.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.tag} ${acarayarlar.sunucuadi} Moderasyon`, `${acarayarlar.ünlem}  Bu kullanıcıyı susturmanız için yeterli yetkiye sahip değilsiniz!`).setColor("RANDOM"));
      if(!reason) return msg.reply('Mute atabilmem için bir sebep girmelisin.').then(msg => msg.delete(5000));

  let mute = msg.guild.roles.find(r => r.name === muteayarlari.muteroladi); //verilecek chat mute rolü ismi
          
  let mutetime = args[1];
  if(!mutetime) return msg.reply('Lütfen susturabilmem için bir süre belirleyiniz.').then(msg => msg.delete(5000));
if(!mute){
      mute = await msg.guild.createRole({
        name: muteayarlari.muteroladi,
        color: muteayarlari.muterolrengi,
        permissions:[]
      })
      msg.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(mute, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
  
    }
  
  
  await(user.addRole(mute.id));
  let mutezaman = args[1]
.replace(`d`," Gün")
.replace(`s`," Saniye")
.replace(`h`," Saat")
.replace(`m`," Dakika")
.replace(`w`," Hafta")
  
  const muteembed = new Discord.RichEmbed()
  .setColor('RANDOM')    
  .addField(`${acarayarlar.tag} ${acarayarlar.sunucuadi}` , ` ${mod} adlı moderatör susturma kullandı.**<@${user.id}>** adlı kullanıcı **${reason}** sebebi ile ${mutezaman} susturuldu.`)
  .setFooter(msg.author.tag , msg.author.avatarURL)
    msg.channel.send(muteembed);
  db.set(`mute.${user.id}`, '1') 
  setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
    db.set(`mute.${user.id}`,'0') 
      const muteembed = new Discord.RichEmbed()
      .setDescription(`<@${user.id}> süren doldu, artık konuşabilirsin!`)
        msg.channel.send(muteembed)
    user.removeRole(mute.id);
    
  }, ms(mutetime));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mute",'cmute'],
  permLevel: 0,
  kategori:'yetkili',
};

exports.help = {
  name: "chatmute",
  description: "Belirttiğiniz kullanıcıyı belirttiğiniz zamana göre susturur.",
  usage: ""
};

exports.acar = {
    acardizini: 'acar-chatmute.js',
    acarprefix: acar.prefix,
};