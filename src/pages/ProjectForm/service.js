import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  return request('/api/projects', {
    method: 'POST',
    data: params,
  });
}
export async function fakeUpdateForm(params) {
  return request('/api/projects/'+params.id, {
    method: 'PUT',
    data: params,
  });
}
