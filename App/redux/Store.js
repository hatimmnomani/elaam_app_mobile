import { combineReducers, configureStore } from '@reduxjs/toolkit';
import quizReducer from '../quiz/redux';
import { ApiReducer } from './reducers/ApiReducer';
import { CommonReducer } from './reducers/CommonReducer';
import loader from './reducers/LoaderReducer';

const reducer = combineReducers({
  ApiReducer,
  CommonReducer,
  loader,
  quiz: quizReducer,
});

export const store = configureStore({
  reducer,
});
