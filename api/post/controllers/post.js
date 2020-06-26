'use strict';
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

  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.author = ctx.state.user.id;
      entity = await strapi.services.post.create(data, { files });
    } else {
      ctx.request.body.author = ctx.state.user.id;
      entity = await strapi.services.post.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.post });
  },

  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;

    const [article] = await strapi.services.article.find({
      id: ctx.params.id,
      "author.id": ctx.state.user.id,
    });

    if (!article) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.post.create(data, { files });
    } else {
      entity = await strapi.services.post.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.post });
  },

  /**
   * delete a record.
   *
   * @return {Object}
   */

  async delete(ctx) {
    const { id } = ctx.params;

    const [article] = await strapi.services.article.find({
      id: id,
      "author.id": ctx.state.user.id,
    });

    if (!article) {
      return ctx.unauthorized(`You can't delete this entry`);
    }

    const entity = await strapi.services.restaurant.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.restaurant });
  },
};
