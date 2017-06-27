import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import colors from '../config/colors'
import fonts from '../config/fonts'

class Stat extends React.Component {
  render() {
    const {main, sub} = this.props

    return <View style={styles.container}>
      <Text style={styles.main}>{main}</Text>
      <Text style={styles.sub}>{sub.toUpperCase()}</Text>
    </View>
  }
}

Stat.PropTypes = {
  main: PropTypes.any.isRequired,
  sub: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  main: {
    fontFamily: fonts.regular,
    color: colors.dark,
    fontSize: 24
  },
  sub: {
    fontSize: 10,
    fontFamily: fonts.regular,
    color: colors.inactive,
    letterSpacing: 2
  }
})

export default Stat
