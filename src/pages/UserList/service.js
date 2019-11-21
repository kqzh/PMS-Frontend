import request from '@/utils/request';

export async function queryRule(params) {
  return request('/api/users', {
    params,
  });
}
export async function removeRule(params) {
  return request('/api/users/'+params.key, {
    method: 'DELETE',
  });
}
export async function addRule(params) {
  return request('/api/users', {
    method: 'POST',
    data: params,
  });
}
export async function updateRule(params) {
  return request('/api/users', {
    method: 'PUT',
    data: params ,
  });
}
export async function addProject(params){
  return request("/api/stores",{
    method:"POST",
    data:params
  })
}
export async function queryProject() {
  return request("/api/projects",{
    method:'GET',
  })
}
