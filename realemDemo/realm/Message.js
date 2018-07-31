import RealmHelper from './RealmHelper'

class Message extends RealmHelper {
  constructor() {
    super()
    this.schema = {
      name: 'Message',
      properties: {
        id: 'string', // 用户Id
        type: 'int', // 用户名
        text: 'string', // 组织名称
      },
    }
    // return RealmHelper.call(this) // 继承属性
  }
}

export default Message
