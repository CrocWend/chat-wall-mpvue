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
    console.log('updateViewWhenReceive')
    
    this._page.allChatLength += 1;
    this._page.chatItems.push(msg);
    this._page.chatItems = this._page.chatItems.sort(UI._sortMsgListByTimestamp)
    this._page.autoScrollToLower();
    

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
    this._page.allChatLength += 1;
    console.log('updateDataWhenStartSending')
    // closeExtraView();
    console.log(this._page)
    sendMsg.sendStatus = 'sending';
    addToArr && this._page.chatItems.push(sendMsg);
    // let obj = {};
    // if(sendMsg.isMy) {
    //   obj['textMessage'] = '';
    // }
    // obj['chatItems'] = this._page.chatItems;
    needScroll && this._page.autoScrollToLower();
    // Object.assign(this._page, obj)
    this._page.$set(this._page, 'chatItems',  this._page.chatItems)
  }

  /**
   * 设置消息发送状态为 发送成功 更新信息
   * @param sendMsg
   * @param itemIndex
   */
  updateViewWhenSendSuccess(sendMsg, itemIndex) {
    console.log('发送成功', sendMsg);
    let item = this._page.chatItems[itemIndex];
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
    this._page.$set(this._page.chatItems[itemIndex], 'sendStatus',  status)
  }

  updateChatStatus(content, open = true) {
    this._page.$set(this._page, 'chatStatue',  open ? 'open' : 'close')
    this._page.$set(this._page, 'chatStatusContent',  content)
  }

  static _sortMsgListByTimestamp(item1, item2) {
    return item1.timestamp - item2.timestamp;
  }
}
