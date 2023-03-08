import request from '@/utils/request'

// 查询工艺水内机数据列表
export function listInner(query) {
  return request({
    url: '/modbus/inner/list',
    method: 'get',
    params: query
  })
}

// 查询工艺水内机数据详细
export function getInner(rowId) {
  return request({
    url: '/modbus/inner/' + rowId,
    method: 'get'
  })
}

// 新增工艺水内机数据
export function addInner(data) {
  return request({
    url: '/modbus/inner',
    method: 'post',
    data: data
  })
}

// 修改工艺水内机数据
export function updateInner(data) {
  return request({
    url: '/modbus/inner',
    method: 'put',
    data: data
  })
}

// 删除工艺水内机数据
export function delInner(rowId) {
  return request({
    url: '/modbus/inner/' + rowId,
    method: 'delete'
  })
}
