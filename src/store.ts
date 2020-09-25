import rootReducers from "./reducers";
import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'


const store = createStore(rootReducers, composeWithDevTools());

export default store;



