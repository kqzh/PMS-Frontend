import { message } from 'antd';
import { fakeSubmitForm ,fakeUpdateForm} from './service';

const Model = {
  namespace: 'projectForm',
  state: {},
  effects: {
    *submitRegularForm({ payload }, { call }) {

      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *updateRegularForm({ payload }, { call }) {
      yield call(fakeUpdateForm, payload);
      message.success('修改成功');
    },
  },
};
export default Model;
