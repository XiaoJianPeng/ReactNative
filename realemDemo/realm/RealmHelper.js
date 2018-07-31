import Realm from 'realm'

class RealmHelper {
  constructor() {
    this.schema = {}
    this.realm = {}
  }

  async open(schema) {
    if(!schema) {
      schema = [this.schema]
    }
    console.log('schema:', schema)
    try {
      await Realm.open({schema}).then((realm) => {
        this.realm = realm
        console.log(this.realm)
      })
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * 添加记录
   * @param {*} obj = {name:'objName', data:[{}], update:false}
   */
  async save(obj) {
    let result
    if(!obj.objName) {
      obj.objName = this.schema.name
    }
    console.log(this.realm)
    await this.realm.write(() => {
      obj.data.forEach(element => {
        this.realm.create(obj.objName, element, obj.update)
      })
      // const res = this.realm.create(obj.objName, obj.data)
      const resList = this.realm.objects(obj.objName) //.filtered('username = "Tom"');
      result = JSON.parse(JSON.stringify(resList))
    })
    return result
  }

  async delete(filters) {
    let result
    await this.realm.write(() => {
      this.realm.create(this.schema.name, obj);
      let deleteUsers
      if(filters) {
        // 删除单个对象
        deleteUsers = this.realm.objects(this.schema.name).filtered(filters )
      } else {
        deleteUsers = this.realm.objects(this.schema.name)
      }
      this.realm(deleteUsers)
      const users = this.realm.objects(this.schema.name) //.filtered('username = "Tom"');
      result = JSON.parse(JSON.stringify(users))
    })
    return result
  }

  close() {
    this.realm.close()
  }
}

export default RealmHelper
