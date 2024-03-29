import { queryFakeList,queryProject,deleteStore,scoreStore } from './service';
import { message } from 'antd';


const Model = {
  namespace: 'userProject',
  state: {
    list: [],
    projects:[],
    params:{
      category:[],
      status:"",
      author:"",
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *remove({ payload }, { call, put }) {
      yield call(deleteStore, payload);
      const response = yield call(queryFakeList);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *score({ payload }, { call, put }) {
      yield call(scoreStore, payload);
      const response = yield call(queryFakeList);
      message.success('评分成功');
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *getChange({payload},{call,put,select}){
      let state = yield select(state => state.userProject.params);
      const values = {...state,...payload};
      yield put({
        type: 'saveParams',
        payload: values,
      });
      const response = yield call(queryFakeList, values);

      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });

    },

    *getProject({ payload }, { call, put }) {
      const response = yield call(queryProject, payload);
      yield put({
        type: 'saveProject',
        payload: response,
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload };
    },
    saveProject(state,action){
      return {...state,projects:action.payload};
    },
    saveParams(state,action){
      return {...state,params:action.payload};
    }

  },
};
export default Model;
