import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import colors from '../config/colors'
import fonts from '../config/fonts'

class Bar extends React.Component {
  render() {
    const {label, interval, height} = this.props

    return <TouchableOpacity>
      <View style={{marginRight: interval}}>
        <View style={[styles.bar, styles.empty, {height: (100 - height)}]} />
        <View style={[styles.bar, {height}]} />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  }
}

Bar.propTypes = {
  label: PropTypes.string.isRequired,
  interval: PropTypes.number,
  height: PropTypes.number.isRequired
}

Bar.defaultProps = {
  interval: 10
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.main,
    width: 20,
  },
  label: {
    fontFamily: fonts.regular,
    color: colors.inactive,
    textAlign: 'center',
    fontSize: 10,
    marginTop: 3
  },
  empty: {
    opacity: 0.2
  }
})

export default Bar
