import { createStore, applyMiddleware } from 'redux'
import { appReducer, initialAppState } from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(appReducer, initialAppState, composeWithDevTools(applyMiddleware(thunk)));

export default store