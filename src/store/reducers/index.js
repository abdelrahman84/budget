import {ADD_BUDGET} from '../constants/action-types'

const initialState = {
budget: {},
// transactions: []
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_BUDGET) {
    return Object.assign({}, state, {
       budget: action.payload
    });
    }
  return state;
};

export default rootReducer;
