import Realm from 'realm'

class RealmHelper {
  constructor(schema) {
    this.schema = {}
    this.realm = new Realm({schema, schemaVersion: 1})
  }

  async open(schema) {
    if(!schema) {
      schema = [this.schema]
    }
    console.log('schema:', schema)
    try {
      await Realm.open({
        schema,
        schemaVersion: 1, // 版本
      }).then((realm) => {
        this.realm = realm
        console.log(this.realm)
      })
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * 添加记录
   * @param {{}} obj= {name:'对象名', data:[{}], update:false},update为true时根据主键id更新数据
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

  async delete(objName, filters) {
    let result
    if(!objName) {
      objName = this.schema.name
    }
    console.log('开始删除',  this.realm)
    await this.realm.write(() => {
      let deleteUsers
      if(filters) {
        // 根据条件获取删除对象
        deleteUsers = this.realm.objects(objName).filtered(filters )
      } else {
        deleteUsers = this.realm.objects(objName)
      }
      this.realm.delete(deleteUsers)
      const users = this.realm.objects(objName) //.filtered('username = "Tom"');
      result = JSON.parse(JSON.stringify(users))
    })
    return result
  }

  close() {
    this.realm.close()
  }
}

export default RealmHelper
