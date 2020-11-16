import {ADD_BUDGET} from '../constants/action-types'

export function addBudget(payload) {
    return {type: ADD_BUDGET, payload}
}
