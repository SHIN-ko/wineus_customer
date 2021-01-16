import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as customerAPI from '../lib/api/customers';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_CUSTOMERS,
  LIST_CUSTOMERS_SUCCESS,
  LIST_CUSTOMERS_FAILURE,
] = createRequestActionTypes('customers/LIST_CUSTOMERS');

export const listCustomers = createAction(
  LIST_CUSTOMERS,
  ({ extra, username, page }) => ({ extra, username, page }),
);

const listCustomersSaga = createRequestSaga(LIST_CUSTOMERS, customerAPI.listCustomers);
export function* customersSaga() {
  yield takeLatest(LIST_CUSTOMERS, listCustomersSaga);
}

const initialState = {
  customers: null,
  error: null,
  lastPage: 1,
};

const customers = handleActions(
  {
    [LIST_CUSTOMERS_SUCCESS]: (state, { payload: customers, meta: response }) => ({
      ...state,
      customers,
      lastPage: parseInt(response.headers['last-page'], 10), // 문자열을 숫자로 변환
    }),
    [LIST_CUSTOMERS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default customers;
