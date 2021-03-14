const Discord = require('discord.js');
exports.run = (client, message, args) => {
  
    const juke = new Discord.MessageEmbed()
    .setColor('GOLD')
    .setAuthor(`Guard Komutları`, client.user.avatarURL) 
      .setDescription('**[Sitemiz](https://www.fsbilisim.com/)**')
.setThumbnail(client.user.avatarURL)
      .addField('-spam = Spam koruması açarsınız.\n-spam-kapat =Spam korumasını kapatırsınız.\n-reklam = Reklam korumasını açarsınız.\n-reklam-kapat = Reklam korumasını kapatırsınız.\n-küfür = Küfür korumasını açarsınız.\n-küfür-kapat = Küfür korumasını kapatırsınız.\n-koruma = Koruma pakenitini açarsınız.\n-koruma-kapat = Koruma paketini kapatırsınız.\n-everhere-engel = Everyone here engelini açarsınız.\n-caps = Caps Lock korumasını açarsınız.\n-caps-kapat = Caps Lock korumasını kapatırsınız.\n-botkoruması = Bot korumasını açarsınız.\n-botkoruması-kapat = Bot korumasını kapatırsınız.')
    .setFooter(``, client.user.avatarURL)
    .setTimestamp()
    message.channel.send(juke).catch()

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'yardım',
      category: 'Yardım',
      description: 'Yardım kategorilerini gösteir.',
};