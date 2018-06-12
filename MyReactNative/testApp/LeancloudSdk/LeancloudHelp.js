import AV from 'leancloud-storage'

class LeancloudHelp {
  static getQuery (obName) {
    return new AV.Query(obName)
  }
  static createWithoutData (cls, id) {
    return AV.Object.createWithoutData(cls, id)
  }
  /* 获取单条数据
  * id ：要获取数据的objectId; obName: 对象名
  */
  static async getFormInfoById (id, obName) {
    let query = LeanCloudHelp.getQuery(obName)
    return query.get(id)
  }
  /**
   * 根据id删除一条数据 成功返回true 失败返回error
   * @param {*} obName：对象名
   * @param {*} id：id
   */
  static async destroyById (obName, id) {
    let result = null
    var object = AV.Object.createWithoutData(obName, id)
    await object.destroy().then(function (success) {
      result = true
    }, function (error) {
      throw error
    })
    return result
  }
  static async getList (objName) {
    let query = LeancloudHelp.getQuery(objName)
    let result = null
    await query.find().then(res => {
      result = res.map(item => {
        return item.toJSON()
      })
    }).catch( err => {
      console.error(err)
    })
    return result
  }
}

export default LeancloudHelp
