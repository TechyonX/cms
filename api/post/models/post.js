"use strict";

/**
 * Бичвэрийг хаягийн мөрөнд тохиромжтой хэлбэрт оруулах функц
 * @param {string} text - slug болгох бичвэр
 * @returns {string}
 */
const apply_slugify = (text) => {
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
      // Slug хоосон үед гарчигнаас автоматаар slug үүсгэнэ
      if (
        data.title &&
        (data.slug === null || data.slug === undefined || data.slug === "")
      ) {
        data.slug = apply_slugify(data.title);
      }

      // Publish_at хоосон боловч нийтлэсэн төлөвтэй байвал одоогийн огноог өгнө
      if (
        data.status === "published" &&
        (data.publish_at === undefined ||
          data.publish_at === null ||
          data.publish_at === "")
      ) {
        data.publish_at = new Date();
      }
    },
    async beforeUpdate(params, data) {
      // Slug хоосон үед гарчигнаас автоматаар slug үүсгэнэ
      if (
        data.title &&
        (data.slug === null || data.slug === undefined || data.slug === "")
      ) {
        data.slug = apply_slugify(data.title);
      }

      // Publish_at хоосон боловч нийтлэсэн төлөвтэй байвал одоогийн огноог өгнө
      if (
        data.status === "published" &&
        (data.publish_at === undefined ||
          data.publish_at === null ||
          data.publish_at === "")
      ) {
        data.publish_at = new Date();
      }
    },
  },
};
