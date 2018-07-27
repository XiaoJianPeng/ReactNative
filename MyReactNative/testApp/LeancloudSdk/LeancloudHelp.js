import AV from 'leancloud-storage'
import Enum from './Enum'

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
    let query = LeancloudHelp.getQuery(obName)
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
  /**
   * 设置查询条件
   * @param {*} query 对象
   * @param {*} colName 字段名
   * @param {*} colValue 字段值
   * @param {*} queryType 查询类型
   */
  static setQuueryParam (query, colName, colValue, queryType) {
    switch (queryType) {
      case Enum.queryType.equalTo: // 等于
        query.equalTo(colName, colValue)
        break
      case Enum.queryType.notEqualTo: // 不等于
        query.notEqualTo(colName, colValue)
        break
      case Enum.queryType.greaterThan: // 大于
        query.greaterThan(colName, colValue)
        break
      case Enum.queryType.greaterThanOrEqualTo: // 大于等于
        query.greaterThanOrEqualTo(colName, colValue)
        break
      case Enum.queryType.lessThan: // 小于
        query.lessThan(colName, colValue)
        break
      case Enum.queryType.lessThanOrEqualTo: // 小于等于
        query.lessThanOrEqualTo(colName, colValue)
        break
      case Enum.queryType.startsWith: // 前缀查询
        query.startsWith(colName, colValue)
        break
      case Enum.queryType.contains: // 包含
        query.contains(colName, colValue)
        break
      case Enum.queryType.notContains: // 不包含
        let regExp = new RegExp('^((?!' + colValue + ').)*$', 'i')
        query.matches(colName, regExp)
        break
      case Enum.queryType.containsAll: // 数组包含 colValue 是一个数组
        query.containsAll(colName, colValue)
        break
      case Enum.queryType.notContainedIn: // 数组全包不含 colValue 是一个数组
        query.notContainedIn(colName, colValue)
        break
      case Enum.queryType.exists: // 空值查询
        query.exists(colName)
        break
      default:
        query.equalTo(colName, colValue)
    }
  }
  /**
   * 数据列表获取
   * @param {*} objName 对象名
   * @param {[{colName: '查询字段名', value: '查询条件', queryType: '查询类型'}]}
   *         params 参数列表 接收数组格式 []
   * @param {*} limit 页大小
   * @param {*} currpage 当前页
   * @param {[{sortWay: '排序方式', colName: '字段名'}]} sorts 排序规则
   */
  static async getList (objName, params, limit, currpage, sorts) {
    let query = LeancloudHelp.getQuery(objName)
    let result = {
      total: 0,
      data: []
    }
    params.forEach(element => {
      if (element.value !== undefined && element.value !== null && element.value !== '') {
        let paramValue = null
        // 判断传入的参数是否需要构建对象
        if (element.cls === undefined || element.cls === null || element.cls.length === 0) {
          paramValue = element.value
        } else {
          paramValue = LeancloudHelp.createWithoutData(element.cls, element.value)
        }
        LeancloudHelp.setQuueryParam(query, element.colName, paramValue, element.queryType)
      }
    })
    query.count().then(num => {
      result.total = num;
    }).catch(err => {
      throw err
    })
    query.limit(limit)
    query.skip((currpage-1)*limit)
    if (sorts === undefined || sorts === null || sorts.length === 0) {
      query.addAscending('createdAt')
    } else {
      for (let i = 0; i < sorts.length; i++) {
        if (sorts[i].sortWay === Enum.sortWay.ascending) {
          query.addAscending(sorts[i].colName)
        } else {
          query.addDescending(sorts[i].colName)
        }
      }
    }
    await query.find().then(res => {
      result.data = res.map(item => {
        return item.toJSON()
      })
    }).catch( err => {
      console.error(err)
    })
    return result
  }
}

export default LeancloudHelp
