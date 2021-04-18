const Discord = require('discord.js');
const client = new Discord.Client();
var fetch = require("cross-fetch");
var token = "token";
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.startsWith('st ')) {
    var id = msg.content.replace('st ', '');
      getPlayerStatus(id,msg);
  }
});


function getPlayerStatus(e,msg)
{
  fetch("https://api.rpgmobob.com/playerskills?n=" + e).then(function(e) {
            return e.json()
        }).then(function(a) {
           var acc = a.stats.accuracy != null ? a.stats.accuracy : 00;
           var def = a.stats.defense != null ? a.stats.defense : 00;
           var hp = a.stats.health != null ? a.stats.health : 00;
           var str = a.stats.strength != null ? a.stats.strength : 00;
           var mag = a.stats.magic != null ? a.stats.magic : 00;
           var arch = a.stats.archery != null ? a.stats.archery : 00;
           
            SendMessage(msg,e,acc,str,def,hp,mag,arch);
        }).catch(function(e) {

        })
}

function SendMessage(msg,name,acc, str, def ,hp ,mag, arch)
{
    const Embed = new Discord.MessageEmbed()
        .setColor(getRandomColor())
        .setTitle(name)
        .setURL('https://mo.ee')
        .setDescription('Combat Level : ' + calc_Cl(acc,str,def,hp,arch,mag))
        .addFields(
            { name: ':dagger: ', value: acc, inline: true },
            { name: ':crossed_swords: ', value: str, inline: true },
            
        )
        .addFields(
            { name: ':shield:', value: def , inline: true},
            { name: ':man_mage: ', value: mag, inline: true },
        )
        .addFields(
            { name: ':heart:', value: hp, inline: true},
            { name: ':bow_and_arrow: ', value: arch, inline: true },
        )
        .setTimestamp()
        .setFooter('by KSBot', '');
        console.log(name);

         msg.reply(Embed);
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function calc_Cl(acc,str,def,hp,arch,mag)
  {
    if(acc == 0) {acc = 1;}
    if(str == 0) {str = 1;}
    if(def == 0) {def = 1;}
    if(arch == 0) {arch = 1;}
    if(mag == 0) {mag = 1;}
    console.log(def);
    var divider = 4,
        magDev = 4,
        archDev = 4;
    if ((acc+str+def+hp+arch) / 4 > mag)
    {
      magDev = 6;
    } else {
      divider = 4;
    }
    if ((acc+str+def+hp+mag) / 4 > arch)
    {
      
      archDev= 6;
    } else {
      divider = 4;
    }
    return ~~((acc+str+def+hp) / 4 + (mag / magDev) + (arch / archDev));
    
  }
client.login(token);
