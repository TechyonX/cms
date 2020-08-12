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
 * Github workflow-г дуудаж ажиллуулах
 */
const trigger_workflow = async () => {
  const axios = require("axios");
  const webhook = strapi.config.get("server.github.webhook", "");
  const token = strapi.config.get("server.github.token", "");
  if (token !== "" && webhook !== "") {
    axios
      .post(
        webhook,
        {
          event_type: "entry_change",
        },
        {
          headers: {
            Authorization: "token " + token,
            Accept: "application/vnd.github.v3+json",
          },
        }
      )
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
};

exports.apply_slugify = apply_slugify;
exports.trigger_workflow = trigger_workflow;