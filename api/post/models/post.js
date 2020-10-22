"use strict";

const utils = require("../../../misc/utils");

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
        data.slug = utils.apply_slugify(data.title);
      }

      if (
        data.publish_at === null ||
        data.publish_at === undefined ||
        data.publish_at === ""
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
        data.slug = utils.apply_slugify(data.title);
      }

      if (
        data.publish_at === null ||
        data.publish_at === undefined ||
        data.publish_at === ""
      ) {
        data.publish_at = new Date();
      }
    },
    async afterCreate(data) {
      if (data.published) {
        utils.trigger_workflow();
      }
    },
    // trigger хийхийг цөөлөх боломжтой бол цөөлөх
    afterUpdate: utils.trigger_workflow,
    afterDelete: utils.trigger_workflow,
  },
};
