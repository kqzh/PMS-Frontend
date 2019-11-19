import { addRule, queryRule, removeRule, updateRule ,addProject,queryProject} from './service';

const Model = {
  namespace: 'listTableList',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    projects:[]
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *getProject({ payload }, { call, put }) {
      const response = yield call(queryProject, payload);
      yield put({
        type: 'saveProject',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      yield call(addRule, payload);
      const response = yield call(queryRule);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    //fake add project
    *addProject({ payload, callback }, { call, put }) {
      const response = yield call(addProject, payload);

      if (callback) callback();
    },

    *remove({ payload, callback }, { call, put }) {
      yield call(removeRule, payload);
      const response = yield call(queryRule);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *update({ payload, callback }, { call, put }) {
      yield call(updateRule, payload);
      const response = yield call(queryRule);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, data: action.payload };
    },
    saveProject(state,action){
      return {...state,projects:action.payload};
    },
  },
};
export default Model;
