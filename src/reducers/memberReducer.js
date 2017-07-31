import { UPDATA_MEMBER } from "../actions"

function member (state = {
  id: 1,
  isVip: 1,
  member_level: 4,
  defaultAddress: 16,
  join_time: 1501062608158,
  phone: "18875016131",
  userType: "0",
}, action) {
  switch (action.type) {
    case UPDATA_MEMBER:
      return Object.assign({}, state, {
        ...action.member,
      })
    default:
      return state
  }
}

export default member;
