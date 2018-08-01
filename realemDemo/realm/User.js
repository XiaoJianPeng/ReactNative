import RealmHelper from './RealmHelper'

const UserSchema = {
  name: 'User',
  primaryKey: 'id', // 主键
  properties: {
    id: 'string', // 用户Id
    username: 'string', // 用户名
    orgLabel: 'string', // 组织名称
    department: 'string', // 部门
  },
}
class User extends RealmHelper {
  constructor(schema) {
    super()
    this.schema = UserSchema
    // return RealmHelper.call(this) // 继承属性
  }
}
export {
  UserSchema
}
export default User
