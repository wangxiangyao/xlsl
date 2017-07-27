import {

  INVALTDATE_BABY,
  REQUEST_BABIES,
  RECEIVE_BABIES,
  ADD_BABY,
  UPDATA_BABY,
} from '../actions';

function requestBabies(state, action) {
  return Object.assign({}, state, {
    isFetching: true,
    didInvalidate: false,
  })
}

// TODO:在receive或者addbaby的时候，验证数据是否有效数据

function receiveBabies(state, action) {

  // 将数据范式化
  let data = action.data;
  let allId = state.allId.slice();
  let byId = {};

  // 标准化数据
  /*
  对数据遍历，因为对象属性，都是字符串，所以要找出他们，并解析为对象。
  因为数组在传递的时候，其值变为了字符串，所以，对于数组也要对其所有值转换为数字
  */
  for (let val of data.values()) {
    let id = val.id

    if (allId.indexOf(id) < 0 ) {
      allId.push(id)
    }
    byId[id] = val;
    for (let [key, value] of Object.entries(val)) {
      if ( typeof value === "string" && value[0] === "{" ) {
          byId[id][key] = JSON.parse(value);
      } else if (Array.isArray(value)){
        // 如果是数组，每一项转换成数字
        for (let i = 0, len = value.length; i < len; i++) {
          byId[id][key][i] = Number(value[i]);
        }
      }
    }
  }
  return Object.assign({}, state, {
    isFetching: false,
    didInvalidate: false,
    byId,
    allId,
    lastUpdated: action.receivedAt,
  })
}

function addBaby(state, action) {
  return Object.assign({}, state, {
    allId: [...state.allId, action.id],
    byId: {
      [action.id]: action.baby,
    }
  })
}

function updataBaby(state, action) {
  return Object.assign({}, state, {
    byId: {
      ...state.byId,
      [action.id]: action.baby,
    }
  })
}

// TODO: 以后分组再优化
// 要初始化数据
function babies(state = {
  isFetching: false,
  didInvalidate: true,
  byId: {},
  allId: [],
  itemNum: 22,
}, action) {
  switch (action.type) {
    case INVALTDATE_BABY:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_BABIES:
      return requestBabies(state, action);
    case RECEIVE_BABIES:
      return receiveBabies(state, action);
    case ADD_BABY:
      return addBaby(state, action);
    case UPDATA_BABY:
      return updataBaby(state, action);
    default:
      return state
  }
}

export default babies;
