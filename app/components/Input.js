import React from 'react'
import {PropTypes} from 'prop-types'
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  TouchableOpacity
} from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import colors from '../config/colors'
import fonts from '../config/fonts'

class Input extends React.Component {
  render() {
    const {icon, title, sub, border, right, onPress} = this.props
    const Component = onPress ? TouchableOpacity : View

    return <Component
      activeOpacity={0.8}
      style={[styles.container, border && styles.border]}
      onPress={onPress}
    >
      <View style={styles.left}>
        <SimpleLineIcons
          name={icon}
          size={20}
          style={{color: colors.dark}}
        />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{title}</Text>
        { sub && <Text style={styles.sub}>{sub}</Text> }
      </View>
      <View style={styles.right}>
        { onPress ? right : <Text style={styles.inactive}>{right.toUpperCase()}</Text> }
      </View>
    </Component>
  }
}

Input.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sub: PropTypes.string,
  right: PropTypes.any,
  border: PropTypes.bool,
  onPress: PropTypes.func
}

Input.defaultProps = {
  border: true
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    minHeight: 80,
  },
  border: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: colors.inactive
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
  title: {
    fontFamily: fonts.bold,
    color: colors.dark,
  },
  sub: {
    fontFamily: fonts.regular,
    color: colors.inactive
  },
  active: {
    fontFamily: fonts.regular,
    color: colors.main
  },
  inactive: {
    color: colors.inactive,
    fontFamily: fonts.regular,
    letterSpacing: 1.5,
    fontSize: 12
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1
  }
})

export default Input
