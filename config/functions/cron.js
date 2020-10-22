"use strict";

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 */

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
  // '0 1 * * 1': () => {
  //
  // }
  "*/1 * * * *": async () => {
    // fetch posts to publish
    const draftPostToPublish = await strapi.api.post.services.post.find({
      status: "scheduled",
      publish_at_lt: new Date(),
    });

    // update status of posts
    draftPostToPublish.forEach(async (post) => {
      await strapi.api.post.services.post.update(
        { id: post.id },
        { status: "published" }
      );
    });
  },
};
