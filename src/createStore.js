import { createStore, applyMiddleware } from 'redux';
import { imageReducer } from './reducers';
import thunkMiddleware from 'redux-thunk'

const applyStoreMiddleware = applyMiddleware(thunkMiddleware)(createStore);
export default applyStoreMiddleware(imageReducer);