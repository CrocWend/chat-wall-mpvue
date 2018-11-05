import { getIMHandlerFactory } from "@/../static/im-sdk/im-factory";
import config from '../config/config';

export default class AppIMDelegate {
  constructor(app) {
    this._app = app;
  }

  onLaunch(options) {
    this.iIMHandler = getIMHandlerFactory;
  }

  onShow(options) {
    this.iIMHandler.createConnection({
      options: {
        url: config.socketUrl,
        appInfo: options.appInfo,
      }
    });
  }

  onHide() {

  }

  getIMHandlerDelegate() {
    return this.iIMHandler;
  }
}
