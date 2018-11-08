import {closeExtraView} from "../../components/chat-input/chat-input-tools";

/**
 * 用户处理消息的收发UI更新
 */
export default class UI {
  constructor(page) {
    this._page = page;
  }

  /**
   * 接收到消息时，更新UI
   * @param msg
   */
  updateViewWhenReceive(msg) {
    this._page.chatItems.push(msg);
    this._page.chatItems = this._page.chatItems.sort(UI._sortMsgListByTimestamp)
    this._page.scrollTopVal = this._page.chatItems.length * 999
  }

  /**
   * 发送消息时，渲染消息的发送状态为 发送中
   * @param sendMsg
   * @param cbOk
   */
  showItemForMoment(sendMsg, cbOk) {
    if (!sendMsg) return;
    this.updateDataWhenStartSending(sendMsg);
    cbOk && cbOk(this._page.chatItems.length - 1);
  }

  /**
   * 设置消息发送状态为 发送中
   * @param sendMsg
   * @param addToArr
   * @param needScroll
   */
  updateDataWhenStartSending(sendMsg, addToArr = true, needScroll = true) {
    closeExtraView();
    sendMsg.sendStatus = 'sending';
    addToArr && this._page.chatItems.push(sendMsg);
    let obj = {};
    obj['textMessage'] = '';
    obj['chatItems'] = this._page.chatItems;
    console.error(needScroll)
    needScroll && (obj['scrollTopVal'] = this._page.chatItems.length * 999);
    Object.assign(this._page, obj)
  }

  /**
   * 设置消息发送状态为 发送成功 更新信息
   * @param sendMsg
   * @param itemIndex
   */
  updateViewWhenSendSuccess(sendMsg, itemIndex) {
    console.log('发送成功', sendMsg);
    let that = this._page;
    let item = that.chatItems[itemIndex];
    item.timestamp = sendMsg.timestamp;
    item.largePic = sendMsg.largePic;
    item.content = sendMsg.content;
    item.userId = sendMsg.userId;
    this.updateSendStatusView('success', itemIndex);
  }

  updateListViewBySort() {
    this._page.chatItems = this._page.chatItems.sort(UI._sortMsgListByTimestamp)
  }

  /**
   * 设置消息发送状态为 发送失败
   * @param itemIndex
   */
  updateViewWhenSendFailed(itemIndex) {
    this.updateSendStatusView('failed', itemIndex);
  }

  updateSendStatusView(status, itemIndex) {
    let that = this._page;
    that.chatItems[itemIndex].sendStatus = status;
    let obj = {};
    obj[`chatItems[${itemIndex}].sendStatus`] = status;
    Object.assign(that, obj)
  }

  updateChatStatus(content, open = true) {

    Object.assign(this._page, {
      chatStatue: open ? 'open' : 'close',
      chatStatusContent: content
    })
  }

  static _sortMsgListByTimestamp(item1, item2) {
    return item1.timestamp - item2.timestamp;
  }
}
