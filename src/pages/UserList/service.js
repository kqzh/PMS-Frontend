import request from '@/utils/request';

export async function queryRule(params) {
  return request('server/api/users', {
    params,
  });
}
export async function removeRule(params) {
  return request('server/api/user/'+params.key, {
    method: 'DELETE',
  });
}
export async function addRule(params) {
  return request('server/api/user', {
    method: 'POST',
    data: params,
  });
}
export async function updateRule(params) {
  return request('server/api/user', {
    method: 'PUT',
    data: params ,
  });
}
