import request from '@/utils/request'

// 查询工艺水外机数据列表
export function listOuter(query) {
  return request({
    url: '/modbus/outer/list',
    method: 'get',
    params: query
  })
}

// 查询工艺水外机数据详细
export function getOuter(rowId) {
  return request({
    url: '/modbus/outer/' + rowId,
    method: 'get'
  })
}

// 新增工艺水外机数据
export function addOuter(data) {
  return request({
    url: '/modbus/outer',
    method: 'post',
    data: data
  })
}

// 修改工艺水外机数据
export function updateOuter(data) {
  return request({
    url: '/modbus/outer',
    method: 'put',
    data: data
  })
}

// 删除工艺水外机数据
export function delOuter(rowId) {
  return request({
    url: '/modbus/outer/' + rowId,
    method: 'delete'
  })
}
