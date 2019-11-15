import request from '@/utils/request';

export async function queryFakeList(params) {
  return request('/server/api/stores', {
    params,
  });
}
export async function queryProject() {
  return request("server/api/projects",{
    method:'GET',
  })
}
