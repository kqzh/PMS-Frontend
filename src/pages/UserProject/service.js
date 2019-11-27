import request from '@/utils/request';

export async function queryFakeList(params) {
  return request('/server/api/stores', {
    params,
  });
}
export async function queryProject() {
  return request("/server/api/projects",{
    method:'GET',
  })
}
export async function deleteStore(params){
  return request('/server/api/stores/'+params.pid+'/'+params.student_id, {
    method:'DELETE',
    params
  });
}

export async function scoreStore(params){
  return request('/server/api/stores/'+params.pid+'/'+params.student_id, {
    method:'PUT',
    data:params
  });
}
