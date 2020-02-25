import { all } from 'redux-saga/effects';
import AppSaga from './components/saga';
import RegisterSaga from './components/auth/register/saga';
import LoginSaga from './components/auth/login/saga';
import AddRestaurantSaga from './components/resturant/add-restaurant/saga';
import Rest from './components/resturant/restaurantSAGA/saga';
import ReviewSaga from './components/resturant/review/saga';
import ProfilesSaga from './components/profiles/profiles/saga';
import ProfileSaga from './components/profile/profile/saga';

export default function* Sagas() {
  yield all([
    AppSaga(),
    RegisterSaga(),
    LoginSaga(),
    AddRestaurantSaga(),
    Rest(),
    ReviewSaga(),
    ProfilesSaga(),
    ProfileSaga()
  ]);
}
