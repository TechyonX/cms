'use strict';

/**
 * Бичвэрийг хаягийн мөрөнд тохиромжтой хэлбэрт оруулах функц
 * @param {string} text - slug болгох бичвэр
 * @returns {string}
 */
const apply_slugify = text => {
    const slugify = require("slugify");
    
    slugify.extend({
      ж: "j",
      Ж: "J",
      ө: "o",
      Ө: "ө",
      ү: "u",
      Ү: "U",
      й: "i",
      Й: "I",
      ц: "ts",
      Ц: "Ts",
      ъ: "",
      Ъ: "",
    });

    return slugify(text, {
          lower: true,
          strict: true,
        });
};

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      if (data.name) {
        data.slug = apply_slugify(data.name);
      }
    },
    async beforeUpdate(params, data) {
      if (data.name) {
        data.slug = apply_slugify(data.name);
      }
    },
  },
};
