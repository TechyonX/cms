"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */
  async find(ctx) {
    let entities;

    ctx.query = {
      ...ctx.query,
      status: "published",
    };

    if (ctx.query._q) {
      entities = await strapi.services.post.search(ctx.query);
    } else {
      entities = await strapi.services.post.find(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.post })
    );
  },

  /**
   * Count records.
   *
   * @return {Number}
   */

  count(ctx) {
    ctx.query = {
      ...ctx.query,
      status: "published",
    };

    if (ctx.query._q) {
      return strapi.services.post.countSearch(ctx.query);
    }
    return strapi.services.post.count(ctx.query);
  },
};
