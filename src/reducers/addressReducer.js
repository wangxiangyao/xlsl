function address(state = {
  isFetching: false,
  didInvalidate: true,
  byId: {
    "16": {
      id: 16,
      name: "王相尧",
      phone: "13213195318",
      province: "河南省",
      city: "洛阳市",
      district: "栾川县",
      addr: "泰丰公寓",
    }
  },
  allId: [16],
}, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default address;
