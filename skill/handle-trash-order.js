'use strict';

module.exports = class SkillHandleTrashOrder {
  constructor() {
    this.required_parameter = {
      type: {
        message_to_confirm: {
          type: 'template',
          altText:
            '出前のメニューは松、竹、梅の3種類になっとりますけどどちらにしましょっ？',
          template: {
            type: 'buttons',
            text: '捨てたいゴミの種類は？',
            actions: [
              { type: 'message', label: '燃えるゴミ', text: '燃えるゴミ' },
              { type: 'message', label: '燃えないゴミ', text: '燃えないゴミ' },
                { type: 'message', label: 'ビン・カン', text: 'ビン・カン' },
                { type: 'message', label: 'ダンボール', text: 'ダンボール' },
            ],
          },
        },
        parser: async (value, bot, event, context) => {
          if (['燃えるゴミ', '燃えないゴミ', 'ビン・カン', 'ダンボール'].includes(value)) {
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
