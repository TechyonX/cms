'use strict';

const utils = require("../../../misc/utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      if (data.name) {
        data.slug = utils.apply_slugify(data.name);
      }
    },
    async beforeUpdate(params, data) {
      if (data.name) {
        data.slug = utils.apply_slugify(data.name);
      }
    },
    // trigger хийхийг цөөлөх боломжтой бол цөөлөх
    afterCreate: utils.trigger_workflow,
    afterUpdate: utils.trigger_workflow,
    afterDelete: utils.trigger_workflow,
  },
};
