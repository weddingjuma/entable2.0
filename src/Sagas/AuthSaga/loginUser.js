import { call, put } from 'redux-saga/effects';
import userActions from '../../Redux/UserRedux';
import apiActions from '../../Redux/ApiRedux';

export default function* loginUser(api, { credentials }) {
  const response = yield call(() => api.loginUser(credentials));

  if (response.ok) {
    yield [put(userActions.loginSuccess(response.data)),
    put(apiActions.apiSuccess())];
  } else {
    yield [put(userActions.loginFail(response.problem)),
      put(apiActions.apiFail(response.data))];
  }
}