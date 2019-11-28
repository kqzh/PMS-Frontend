import request from '@/utils/request';

export async function getStepForm(params) {
  return request('/server/api/userStepForms/'+params.pid+'/'+params.student_id, {
  });
}

export async function getUserStore(params) {
  return request('/server/api/stores/'+params.pid+'/'+params.student_id, {
  });
}
