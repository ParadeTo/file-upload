'use strict';
const svgCaptcha = require('svg-captcha');
const fse = require('fs-extra');
const BaseController = require('./base');
const Controller = require('egg').Controller;

class UtilsController extends BaseController {
  async captcha() {
    const captcha = svgCaptcha.create();
    console.log(captcha);
    const { ctx } = this;
    ctx.session.captcha = captcha.text;
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data;
  }

  async uploadFile() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const { name } = ctx.request.body;
    await fse.move(file.filepath, this.config.UPLOAD_DIR + '/' + file.filename);
    console.log(file, name);
    this.success({
      url: `/public/${file.filename}`,
    });
  }
}

module.exports = UtilsController;
