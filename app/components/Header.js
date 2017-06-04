import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, Platform, PixelRatio, StyleSheet, TouchableOpacity} from 'react-native'
import colors from '../config/colors'
import fonts from '../config/fonts'

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0

export default class Header extends React.Component {
  render() {
    const {left, title, right} = this.props

    return <View style={[styles.container, this.props.scroll && styles.border]}>
      <View style={styles.appBar}>
        <View style={styles.left}>
          {left && left}
        </View>
        <View>
          <Text style={styles.title}>{title.toUpperCase()}</Text>
        </View>
        <View style={styles.right}>
          {right && right}
        </View>
      </View>
    </View>
  }
}

Header.propTypes = {
  scroll: PropTypes.bool,
  title: PropTypes.string
}

Header.defaultProps = {
  scroll: false
}


const styles = StyleSheet.create({
  container: {
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: colors.white,
    height: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  border: {
    borderBottomWidth:  1 / PixelRatio.get(),
    borderBottomColor: colors.light,
  },
  appBar: {
    flex: 1,
    flexDirection: 'row',
  },
  left: {
    flex: 1
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  title: {
    color: colors.dark,
    fontFamily: fonts.bold,
    letterSpacing: 1.5,
    fontSize: 12
  }
})
