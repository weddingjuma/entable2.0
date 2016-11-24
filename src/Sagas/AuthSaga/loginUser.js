import { call, put } from 'redux-saga/effects';
import authActions from '../../Redux/AuthRedux';
import apiActions from '../../Redux/ApiRedux';

export default function* loginUser(firebaseAuth, api, { credentials }) {
  console.log('yo');
  const fbResponse = yield call(() =>
  firebaseAuth.signInWithEmailAndPassword(credentials.username, credentials.password)
  .then(user => ({
    ok: true,
    user,
  }))
  .catch(error => ({
    ok: false,
    problem: error,
  })));

  if (fbResponse.ok) {
    yield put(apiActions.fetching());

    const response = yield call(() => api.getUser(fbResponse.user.uid));

    if (response.ok) {
      yield [
        put(authActions.loginUserSuccess(response.data)),
        put(apiActions.apiSuccess()),
      ];
    } else {
      yield [
        put(authActions.loginUserFail(response.problem)),
        put(apiActions.apiFail()),
      ];
    }
  } else {
    yield [put(authActions.loginUserFail(fbResponse.problem)),
      put(apiActions.apiFail())];
  }
}
