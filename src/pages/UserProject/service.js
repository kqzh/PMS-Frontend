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
  return request('/api/stores/'+params.pid+'/'+params.student_id, {
    method:'DELETE',
    data:params
  });
}

export async function scoreStore(params){
  return request('/api/stores/'+params.pid+'/'+params.student_id, {
    method:'PUT',
    data:params
  });
}
