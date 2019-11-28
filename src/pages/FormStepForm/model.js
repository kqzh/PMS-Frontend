import { fakeSubmitForm, getStepForm, getUserStore } from './service';

const Model = {
  namespace: 'formStepForm',
  state: {
    current: 'info',
    stepList: [],
    myStore:[],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const res = yield call(getStepForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload:res,
      });

      const msg = yield  call(getUserStore,payload);
      yield put({
        type: 'saveMyStore',
        payload:msg,
      });

      yield put({
        type: 'saveCurrentStep',
        payload: 'info',
      });
    },
  },
  reducers: {
    saveCurrentStep(state, { payload }) {
      return { ...state, current: payload };
    },

    saveStepFormData(state, { payload }) {
      return { ...state, stepList:payload};
    },

    saveMyStore(state, { payload }) {
      return { ...state, myStore:payload};
    },
  },
};
export default Model;
