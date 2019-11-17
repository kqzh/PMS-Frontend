import { queryCurrent, query as queryUsers } from '@/services/user';

import {routerRedux} from 'dva/router'
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {name:"123"},
    status:"ok"
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(payload, { call, put }) {
      const response = yield call(queryCurrent,payload);

      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
      yield put({
        type: 'changeStatus',
        payload: response.status,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    changeStatus(state,action){
      return { ...state,status:action.payload };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
