// baby action
export const INVALTDATE_BABY = "INVALTDATE_BABY";
export const REQUEST_BABIES = 'REQUEST_BABIES';
export const RECEIVE_BABIES = 'RECEIVE_BABIES';
export const ADD_BABY = 'ADD_BABY';
export const UPDATA_BABY = 'UPDATA_BABY';
export const UPDATA_BABIES = "UPDATA_BABIES" // 批量更新宝宝
// 宝宝相关action生成函数
export const invaltdateBaby = () => {
  return {
    type: INVALTDATE_BABY,
  }
}
export const requestBabies = () => {
  return {
    type: REQUEST_BABIES,
  }
}
export const receiveBabies = (data) => {
  return {
    type: RECEIVE_BABIES,
    data,
    receivedAt: Date.now()
  }
}
export const addBaby = (id, baby) => {
  return {
    type: ADD_BABY,
    id,
    baby,
  }
}
export const updataBaby = (id, baby) => {
  return {
    type: UPDATA_BABY,
    id,
    baby,
  }
}
export const updataBabies = (babies) => {
  return {
    type: UPDATA_BABIES,
    babies,
  }
}


// 订单操作
export const INVALTDATE_ORDER = "INVALTDATE_ORDER";
export const REQUEST_ORDERS = 'REQUEST_ORDERS';
export const RECEIVE_ORDERS = 'RECEIVE_ORDERS';
export const ADD_ORDER = 'ADD_ORDER';
export const UPDATA_ORDER = 'UPDATA_ORDER';
export const UPDATA_ORDERS = 'UPDATA_ORDERS';

export const invaltdateOrder = () => {
  return {
    type: INVALTDATE_ORDER,
  }
}
export const requestOrders = () => {
  return {
    type: REQUEST_ORDERS,
  }
}
export const receiveOrders = (data) => {
  // data为orders数组
  return function( dispatch ) {
    let orders = {};
    let babies = {};
    for (let val of data.values()) {
      console.log(val.baby)
      orders[val.id] = val; // 设置订单键
      babies[val.baby.id] = val.baby ; // 设置宝宝键
      orders[val.id].baby = val.baby.id; // 订单键中，baby字段变为此宝宝id
    }
    console.log(orders, babies)
    dispatch(updataOrders(orders))
    dispatch(updataBabies(babies))
  }
}
export const addOrder = (id, order) => {
  return {
    type: ADD_ORDER,
    id,
    order,
  }
}
export const updataOrder = (id, order) => {
  return {
    type: UPDATA_BABY,
    id,
    order,
  }
}
export const updataOrders = (orders) => {
  return {
    type: UPDATA_ORDERS,
    orders,
  }
}

// member操作
export const UPDATA_MEMBER = "UPDATA_MEMBER"
export const updataMember = (member) => {
  return {
    type: UPDATA_MEMBER,
    member: member,
  }
}




// callback 需要返回一个fetch
export function fetchData(option = {}, callBack) {

  return function (dispatch, getState) {
    const { path } = option
    const state = getState()
    let url = state.fetch.baseUrl + path; // 拼接url
    option = Object.assign({}, option.config, {
      headers: {
        ...option.config.headers,
        Accept: "application/json",
        'Content-Type': "application/json",
        Access_token: state.member.Access_token,
      },
    }) // 合并默认请求数据
    console.log(option)
    return callBack(url, option) // callback有两个参数，全部的url，fetch配置对象
    // if (callBack) {
    //   callBack()
    // } else {
    //   dispatch(request(option.name))
    //   return fetch(url, option)
    //     .then(
    //       (response) => {
    //         return response.json()
    //       }, error => console.log('一个错误:', error)
    //     )
    //     .then(
    //       (json) => {
    //         dispatch(receive(option, json))
    //       })
    //     .catch(e => {
    //       console.log(e)
    //     })
    // }
  }
}

function shouldFetch(state, name) {
  if (!name) {
    return true;
  }
  const item = state[name];
  console.log(item)
  if (!item) {
    return true;
  } else if (item.isFetching) {
    return false;
  } else {
    return item.didInvalidate;
  }
}

/*
name:请求什么数据，与store保持一致
option：请求配置，比如
  name 表示请求的数据
  path 请求的路径
  config fetch请求的配置对象
  ...
*/

export function fetchIfNeeded(option, callback) {
  return (dispatch, getState) => {
    if (shouldFetch(getState(), option.name)) {
      return dispatch(fetchData(option, callback))
    } else {
      return Promise.resolve()
    }
  }
}
