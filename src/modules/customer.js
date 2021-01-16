import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as customersAPI from '../lib/api/customers';
import { takeLatest } from 'redux-saga/effects';

const [
  READ_CUSTOMER,
  READ_CUSTOMER_SUCCESS,
  READ_CUSTOMER_FAILURE,
] = createRequestActionTypes('customer/READ_CUSTOMER');
const UNLOAD_CUSTOMER = 'customer/UNLOAD_CUSTOMER'; // 포스트 페이지에서 벗어날 때 데이터 비우기

export const readCustomer = createAction(READ_CUSTOMER, id => id);
export const unloadCustomer = createAction(UNLOAD_CUSTOMER);

const readCustomerSaga = createRequestSaga(READ_CUSTOMER, customersAPI.readCustomer);
export function* customerSaga() {
  yield takeLatest(READ_CUSTOMER, readCustomerSaga);
}

const initialState = {
  customer: null,
  error: null,
};

const customer = handleActions(
  {
    [READ_CUSTOMER_SUCCESS]: (state, { payload: customer }) => ({
      ...state,
      customer,
    }),
    [READ_CUSTOMER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_CUSTOMER]: () => initialState,
  },
  initialState,
);

export default customer;
