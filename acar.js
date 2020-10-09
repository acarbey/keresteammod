const Discord = require('discord.js');
const client = new Discord.Client();
const acar = require('./acarregister/botayarlari.json');
const muteayarlari = require('./acarregister/rol.json')
const chalk = require('chalk');
const fs = require('fs');
const ms = require('ms');
const moment = require('moment');
const Jimp = require('jimp');
const db = require('quick.db');
require('./acarutil/etkinlikler')(client);
const express = require('express');
const app = express();
var prefix = acar.prefix;
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
  
};
client.on('ready', () => {
   console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] Register botu sunucuda aktif hale getirilidi. www.acardev.net`);
   console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] RPC düzenlemesini ../acarregister/rpc.json'dan düzenleyebilirsin.`);
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./acarkomutlar/', (err, files) => {
  if (err) console.error(err);
  log(`( ${files.length} ) adet dizin ve komut algılandı ve yüklendi.`);
  files.forEach(f => {
    let props = require(`./acarkomutlar/${f}`);
    log(`Yüklenen komut ve dizin: ${props.acar.acarprefix}${props.help.name} & ${props.acar.acardizini}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./acarkomutlar/${command}`)];
      let cmd = require(`./acarkomutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./acarkomutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./acarkomutlar/${command}`)];
      let cmd = require(`./acarkomutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on("guildMemberAdd", async (member, message) => {

let m = await db.fetch(`mute.${member.id}`)
let j = await db.fetch(`jail.${member.id}`)
db.fetch(`mute.${member.id}`, '0');
db.fetch(`jail.${member.id}`, '0');
member.addRole(acar.kayıtsızrol)
member.setNickname(`${acar.tagsiz} ' ${acar.yenibiriisim}`)

  
if(j == '0' && m == '0') {
          member.addRole(acar.kayıtsızrol)
          member.setNickname(`${acar.tagsiz} ' ${acar.yenibiriisim}`)
}
  
if(j == '1') {
      member.removeRole(acar.kayıtsızrol) 
      member.addRole(acar.cezalırolid).then(x => {
        x.addRole(acar.cezalırolid)
        x.setNickname(acar.tagsiz +' '+ acar.cezaliisim)  
        x.removeRole(acar.kayıtsızrol)
    });
  let kanal = client.channels.get(acar.cezaişlemid) //log kanal ıd.
     kanal.send(`${member} adlı kullanıcı sunucuya katıldı jaildeyken çık gir yaptığı için yeniden jaile attım.`) 
   member.send(`Öncelikle sunucumuza hoşgeldin. Sen önceden jailde olduğun için seni yeniden jaile atmak zorunda kaldım!`)
    } 
if(m == '1') {
     member.addRole(acar.muterolid)
     member.addRole(acar.muterolid).then(x => {
        x.addRole(acar.muterolid)
        member.setNickname(`${acar.tagsiz} ' ${acar.yenibiriisim}`)
        x.addRole(acar.kayıtsızrol)
       x.addRole(acar.muterolid)
    });    
    let kanalmute = client.channels.get(acar.cezaişlemid)
      kanalmute.send(`${member} adlı kullanıcı sunucuda susturulmadan kaçtığı için süresi kalkana kadar tekrardan susturulmuştur.`)
      member.send(`Sunucumuza tekrardan geldiğin teşekkür ederiz fakat muteden kaçmak kolay değil.`)
  }
  let member2 = member.user;
  let zaman = new Date().getTime() - member2.createdAt.getTime();
  if (zaman < 604800000) {
     member.removeRole(acar.kayıtsızrol) 
      member.addRole(acar.şüphelirol).then(x => {
      x.addRole(acar.şüphelirol)
      x.removeRole(acar.kayıtsızrol)
      member.setNickname(`${acar.tagsiz} ' ${acar.yenibiriisim}`)
         const logChannelx = member.guild.channels.find(channel => channel.id === acar.şüphelilog);
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .addField(`${acar.tag} ${acar.sunucuadi}` , `${member} adlı kullanıcının hesabı __7__ (yedi) günden önce açıldığı için şüpheli rolü verildi!`)
logChannelx.send(embed)
    });
    }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === acar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
});

client.login(acar.token);
const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on("guildMemberAdd", async member => {
let acar1 = client.emojis.find(emoji => emoji.name === acar.hosgeldin1);
let acar2 = client.emojis.find(emoji => emoji.name === acar.hosgeldin2);
let acar3 = client.emojis.find(emoji => emoji.name === acar.hosgeldin3);
  let acar4 = client.emojis.find(emoji => emoji.name === acar.hosgeldin4);
  let acar5 = client.emojis.find(emoji => emoji.name === acar.hosgeldin5);
  let acar6 = client.emojis.find(emoji => emoji.name === acar.hosgeldin6);
  let acar7 = client.emojis.find(emoji => emoji.name === acar.hosgeldin7);
var kanal = member.guild.channels.get(acar.registerid);
  let user = client.users.get(member.id);
  let member2 = member.user;
  let zaman = new Date().getTime() - member2.createdAt.getTime();
  var cfxzaman = [];
  if (zaman < 604800000) {
    cfxzaman = `Şüpheli Hesap! ${acar.şüpheliemoji}`;
  } else {
    cfxzaman = `Güvenli Hesap! ${acar.güvenliemoji}`;
  }
       const user2 = member.user;
  var tarih = ''
            if(moment(user2.createdAt).format('MM') === '01') {
                var tarih = `${acar3} ${moment(user.createdAt).format('DD')} Ocak ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '02') {
                var tarih = `${acar3} ${moment(user.createdAt).format('DD')} Şubat ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '03') {
                var tarih = `${acar3} ${moment(user.createdAt).format('DD')} Mart ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '04') {
                var tarih = `${acar3} ${moment(user.createdAt).format('DD')} Nisan ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '05') {
                var tarih = `${acar3} ${moment(user.createdAt).format('DD')} Mayıs ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '06') {
                var tarih = `${acar3} ${moment(user.createdAt).format('DD')} Haziran ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '07') {
                var tarih = `${acar3} ${moment(user.createdAt).format('DD')} Temmuz ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '08') {
                var tarih = `${acar3} ${moment(user.createdAt).format('DD')} Ağustos ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '09') {
                var tarih = `${acar3} ${moment(user.createdAt).format('DD')} Eylül ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '10') {
                var tarih = `${acar3} ${moment(user.createdAt).format('DD')} Ekim ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '11') {
                var tarih = `${acar3} ${moment(user.createdAt).format('DD')} Kasım ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '12') {
                var tarih = `${acar3} ${moment(user.createdAt).format('DD')} Aralık ${moment(user2.createdAt).format('YYYY')} `
            }

  
  let dbayarfalanfilan = await db.fetch(`cfxdbayar${member.guild.id}`);
  var logchannel = member.guild.channels.get(acar.registerid);
  let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .addField("Hesap oluşturulma tarihi", tarih,  true)
    .setDescription(`**Welcome to ${acar.sunucuadicaps}**\n\n${acar1} Hoşgeldin, ${member} senin ile \`${member.guild.memberCount}\` üyeye ulaştık.\n${acar4} Kaydının yapılması için sesli odaya gelip ses vermen gerekli.\n${acar5} <#${acar.kurallar}> kanalını okumayı ihmal etmeyin.\n${acar6} <@&${acar.registercommandid}> rolündeki yetkililer sizinle iletişime geçecekler! \n${acar7} Kullanıcı : **${cfxzaman} \n **`)
    .setThumbnail(member.user.avatarURL);
  logchannel.send(embed);

  });