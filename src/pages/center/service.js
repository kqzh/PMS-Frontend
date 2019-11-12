import request from '@/utils/request';

export async function queryCurrent() {
  return request('/server/api/currentUser');
}
export async function queryFakeList(params) {
  console.log(params);
  return request('/server/api/fake_list', {
    params,
  });
}
