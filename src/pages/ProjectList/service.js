import request from '@/utils/request';

export async function queryFakeList(params) {
  return request('/api/projects', {
    params,
  });
}
export async function deleteList(params) {
  return request('/api/projects/'+params.key, {
    method: 'DELETE',
  });
}

