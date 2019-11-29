import request from '@/utils/request';

export async function getStepForm(params) {
  return request('/api/userStepForms/'+params.pid+'/'+params.student_id, {
  });
}

export async function getUserStore(params) {
  return request('/api/stores/'+params.pid+'/'+params.student_id, {
  });
}
