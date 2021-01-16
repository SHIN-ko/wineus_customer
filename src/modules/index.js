import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';
import customers, { customersSaga } from './customers';
import customer, { customerSaga } from './customer';
import register, { registerSaga } from './register';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
  posts,
  customers,
  customer,
  register,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), writeSaga(), postSaga(), postsSaga(), customersSaga(), registerSaga(), customerSaga()]);
}

export default rootReducer;
