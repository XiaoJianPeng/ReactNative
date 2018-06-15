import {Realtime, Event, TextMessage} from 'leancloud-realtime';
import AV from 'leancloud-storage';

class RealtimeHelp extends Realtime {
  constructor () {
    super({
      appId: 'VKJfEk81YqWIqkxLtqxlyGpH-gzGzoHsz',
      appKey: 'H1hrm0dJWbnpzFAS6jJRsmuD',
      // plugins: [TypedMessagesPlugin], // 注册富媒体消息插件
    })
  }
  /**
   * 启动实施通信，并发送一条信息
   */
  async createIMCClient (receiver ='xiao', conversationName) {
    let username = AV.User.current().get('username')
    // 用户名admin作为clientId ,获取IMClient对象实例
    await this.createIMClient(username).then(function(res) {
      // 创建与receiver之间的对话
      return res.createConversation({
        members: [receiver],
        name: username + ' & ' + receiver + '的测试',
        transient: false,
        unique: true,
      });
    }).then(function(conversation) {
      // 发送消息
      return conversation.send(new TextMessage('你好！这是测试消息！')); 
    }).then(function(message) {
      console.warn(username + ' & ' + receiver, '发送成功！', message);
    }).catch(console.error);
  }

  /**
   * 接收消息
   */
  receivedMsg (newMsg) {
    let username = AV.User.current().get('username');
    this.createIMClient(username).then((res) => {
      res.on(Event.MESSAGE, function(message, conversation) {
        newMsg = message.text;
        alert('1'+newMsg)
      });
    }).catch(err => console.error(err));
  }
}

export default RealtimeHelp
