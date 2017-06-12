import { ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, REQUEST_EXPENSES, RECEIVE_EXPENSES } from '../constants/types'
import moment from 'moment'
import _ from 'lodash'
import uuid from 'uuid'

const initialState = {
  isFetching: false,
  expenses: [],
  feeds: []
}

const feedify = (expenses) => {
  return _.chain(expenses)
    .groupBy((occurrence) => moment(occurrence.date).startOf('day').toISOString())
    .map((group, day) => {
      return {
        day: day,
        items: group
      }
    })
    .orderBy('day', ['desc'])
    .value()
}

export default function expenses(state = initialState, action) {
  switch (action.type) {
    case REQUEST_EXPENSES:
      return Object.assign({}, state, {
        isFetching: true
      })

    case RECEIVE_EXPENSES:
      return Object.assign({}, state, {
        isFetching: false,
        expenses: [...state.expenses, ...action.expenses],
        feeds: feedify([...state.expenses, ...action.expenses])
      })

    case ADD_EXPENSE:
      const expenses = [
        ...state.expenses,
        {
          id: uuid.v4(),
          amount: action.amount,
          description: action.description || null,
          category: action.category,
          date: moment.utc().toISOString()
        }
      ]

      return Object.assign({}, state, {
        expenses,
        feeds: feedify(expenses),
      })

    case DELETE_EXPENSE:
      return state.filter(expense =>
        expense.id !== action.id
      )

    case EDIT_EXPENSE:
      return state.map(expense =>
        expense.id === action.id ?
        { ...expense, text: action.text } :
          expense
      )

    default:
      return state
  }
}
