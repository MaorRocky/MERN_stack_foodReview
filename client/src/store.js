import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import Sagas from './Sagas';
import createSagaMiddleware from 'redux-saga';
import middleware from './middleware';
const initialState = {};
Sagas();
createSagaMiddleware();
const SagaStore = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default SagaStore;
