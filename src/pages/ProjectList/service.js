import request from '@/utils/request';

export async function queryFakeList(params) {
  return request('server/api/projects', {
    params,
  });
}
export async function deleteList(params) {
  return request('server/api/projects/'+params.key, {
    method: 'DELETE',
  });
}

