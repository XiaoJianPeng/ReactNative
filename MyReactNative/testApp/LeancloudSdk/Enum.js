// 请求返回code，200成功  211 账户不存在 210 密码或账号错误
const retCode = {
  ERR_BUSINESS: -100, // 后台接口业务判断返回错误码
  ERR_INTERNET_DISCONNECTED: -1,
  SUCCESS: 200,
  INPUT_ERROR: 210,
  NON_EXISTENT: 211,
  EXCEED_FAIL_TIMES: 219, // 超出失败次数
  EXCEED_REQUEST: 429, // 超出请求数量
  EXISTS: 137 // 数据已存在
}

const position = {
  HR: 'HR',
  HRM: 'HRM',
  CHO: 'CHO'
}

const status = {
  ALL: '全部',
  NO_DEAL: '未处理',
  DEALED: '已处理'
}

// 用户状态
const UserStatus = {
  DOUBLE_PERIOD: '双选期',
  PROBATION_PERIOD: '试用期',
  REGULAR: '已转正',
  LEAVE: '离职',
  PART_TIME_JOB: '兼职',
  VACATION: '长假',
  UNPAID_LEAVE: '停薪留职'
}

// 查询类型
const queryType = {
  equalTo: 'equalTo',
  notEqualTo: 'notEqualTo',
  greaterThan: 'greaterThan',
  greaterThanOrEqualTo: 'greaterThanOrEqualTo',
  lessThan: 'lessThan',
  lessThanOrEqualTo: 'lessThanOrEqualTo',
  startsWith: 'startsWith',
  contains: 'contains',
  notContains: 'notContains',
  containsAll: 'containsAll',
  notContainedIn: 'notContainedIn',
  exists: 'exists'
}
/**
 * 排序方式
 */
const sortWay = {
  ascending: 'ascending',
  descending: 'descending'
}
/**
 * 获取一周前的日期对象
 */
const OneWeekDate = new Date(new Date() - 7 * 24 * 3600 * 1000)

export default {
  retCode,
  position,
  status,
  UserStatus,
  OneWeekDate,
  queryType,
  sortWay
}
