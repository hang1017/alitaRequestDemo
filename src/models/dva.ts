import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect, request } from 'alita';

export interface DvaModelState {
  herolist: any[];
}

export interface DvaModelType {
  namespace: 'dva';
  state: DvaModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<DvaModelState>;
  };
}

const DvaModel: DvaModelType = {
  namespace: 'dva',

  state: {
    herolist: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const data = yield request('/api/herolist.json');

      const detailData = yield request('/api/herodetails.json', {
        method: 'POST',
        body: JSON.stringify({
          ename: 110,
        }),
      });
      console.log(detailData);
      yield put({
        type: 'save',
        payload: { herolist: data },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default DvaModel;
