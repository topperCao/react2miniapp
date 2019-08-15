import dayjs from 'dayjs';

const today = dayjs().format('YYYY-MM-DD');

export default {
  namespace: 'book',
  state: {
    loading: false,
    modalObj: {
      type: 'add',
      currentObj: {}
    },
  },
  effects: {

  },
  reducers: {
    setLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
    setModalObj(state, { payload }) {
      return { ...state, modalObj: payload };
    },
  },
};
