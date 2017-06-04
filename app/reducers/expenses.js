import { ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE } from '../constants/types'

const initialState = [
  {
    remarks: 'Use Redux',
    amount: 100,
    id: 0,
    category: 'food'
  }
]

export default function expenses(state = initialState, action) {
  switch (action.type) {
    case ADD_EXPENSE:
      return [
        {
          id: state.reduce((maxId, expense) => Math.max(expense.id, maxId), -1) + 1,
          amount: action.amount,
          remarks: action.remarks,
          category: action.category
        },
        ...state
      ]

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
