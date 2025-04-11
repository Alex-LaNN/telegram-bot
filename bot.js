import dotenv from "dotenv";
import { Telegraf } from "telegraf";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// /start command handler
bot.start((ctx) => {
  ctx.reply("...");
});

// Forwarded Message Handler
bot.on("message", async (ctx) => {
  // Receive the text of the forwarded message
  const forwardedText = ctx.message.text;

  // Create an inline keyboard with two buttons: "Create new lead in the CRM" and "Skip this"
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Create new lead in the CRM", callback_data: "create_lead" }],
        [{ text: "Skip this", callback_data: "skip" }],
      ],
    },
  };

  // Send the original message without changes with inline buttons
  await ctx.reply(forwardedText, keyboard);
});

// Handler for clicking on the button "Create new lead in the CRM"
bot.action("create_lead", async (ctx) => {
  // Do nothing
  await ctx.answerCbQuery(); // Confirm the button press
});

// Button click handler "Skip this"
bot.action("skip", async (ctx) => {
  // Send a message "Закончил работу с сообщением" without buttons
  await ctx.reply("Закончил работу с сообщением");
  await ctx.answerCbQuery(); // Confirm pressing the button
});

// Launch the bot
bot
  .launch()
  .then(() => console.log("Бот запущен!"))
  .catch((err) => console.error("Ошибка запуска бота:", err));

// Handling graceful shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
