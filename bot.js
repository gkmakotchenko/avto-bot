const { Telegraf } = require('telegraf');
const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');

const bot = new Telegraf('6264805837:AAF4YdRnOfjtHWRZ9mv1PL0jvJrkZvNySuQ'); // Замените на ваш токен

const URL = 'https://tickets.hc-avto.ru/';
const TABLE_SELECTOR = '#tickets tbody';
let lastContent = '';

bot.command('startTracking',ctx => {
    setInterval(async () => {
        try {
            const response = await axios.get(URL);
            const $ = cheerio.load(response.data);
            const currentContent = $(TABLE_SELECTOR).html();
    
            if (currentContent !== lastContent) {
                lastContent = currentContent;
                // Отправка уведомления в Telegram
                await ctx.reply('Содержимое таблицы изменилось!' + '\n' + URL);
            } else {
                console.log('Ничего не изменилось')
            }
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }, 300000)
})

// Запускаем бота
bot.start((ctx) => ctx.reply('Бот запущен!'));
bot.launch().then(() => {
    console.log('Бот запущен и готов к работе!');
});
