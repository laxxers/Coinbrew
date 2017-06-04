import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'
import PropTypes from 'prop-types'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import colors from '../config/colors'
import fonts from '../config/fonts'

const {height, width} = Dimensions.get('window')

class Tile extends React.Component {
  render() {
    const {category, index, selected, onPress} = this.props

    return <TouchableOpacity
      activeOpacity={0.8}
      key={index}
      onPress={() => onPress()}
      style={[styles.tile, (index) % 2 == 1 && {backgroundColor: colors.light}, selected && {backgroundColor: colors.main}]}
    >
      <SimpleLineIcons
        name={category.icon}
        size={20}
        style={[styles.icon, selected && {color: colors.white}]}
      />
      <Text style={[styles.label, selected && {color: colors.white}]}>{category.name.toUpperCase()}</Text>
    </TouchableOpacity>
  }
}

Tile.propTypes = {
  category: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  onPress: PropTypes.func.isRequired
}

Tile.defaultProps = {
  selected: false
}

const styles = StyleSheet.create({
  tile: {
    justifyContent: 'center',
    alignItems: 'center',
    width: (width-30) / 3,
    height: 100,
    borderRadius: 3
  },
  icon: {
    color: colors.dark,
    paddingBottom: 8
  },
  label: {
    color: colors.dark,
    fontFamily: fonts.bold,
    fontSize: 11,
    letterSpacing: 1.5
  }
})

export default Tile
