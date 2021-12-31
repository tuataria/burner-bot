require('dotenv').config();
const { Client, Team, User } = require('discord.js');

const bot = new Client();

bot.on('error', err => {
    console.error(err);
});

bot.on('message', async msg => {
    const prefix = ';';
    
    if (msg.content.toLowerCase().startsWith(prefix.toLowerCase())) {
        const cmd = msg.content.slice(prefix.length).split(' ')[0];
        const app = await bot.fetchApplication();
        let authorIsOwner = false;
    
        if (app.owner instanceof User) {
            if (app.owner.id === msg.author.id) authorIsOwner = true;
        } else if (app.owner instanceof Team) {
            if (app.owner.members.has(msg.author.id)) authorIsOwner = true;
        }

        if (authorIsOwner && cmd.toLowerCase() == 'burn') { 
            if (msg.guild.me.permissions.has('MANAGE_MESSAGES')) {
                const messages = await msg.channel.messages.fetch();

                for (const [, message] of messages) {
                    setTimeout(async () => {
                        await message.delete();
                        await msg.channel.send('🔥🔥🔥🔥🔥');
                    }, 5000);
                }
            } else {
                return;
            }
        } else {
            return;
        }
    }
});

bot.on('ready', () => {
    console.log('ready!');
});

bot.on('unhandledRejection', err => {
    console.error(err);
});

bot.login(process.env.BOT_TOKEN)
    .catch(err => console.error(err));