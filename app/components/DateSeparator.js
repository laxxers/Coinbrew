import React from 'react'
import {PropTypes} from 'prop-types'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import colors from '../config/colors'
import fonts from '../config/fonts'

class DateSeparator extends React.Component {
  render() {
    return <Text style={styles.date}>{this.props.date}</Text>
  }
}

DateSeparator.propTypes = {
  date: PropTypes.string.isRequired
}

DateSeparator.defaultProps = {}

const styles = StyleSheet.create({
  date: {
    color: colors.inactive,
    letterSpacing: 2,
    fontSize: 12,
    fontFamily: fonts.bold,
    textAlign: 'center'
  }
})

export default DateSeparator
