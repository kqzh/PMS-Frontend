import request from '@/utils/request';

export async function queryCurrent() {
  return request('/api/currentUsera');
}
export async function queryProvince() {
  return request('/api/geographic/province');
}
export async function queryCity(province) {
  return request(`/api/geographic/city/${province}`);
}
export async function query() {
  return request('/api/users');
}
export async function updateUser(params) {
  return request('/server/api/currentUser', {
    method: 'PUT',
    data: { ...params},
  });
}
