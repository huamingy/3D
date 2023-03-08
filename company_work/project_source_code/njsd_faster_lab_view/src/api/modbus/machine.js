import request from '@/utils/request'

// 查询螺杆机数据列表
export function listMachine(query) {
  return request({
    url: '/modbus/machine/list',
    method: 'get',
    params: query
  })
}

// 查询螺杆机数据详细
export function getMachine(rowId) {
  return request({
    url: '/modbus/machine/' + rowId,
    method: 'get'
  })
}

// 新增螺杆机数据
export function addMachine(data) {
  return request({
    url: '/modbus/machine',
    method: 'post',
    data: data
  })
}

// 修改螺杆机数据
export function updateMachine(data) {
  return request({
    url: '/modbus/machine',
    method: 'put',
    data: data
  })
}

// 删除螺杆机数据
export function delMachine(rowId) {
  return request({
    url: '/modbus/machine/' + rowId,
    method: 'delete'
  })
}
