const chalk = require('chalk');
const moment = require('moment');
require("moment-duration-format");
const Discord = require('discord.js');
const acarrpc = require('../acarregister/rpc.json');
const acar = require('../acarregister/botayarlari.json');


module.exports = client => {
var oyun = [
        acarrpc.durumbir
        //acarrpc.durumiki,
        //acarrpc.durumuc,
        //acarrpc.durumdort,
        //acarrpc.durumbes
    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);
       //client.user.setActivity(oyun[random], { type: acarrpc.durumtipi}); 
       client.user.setActivity(acarrpc.durumbir, { type: acarrpc.durumtipi}); 
            // Değerleri değiştirmek istiyorsanız /acarregister/rpc.json'dan değiştirebilirsiniz:
            // PLAYING: Oynuyor
            // WATCHING: İzliyor
            // LISTENING: Dinliyor
            // STREAMING: Yayında
        }, 2 * acarrpc.durumsuresi);
  client.user.setStatus(acarrpc.botdurumu);
            // Değerleri değiştirmek istiyorsanız /acarregister/rpc.json'dan değiştirebilirsiniz:
            // online: Çevrimiçi
            // dnd: Rahatsız Etmeyin
            // idle: Boşta
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] RPC ve Guard ayarları yüklendi.`);
  //client.channels.get(acar.botgiriskanal).join();
  
};