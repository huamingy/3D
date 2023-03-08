import request from '@/utils/request'

// 查询已保存的图表字段信息
export function selectLineData(tableName, startTime, endTime) {
  return request({
    url: '/modbus/chart/selectLineData',
    method: 'get',
    params: {tableName: tableName, startTime: startTime, endTime: endTime}
  })
}
