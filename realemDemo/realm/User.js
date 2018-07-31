import RealmHelper from './RealmHelper'

class User extends RealmHelper {
  constructor() {
    super()
    this.schema = {
      name: 'User',
      properties: {
        id: 'string', // 用户Id
        username: 'string', // 用户名
        orgLabel: 'string', // 组织名称
        department: 'string', // 部门
      },
    }
    // return RealmHelper.call(this) // 继承属性
  }
}

export default User
