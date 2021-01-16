import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as customersAPI from '../lib/api/customers';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'register/INITIALIZE'; // 모든 내용 초기화
const CHANGE_FIELD = 'register/CHANGE_FIELD'; // 특정 key 값 바꾸기
const [
  REGISTER_CUTOMER,
  REGISTER_CUTOMER_SUCCESS,
  REGISTER_CUTOMER_FAILURE,
] = createRequestActionTypes('register/REGISTER_CUTOMER'); // 고객 등록
const SET_ORIGINAL_CUSTOMER = 'register/SET_ORIGINAL_CUSTOMER';
const [
  UPDATE_CUSTOMER,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAILURE,
] = createRequestActionTypes('register/UPDATE_CUSTOMER'); // 포스트 수정

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const registerCustomer = createAction(REGISTER_CUTOMER, ({ name, contactNumber, address, advancedPayment, extra }) => ({
  name, 
  contactNumber, 
  address, 
  advancedPayment,
  extra,
}));
export const setOriginalCustomer = createAction(SET_ORIGINAL_CUSTOMER, customer => customer);
export const updateCustomer = createAction(
  UPDATE_CUSTOMER,
  ({ id, name, contactNumber, address, advancedPayment,extra }) => ({
    id,
    name, 
    contactNumber, 
    address,
    advancedPayment,
    extra,
    
  }),
);

// saga 생성
const registerCustomerSaga = createRequestSaga(REGISTER_CUTOMER, customersAPI.registerCustomer);
const updateCustomerSaga = createRequestSaga(UPDATE_CUSTOMER, customersAPI.updateCustomer);

export function* registerSaga() {
  yield takeLatest(REGISTER_CUTOMER, registerCustomerSaga);
  yield takeLatest(UPDATE_CUSTOMER, updateCustomerSaga);
}

const initialState = {
  name : '',
  contactNumber : '',
  address : '',
  advancedPayment : 0,
  extra : [],
  customer: null,
  customerError: null,
  originalCustomerId: null,
};

const register = handleActions(
  {
    [INITIALIZE]: state => initialState, // initialState를 넣으면 초기상태로 바뀜
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, // 특정 key 값을 업데이트
    }),
    [REGISTER_CUTOMER]: state => ({
      ...state,
      // customer와 customerError를 초기화
      customer: null,
      customerError: null,
    }),
    // 포스트 작성 성공
    [REGISTER_CUTOMER_SUCCESS]: (state, { payload: customer }) => ({
      ...state,
      customer,
    }),
    // 포스트 작성 실패
    [REGISTER_CUTOMER_FAILURE]: (state, { payload: customerError }) => ({
      ...state,
      customerError,
    }),
    [SET_ORIGINAL_CUSTOMER]: (state, { payload: customer }) => ({
      ...state,
      name: customer.name,
      contactNumber : customer.contactNumber,
      address: customer.address,
      advancedPayment : customer.advancedPayment,
      extra: customer.extra,
      originalCustomerId: customer._id,
    }),
    [UPDATE_CUSTOMER_SUCCESS]: (state, { payload: customer }) => ({
      ...state,
      customer,
    }),
    [UPDATE_CUSTOMER_FAILURE]: (state, { payload: customerError }) => ({
      ...state,
      customerError,
    }),
  },
  initialState,
);

export default register;
