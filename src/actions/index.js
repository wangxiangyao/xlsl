// baby action
export const INVALTDATE_BABY = "INVALTDATE_BABY";
export const REQUEST_BABIES = 'REQUEST_BABIES';
export const RECEIVE_BABIES = 'RECEIVE_BABIES';
export const ADD_BABY = 'ADD_BABY';
export const UPDATA_BABY = 'UPDATA_BABY';
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
  console.log("我进来了")
  return (dispatch, getState) => {
    if (shouldFetch(getState(), option.name)) {
      console.log("需要加载宝宝")
      return dispatch(fetchData(option, callback))
    } else {
      return Promise.resolve()
    }
  }
}
