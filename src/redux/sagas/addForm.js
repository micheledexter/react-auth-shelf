import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, call, put as dispatch } from 'redux-saga/effects';

import axios from 'axios';

function* rootSaga() {
  yield takeEvery('ADD_FORM', postForm);
  yield takeEvery('SET_ITEMS', shelfItems)
}

function* postForm(action) {
  try {
    const formPost = yield call(axios.post, '/api/shelf', action.payload);
    console.log(formPost);
    yield dispatch ({
    })
  } catch (error) {}
}

function* shelfItems() {
  try{
    const shelfResponse = yield call(axios.get, 'api/shelf');
    console.log(shelfResponse);
    yield dispatch({
      payload: shelfResponse.data,
    })
  } catch (error) { }
}

// const sagaMiddleware = createSagaMiddleware();

export default rootSaga;
