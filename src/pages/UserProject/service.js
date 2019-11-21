import request from '@/utils/request';

export async function queryFakeList(params) {
  return request('/api/stores', {
    params,
  });
}
export async function queryProject() {
  return request("/api/projects",{
    method:'GET',
  })
}
export async function deleteStore(params){
  return request('/api/stores', {
    method:'DELETE',
    params
  });
}

export async function scoreStore(params){
  return request('/api/stores/score', {
    method:'PUT',
    params
  });
}
