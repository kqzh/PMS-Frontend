import { queryCurrent, queryFakeList } from './service';

const Model = {
  namespace: 'center',
  state: {
    currentUser: {},
    list: [],
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *fetch({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(queryFakeList, payload);

      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    queryList(state, action) {
      return { ...state, list: action.payload };
    },
  },
};
export default Model;
