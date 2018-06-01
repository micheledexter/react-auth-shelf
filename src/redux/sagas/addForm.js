import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, call, put as dispatch } from 'redux-saga/effects';

import axios from 'axios';

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

function* rootSaga() {
  yield takeEvery('ADD_FORM', postForm);
  yield takeEvery('SET_ITEMS', shelfItems)
  yield takeEvery('DELETE_ITEM', deleteItems)
}

function* postForm(action) {
  try {
    const formPost = yield call(axios.post, '/api/shelf', action.payload);
    console.log(formPost);
  } catch (error) {}
}

function* shelfItems() {
  try{
    const shelfResponse = yield call(axios.get, 'api/shelf');
    console.log(shelfResponse);
    yield dispatch({
      type: 'ITEMS',
      payload: shelfResponse.data,
    })
  } catch (error) { }
}

function* deleteItems () {
  try{
    const itemDeleted = yield call (axios.delete, `/api/shelf/${id}`, config);
    console.log(itemDeleted);
    yield dispatch ({
      type: 'SET_ITEMS'
    })
  } catch (error) { }
}

// const sagaMiddleware = createSagaMiddleware();

export default rootSaga;
