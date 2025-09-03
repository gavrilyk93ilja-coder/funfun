const { Telegraf } = require('telegraf');
const bot = new Telegraf('YOUR_BOT_TOKEN');

function notifyNewOrder(order) {
  const message = `🛒 Новый заказ:\nТовар ID: ${order.product}\nПокупатель ID: ${order.buyer}`;
  bot.telegram.sendMessage('YOUR_ADMIN_CHAT_ID', message);
}

bot.launch();
module.exports = { notifyNewOrder };
