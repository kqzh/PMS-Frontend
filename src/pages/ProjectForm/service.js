import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  return request('/server/api/projects', {
    method: 'POST',
    data: params,
  });
}
export async function fakeUpdateForm(params) {
  return request('/server/api/projects', {
    method: 'PUT',
    data: params,
  });
}
