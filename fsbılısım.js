const Discord = require("discord.js");
const client = new Discord.Client();
const { Client, Util } = require("discord.js");
const fs = require("fs");
const ayarlar = require('./ayarlar.json');
const db = require('quick.db');
require("./util/eventLoader")(client);
var prefix = ayarlar.prefix;

 client.on("ready", async () => {
	client.user.setActivity(`AREX❤️GUARD 216`, {
type: "DND",
url: ""})
    .then(presence => console.log(`HERŞEY TAMAM AGAM ALTA ALABİLİRSİN BOTU`))
    .catch(console.error);
  let botVoiceChannel = client.channels.cache.get("");
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
});


//otoceap
client.on('message', msg => {
  if (msg.content.toLowerCase() === '-yardım') {
     msg.reply('https://cdn.discordapp.com/emojis/792745788744007691.png?v=1')

  }
});

//bot deme mesajları
  
  client.on("message", message => {
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        const dm = new Discord.MessageEmbed()
         .setTitle(`${client.user.username} - Dm Mesaj`)
         .setColor("#7289DA")
         .addField(`Mesajı Gönderen`,message.author.tag)
         .addField(`Gönderilen Mesaj`,message.content)
         .setThumbnail(message.author.avatarURL()) 
    client.channels.cache.get("818072735858294794").send(dm);
    }
});
  



client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`Yüklenen komut: ${ayarlar.prefix}${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g

client.login("ODE4MDczNzg2NzQ1NjE4NDgy.YESwlQ.PmfzPJu3PEVEaNl6t6ZccgnOkVg")
const data = require('quick.db');
const moment = require('moment');
moment.locale('tr');
const logs = require('discord-logs');
logs(client);


client.on('guildMemberAdd', async member => {
if(member.user.bot) {
const sistem = await data.fetch(`botkoruma.${member.guild.id}`);
const sistemm = await data.fetch(`korumalar.${member.guild.id}`);
if(sistem) {
member.guild.members.ban(member.id);
}
if(sistemm) {
member.guild.members.ban(member.id);
}
}
})



client.on('message', async message => {

const küfür = await data.fetch(`küfür.${message.guild.id}`);
if(!küfür) return;
const blacklist = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq"];
let content = message.content.split(' ');

content.forEach(kelime => {
if(blacklist.some(küfür => küfür === kelime))  {
if(message.member.hasPermission('BAN_MEMBERS')) return;
message.delete();
}
})

});

client.on('message', async message => {

const reklam = await data.fetch(`reklam.${message.guild.id}`);
if(!reklam) return;
const blacklist = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg"];

if(blacklist.some(a => message.content.includes(a)))  {
if(message.member.hasPermission('BAN_MEMBERS')) return;
message.delete();
}

});

const dctrat = require('dctr-antispam.js'); 

var authors = [];
var warned = [];

var messageLog = [];

client.on('message', async message => {
const spam = await data.fetch(`spam.${message.guild.id}`);
if(!spam) return;
const maxTime = await data.fetch(`max.${message.guild.id}.${message.author.id}`);
const timeout = await data.fetch(`time.${message.guild.id}.${message.author.id}`);
data.add(`mesaj.${message.guild.id}.${message.author.id}`, 1)
if(timeout) {
const sayı = await data.fetch(`mesaj.${message.guild.id}.${message.author.id}`);
if(Date.now() < maxTime) {
return message.delete();
}
} else {
data.set(`time.${message.guild.id}.${message.author.id}`, 'ok');
data.set(`max.${message.guild.id}.${message.author.id}`, Date.now()+5000);
setTimeout(() => {
data.delete(`mesaj.${message.guild.id}.${message.author.id}`);
data.delete(`time.${message.guild.id}.${message.author.id}`);
}, 500)
}

});

client.on('message', async message => {

if(message.content.length > 4) {

const caps = await data.fetch(`caps.${message.guild.id}`);
if(!caps) return;

let kontrol = message.content.toUpperCase()
if(message.content == kontrol) {

if(message.member.permissions.has('BAN_MEMBERS')) return;
if(message.mentions.users.first()) return;

return message.delete();

}}});


client.on('roleDelete', async role => {
const sistem = await data.fetch(`korumalar.${role.guild.id}`);
if(!sistem) return;

let guild = role.guild;
const entry = await guild.fetchAuditLogs({ type: "ROLE_DELETE" }).then(audit => audit.entries.first());
let member = entry.executor;

if(member.id == guild.owner.user.id) return;
let yetkili = guild.members.cache.get(member.id);
yetkili.roles.cache.forEach(s => {
if(s.permissions.has('MANAGE_ROLES')) return member.roles.remove(s.id);
})
});

client.on('roleUpdate', async (oldRole, newRole) => {
const sistem = await data.fetch(`korumalar.${newRole.guild.id}`);
if(!sistem) return;

let guild = newRole.guild;
const entry = await guild.fetchAuditLogs({ type: "ROLE_UPDATE" }).then(audit => audit.entries.first());
let member = entry.executor;

if(oldRole.permissions.has('ADMINISTRATOR') && newRole.permissions.has('ADMINISTRATOR')) {
if(member.id == guild.owner.user.id) return;
let yetkili = guild.members.cache.get(member.id);
yetkili.roles.cache.forEach(s => {
if(s.permissions.has('ADMINISTRATOR')) return member.roles.remove(s.id);
})
}
});

client.on('guildBanAdd', async member => {
const sistem = await data.fetch(`korumalar.${member.guild.id}`);
if(!sistem) return;

let guild = member.guild;
const entry = await guild.fetchAuditLogs({ type: "MEMBER_BAN_ADD" }).then(audit => audit.entries.first());
let yetkili = entry.executor;

if(yetkili.id == guild.owner.user.id) return;
yetkili.roles.cache.forEach(s => {
if(s.permissions.has('BAN_MEMBERS')) return yetkili.roles.remove(s.id);
})
guild.members.unban(member.id);
})

client.on('channelDelete', async channel => {
const sistem = await data.fetch(`korumalar.${channel.guild.id}`);
if(!sistem) return;

let guild = channel.guild;
const entry = await guild.fetchAuditLogs({ type: "CHANNEL_DELETE" }).then(audit => audit.entries.first());
let member = entry.executor;

if(member.id == guild.owner.user.id) return;
let yetkili = guild.members.cache.get(member.id);
yetkili.roles.cache.forEach(s => {
if(s.permissions.has('MANAGE_CHANNELS')) return yetkili.roles.remove(s.id);
})

channel.clone({ name: channel.name });
})

client.on('emojiDelete', async emoji => {
const sistem = await data.fetch(`korumalar.${emoji.guild.id}`);
if(!sistem) return;

let guild = emoji.guild;
const entry = await guild.fetchAuditLogs({ type: "EMOJI_DELETE" }).then(audit => audit.entries.first());
let member = entry.executor;

if(member.id == guild.owner.user.id) return;
let yetkili = guild.members.cache.get(member.id);
yetkili.roles.cache.forEach(s => {
if(s.permissions.has('MANAGE_EMOJIS')) return yetkili.roles.remove(s.id);
})

guild.emojis.create(emoji.url, emoji.name);
})



client.on("message", async msg => {
  var sistem = await db.fetch(`ddos`);
  if (sistem === true) {
    if (client.ws.ping > 400) {
      var bölgeler = [
        "singapore",
        "eu-central",
        "india",
        "us-central",
        "london",
        "eu-west",
        "amsterdam",
        "brazil",
        "us-west",
        "hongkong",
        "us-south",
        "southafrica",
        "us-east",
        "sydney",
        "frankfurt",
        "russia"
      ];
      var yeniBölge = bölgeler[Math.floor(Math.random() * bölgeler.length)];
      msg.guild.setRegion(yeniBölge);
      let kanal = msg.guild.channels.cache.find(c => c.name === "anti-ddos");
      if (!kanal) {
        msg.guild.channels.create(`anti-ddos`, `text`).then(ch => {
          let ever = msg.guild.roles.cache.find(r => r.name === "@everyone");
          ch.createOverwrite(ever, {
            VIEW_CHANNEL: false
          });
          setTimeout(async function() {
            ch.send(
              `<@${msg.guild.ownerID}>, sunucunun pingi yükseldiğinden dolayı saldırı ihtimaline karşı bölgeyi değiştirdim.`
            );
          }, 1500);
        });
      } else {
        kanal.send(
          `<@${msg.guild.ownerID}>, sunucunun pingi yükseldiğinden dolayı saldırı ihtimaline karşı bölgeyi değiştirdim.`
        );
      }
    }
  } else {
  }
});

//everyone&here

client.on('message', async message => {
  let i = await db.fetch(`ever_${message.guild.id}`)
  if (!i) return;
  if (message.content.includes('@everyone'))
  if (!message.member.hasPermission("ADMINISTRATOR")){
    message.reply(`Lütfen **everyone** Kullanmayınız.!!`)
    message.delete()
  
  }
});
client.on('message', async message => {
  let i = await db.fetch(`ever_${message.guild.id}`)
    if (!i) return;
  if (message.content.includes('@here'))
  if (!message.member.hasPermission("ADMINISTRATOR")){
    message.reply(`Lütfen **here** Kullanmayınız.!!`)
    message.delete()
    
  }
 
})

//modlog.js
const botadi = "guard"


client.on('guildBanAdd', async (guild, user) => {
  let modlogs = db.get(`modlogkanaly_${guild.id}`)
  const modlogkanal = guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Bir kişi sunucudan yasaklandı")
    .setThumbnail(user.avatarURL||user.defaultAvatarURL)
    .addField(`Yasaklanan kişi`, `\`\`\` ${user.tag} \`\`\` `)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});


client.on('guildBanRemove', async (guild, user) => {
 let modlogs = db.get(`modlogkanaly_${guild.id}`)
  const modlogkanal = guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Bir kişinin yasağı kaldırıldı")
    .setThumbnail(user.avatarURL||user.defaultAvatarURL)
    .addField(`Yasağı kaldırılan kişi`, `\`\`\` ${user.tag} \`\`\` `)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});


client.on('channelCreate', async channel => {
 let modlogs = db.get(`modlogkanaly_${channel.guild.id}`)
 let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first())
 let user = client.users.cache.get(entry.executor.id)
  const modlogkanal = channel.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (channel.type === "text") {
      let embed = new Discord.MessageEmbed()
      .setColor("#fffa00")
      .setAuthor("Bir Kanal Oluşturuldu")
      .addField(`Oluşturulan Kanalın İsmi : `, `${channel.name}`)
      .addField(`Oluşturulan Kanalın Türü : `, `Yazı`)
      .addField(`Kanalı Oluşturan : `, `<@${user.id}>`)
      .setFooter(`${botadi} | Mod-Log Sistemi`)
      .setTimestamp()
      modlogkanal.send(embed)
    }
      if (channel.type === "voice") {
      
        let embed = new Discord.MessageEmbed()
        .setColor("#fffa00")
        .setAuthor("Bir Kanal Oluşturuldu")
        .addField(`Oluşturulan Kanalın İsmi : `, `${channel.name}`)
        .addField(`Oluşturulan Kanalın Türü : `, `Ses`)
        .addField(`Kanalı Oluşturan : `, `<@${user.id}>`)
        .setFooter(`${botadi} | Mod-Log Sistemi`)
        .setTimestamp()
        modlogkanal.send(embed)


    }
}});

client.on('channelDelete', async channel => {
      let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first())
  let user = client.users.cache.get(entry.executor.id)
 let modlogs = db.get(`modlogkanaly_${channel.guild.id}`)
  const modlogkanal = channel.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (channel.type === "text") {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Bir Kanal Silindi")
    .addField(`Silinen Kanalın İsmi : `, `${channel.name}`)
    .addField(`Silinen Kanalın Türü : `, `Yazı`)
    .addField(`Kanalı Silen : `, `<@${user.id}>`)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
      if (channel.type === "voice") {

        let embed = new Discord.MessageEmbed()
        .setColor("#fffa00")
        .setAuthor("Bir Kanal Silindi")
        .addField(`Silinen Kanalın İsmi : `, `${channel.name}`)
        .addField(`Silinen Kanalın Türü : `, `Ses`)
        .addField(`Kanalı Silen : `, `<@${user.id}>`)
        .setFooter(`${botadi} | Mod-Log Sistemi`)
        .setTimestamp()
        modlogkanal.send(embed)
       }
      }
    });

client.on('roleDelete', async role => {
 let modlogs =  db.get(`modlogkanaly_${role.guild.id}`)
  let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first())
  let user = client.users.cache.get(entry.executor.id)
 const modlogkanal = role.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Bir Rol Silindi")
    .addField(`Silinen Rolün İsmi : `, `${role.name}`)
    .addField(`Rolü Silen : `, `<@${user.id}>`)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});

client.on('emojiDelete', async emoji => {
 let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`)
 let entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first())
 let user = client.users.cache.get(entry.executor.id)
  const modlogkanal = emoji.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Bir Emoji Silindi")
    .addField(`Silinen Emojinin İsmi : `, `${emoji.name}`)
    .addField(`Emojiyi Silen : `, `<@${user.id}>`)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});


client.on('roleCreate', async role => {
let modlogs =  db.get(`modlogkanaly_${role.guild.id}`)
let entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first())
let user = client.users.cache.get(entry.executor.id)
  const modlogkanal = role.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Bir Rol Oluşturuldu")
    .addField(`Oluşturulan Rolün İsmi : `, `${role.name}`)
    .addField(`Rolü Oluşturan : `, `<@${user.id}>`)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});


client.on('emojiCreate', async emoji => {
 let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`)
 let entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first())
 let user = client.users.cache.get(entry.executor.id)
  const modlogkanal = emoji.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Bir Emoji Oluşturuldu")
    .addField(`Oluşturulan Emojinin İsmi : `, `${emoji.name}`)
    .addField(`Emoji Silen : `, `<@${user.id}>`)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});

//MESAJ LOG

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (newMessage.author.bot || newMessage.channel.type === "dm") return;
  if (newMessage.content.startsWith(prefix)) return;
  let sc = await db.fetch(`modlogkanaly_${newMessage.guild.id}`);
  let scbul = newMessage.guild.channels.cache.get(sc)
  if(!scbul) {
    
  }
  if (oldMessage.content == newMessage.content) return;
  let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL)
    .addField("Kullanıcı", newMessage.author)
    .addField("Eski Mesaj", "```" + oldMessage.content + "```")
    .addField("Yeni Mesaj", "```" + newMessage.content + "```")
    .addField("Kanal Adı", newMessage.channel.name)
    .addField("Mesaj ID", newMessage.id)
    .addField("Kullanıcı ID", newMessage.author.id)
    .setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours() +
        3}:${newMessage.createdAt.getMinutes()}`
    );
  scbul.send(embed);
});

client.on("messageDelete", async deletedMessage => {
  if (deletedMessage.author.bot || deletedMessage.channel.type === "dm") return;
  if (deletedMessage.content.startsWith(prefix)) return;
  let sc = await db.fetch(`modlogkanaly_${deletedMessage.guild.id}`);
  let scbul = deletedMessage.guild.channels.cache.get(sc)
  if(!scbul) {
    
  }
  let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor(`Mesaj Silindi`, deletedMessage.author.avatarURL)
    .addField("Kullanıcı", deletedMessage.author)
    .addField("Silinen Mesaj", "```" + deletedMessage.content + "```")
    .addField("Kanal Adı", deletedMessage.channel.name)
    .addField("Mesaj ID", deletedMessage.id)
    .addField("Kullanıcı ID", deletedMessage.author.id)
    .setFooter(`Bilgilendirme  • bügün saat ${deletedMessage.createdAt.getHours() +
        3}:${deletedMessage.createdAt.getMinutes()}`
    );
  scbul.send(embed);
});


//botu etiketleyince prefix ve söylemesi
  client.on("message", msg => {
    //let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
    const westrabumbe = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Prefixim: ${prefix}\n Yardım için: ${prefix}yardım. `)
    if (msg.content.includes(`<@${client.user.id}>`) || msg.content.includes(`<@!${client.user.id}>`)) {
      msg.channel.send(westrabumbe);
    }
  });


 ///rolkoruma
client.on("roleCreate", async (rolee, member, guild) => {
  let rolkoruma = await db.fetch(`rolk_${rolee.guild.id}`);
  if (rolkoruma == "acik") {
    rolee.delete();
    const embed = new Discord.MessageEmbed()
      .setDescription(
        "Sunucunuzda yeni bir rol oluşturuludu! fakat geri silindi! (Rol Koruma Sistemi)"
      )
      .setColor("BLACK");
    rolee.guild.owner.send(embed);
    return;
  } else {
    return;
  }
});

client.on("roleDelete", async role => {
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  if (entry.executor.id == client.user.id) return;
  if (entry.executor.id == role.guild.owner.id) return;
  if(!entry.executor.hasPermission('ROLE_DELETE')) {
      role.guild.roles.create({
    name: role.name,
    color: role.hexColor,
    permissions: role.permissions
  });
   let emran = new Discord.MessageEmbed()
   .setColor('0x36393E')
   .setTitle(`Bir rol silindi !`)
   .setDescription(`Silinen rol adı ${role.name}, Rol koruma sistemi açık olduğu için rol geri oluşturuldu!`)
   client.channels.cache.get(kanal).send(emran)
  }
});