import { queryFakeList ,deleteList} from './service';

const Model = {
  namespace: 'listCardList',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {

      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
    *remove({ payload }, { call, put }) {
      const response = yield call(deleteList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload };
    },
  },
};
export default Model;
