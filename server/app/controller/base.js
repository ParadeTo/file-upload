'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 0,
      data,
    };
  }
  message(message) {
    this.ctx.body = {
      code: 0,
      message,
    };
  }
}

module.exports = BaseController;
