import React from 'react'
import {PropTypes} from 'prop-types'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import colors from '../config/colors'
import fonts from '../config/fonts'

class Expense extends React.Component {
  render() {
    const {icon, category, amount} = this.props
    return <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.amount}>{icon}</Text>
      </View>
      <Text style={styles.category}>{category}</Text>
      <View style={styles.right}>
        <Text style={styles.amount}>{amount}</Text>
      </View>
    </View>
  }
}

Expense.propTypes = {
  category: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

Expense.defaultProps = {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 3,
    margin: 5,
  },
  left: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    fontFamily: fonts.bold,
    color: colors.dark
  },
  amount: {
    fontFamily: fonts.bold,
    color: colors.dark
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  }
})

export default Expense
