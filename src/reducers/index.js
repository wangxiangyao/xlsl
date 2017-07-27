import { combineReducers } from 'redux';
import babies from "./babyReducer.js"
import fetch from "./fetchReducer.js"
import member from "./memberReducer.js"
import addresses from "./addressReducer.js"
import orders from "./orderReducer.js"
// 链接入各种reducer



const reducer = combineReducers ({
  babies,
  member,
  fetch,
  addresses,
  orders,
});

export default reducer;
