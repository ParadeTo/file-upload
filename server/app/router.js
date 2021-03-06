'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/captcha', controller.utils.captcha);
  router.post('/uploadFile', controller.utils.uploadFile);
};
