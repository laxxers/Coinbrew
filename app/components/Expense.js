import React from 'react'
import {PropTypes} from 'prop-types'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import _ from 'lodash'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import categories from '../config/categories'
import colors from '../config/colors'
import fonts from '../config/fonts'

class Expense extends React.Component {

  _getIcon = (name) => {
    const category = _.find(categories, {name})
    const icon = category ? category.icon : 'shield'

    return icon
  }

  render() {
    const {category, description, amount} = this.props

    return <View style={styles.container}>
      <View style={styles.left}>
        <SimpleLineIcons
          name={this._getIcon(category)}
          size={20}
          style={{color: colors.dark}}
        />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.category}>{_.capitalize(category)}</Text>
        { description && <Text style={styles.sub}>{_.capitalize(description)}</Text> }
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>${amount}</Text>
      </View>
    </View>
  }
}

Expense.propTypes = {
  category: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  description: PropTypes.string
}

Expense.defaultProps = {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    borderRadius: 3,
    margin: 5,
    minHeight: 60
  },
  left: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center'
  },
  category: {
    fontFamily: fonts.bold,
    color: colors.dark
  },
  sub: {
    fontFamily: fonts.regular,
    color: colors.inactive
  },
  amount: {
    fontFamily: fonts.bold,
    color: colors.dark
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  }
})

export default Expense
