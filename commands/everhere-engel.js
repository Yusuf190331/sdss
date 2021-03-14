const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
  message.react("✅");
     const hataembed = new Discord.MessageEmbed()
    .setColor("RED")
    .setTimestamp()
    .addField('HATA:', 'Bu komudu kullanabilmek için "Sunucuyu Yönet" yetkisine sahip olman gerek.')
          const hataembed1 = new Discord.MessageEmbed()
    .setColor("RED")
    .setTimestamp()
    .addField('HATA:', ':no_entry: Everyone Engel Sistemini Ayarlamak İçin \`a!everengel aç\` | Kapatmak İstiyorsanız \`a!everengel kapat\` Yazabilirsiniz')

  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(hataembed)
  if (!args[0]) return message.channel.send(hataembed1)
  if (args[0] !== 'aç' && args[0] !== 'kapat') return message.channel.send(hataembed1)

    if (args[0] == 'aç') {
    db.set(`ever_${message.guild.id}`, 'acik')
    let i = await db.fetch(`ever_${message.guild.id}`)
         const ok = new Discord.MessageEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Eylem:', 'Everyone Engeli Açtım.')
    message.channel.send(ok)   
     
  } 

  if (args[0] == 'kapat') {
    
    let üye = await db.fetch(`ever_${message.guild.id}`)
         const ever = new Discord.MessageEmbed()
    .setColor("RED")
    .setTimestamp()
    .addField('HATA:', 'Everyone engeli açtığına emin misin?')
    if (!üye) return message.channel.send(ever)
    
    
    db.delete(`ever_${message.guild.id}`)
         const hataembed = new Discord.MessageEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Eylem:', 'Everyone Engeli Kapattım.')
    message.channel.send(hataembed)
  }
 
};


exports.conf = {
 enabled: true,
 guildOnly: false,
  aliases: ['everyoneengel','everyone-engel','everyone'],
 permLevel: 0
};

exports.help = {
 name: 'everengel',
 description: '',
 usage: ''
};