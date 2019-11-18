import { queryCurrent, query as queryUsers } from '@/services/user';

import {message} from 'antd';

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
      if(response.status!=="ok"){
        localStorage.removeItem("pro_token")
      }else{
        message.success("登录成功")
      }
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
