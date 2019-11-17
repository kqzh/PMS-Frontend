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
export async function deleteStore(params){
  return request('/server/api/store', {
    method:'DELETE',
    params
  });
}

export async function scoreStore(params){
  return request('/server/api/store/score', {
    method:'PUT',
    params
  });
}
