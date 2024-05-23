import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

const botToken = String(process.env.TELEGRAM_BOT_TOKEN);
const chatId = String(process.env.TELEGRAM_CHAT_ID);

class TelegrafBot {
    private bot: Telegraf;

    constructor() {
        const bot = new Telegraf(botToken);

        bot.command('start', async (ctx) => {
            ctx.reply('Добро пожаловать!');
        });

        bot.command('help', async (ctx) => {
            ctx.reply('Как я могу помочь вам?');
        });

        bot.on(message('text'), async (ctx) => {
            ctx.reply(`Вы сказали: ${ctx.message.text}`);
        });

        bot.launch();

        this.bot = bot;
    }

    sendMessage(paylod: { message: string }) {
        this.bot.telegram.sendMessage(chatId, paylod.message);
    }
}

const telegrafBot = new TelegrafBot();

export default telegrafBot;
