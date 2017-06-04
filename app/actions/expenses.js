import * as types from '../constants/types'

export const addExpense = text => ({ type: types.ADD_EXPENSE, text })
export const deleteExpense = id => ({ type: types.DELETE_EXPENSE, id })
export const editExpense = (id, text) => ({ type: types.EDIT_EXPENSE, id, text })
