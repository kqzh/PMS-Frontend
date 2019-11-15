import { addRule, queryRule, removeRule, updateRule ,addProject,queryProject} from './service';

const Model = {
  namespace: 'listTableList',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    projects:["123","456"]
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
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    //fake add project
    *addProject({ payload, callback }, { call, put }) {
      const response = yield call(addProject, payload);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      if (callback) callback();
    },

    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);

      yield put({
        type: 'save',
        payload: response,
      });
      //tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
      if (callback) callback();
    },

    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
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
    }
  },
};
export default Model;
