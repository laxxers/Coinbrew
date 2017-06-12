import * as types from '../constants/types'
import moment from 'moment'

const requestExpenses = () => {
  return {
    type: types.REQUEST_EXPENSES
  }
}

export const fetchExpenses = () => {
  return (dispatch, getState) => {
    dispatch(requestExpenses())

    dispatch(
      receiveExpenses([
        {id: 1, amount: 100, category: 'food', date: moment().subtract(1, 'days').startOf("day").toISOString()},
        {id: 2, amount: 30, category: 'shopping', date: moment().subtract(2, 'days').startOf("day").toISOString()}
      ])
    )
  }
}


export const receiveExpenses = (expenses) => {
  return {
    type: types.RECEIVE_EXPENSES,
    expenses
  }
}

export const addExpense = (expense) => {
  return {
    type: types.ADD_EXPENSE,
    ...expense
  }
}

export const deleteExpense = (id) => {
  return {
    type: types.DELETE_EXPENSE,
    id
  }
}

export const editExpense = (id, text) => {
  return {
    type: types.EDIT_EXPENSE,
    id,
    text
  }
}
