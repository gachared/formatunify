module.exports = class SkillHandleDeliveryOrder {
  constructor() {
    this.required_parameter = {
      type: {
        message_to_confirm: {
          type: 'template',
          altText:
            '出前のメニューは松、竹、梅の3種類になっとりますけどどちらにしましょっ？',
          template: {
            type: 'buttons',
            text: 'ご注文は？',
            actions: [
              { type: 'message', label: '燃える', text: '燃える' },
              { type: 'message', label: '燃えない', text: '燃えない' },
              { type: 'message', label: '段ボール', text: '段ボール' },
            ],
          },
        },
        parser: async (value, bot, event, context) => {
          if (['燃える', '燃えない', '段ボール'].includes(value)) {
            return value;
          }

          throw new Error();
        },
        reaction: async (error, value, bot, event, context) => {
          if (error) return;

          bot.queue({
            type: 'text',
            text: `あいよっ！${value}ね。`,
          });
        },
      },
      address: {
        message_to_confirm: {
          type: 'text',
          text: 'どちらにお届けしましょっ？',
        },
        parser: async (value, bot, event, context) => {
          if (typeof value === 'string') {
            return value;
          }
          if (typeof value === 'object' && value.type === 'location') {
            return value.address;
          }

          throw new Error();
        },
      },
    };
  }

  async finish(bot, event, context) {
    await bot.reply({
      type: 'text',
      text: `あいよっ。じゃあ${context.confirmed.type}を30分後くらいに${context.confirmed.address}にお届けしますわ。おおきに。`,
    });
  }
};
