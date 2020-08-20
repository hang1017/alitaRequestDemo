import { Reducer } from 'redux';
import { queryHeroList, getHeroDetails } from '@/services/api';
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
      const data = yield call(queryHeroList);
      const detailData = yield call(getHeroDetails, {
        ename: 110,
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
