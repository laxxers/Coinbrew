import React from 'react'
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  StyleSheet
} from 'react-native'
import Input from './Input'
import Header from './Header'
import Tile from './Tile'
import colors from '../config/colors'
import fonts from '../config/fonts'
import categories from '../config/categories'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

class ExpenseModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedCategory: {},
      selectedIndex: 100,
      amount: '0'
    }
  }

  _handleTileClick = (index) => {
    this.setState({
      selectedIndex: index,
      selectedCategory: categories[index]
    })
  }

  _handleModalClose = () => {
    this.setState({
      selectedIndex: 100,
      selectedCategory: {},
      amount: '0'
    })

    this.props.onClose()
  }

  _handleAmountOnChange = (amount) => {
    if(amount.length > 8)
      return

    this.setState({
      amount
    })
  }

  render() {
    return <Modal
      animationType={"slide"}
      transparent={false}
      visible={this.props.isOpen}
      onRequestClose={() => this._handleModalClose()}
    >
      <View style={{flex: 1}}>
        <Header
          title="transaction"
          scroll={true}
          left={
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this._handleModalClose()}
            >
              <SimpleLineIcons
                name="arrow-left"
                style={{color: colors.dark, lineHeight: 15}}
              />
            </TouchableOpacity>
          }
          right={
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.onClose()}
            >
              <Text style={styles.rightButton}>SAVE</Text>
            </TouchableOpacity>
          }
        />
        <ScrollView>
          <View style={styles.container}>
            <Input
              icon="diamond"
              title="Spent"
              right={
                <View style={{flexDirection: 'row'}}>
                <Text style={styles.rightText}>$</Text>
                <TextInput
                  ref="amountInput"
                  style={styles.input}
                  onChangeText={(amount) => this._handleAmountOnChange(amount)}
                  value={this.state.amount}
                />
                </View>
              }
              onPress={() => this.refs.amountInput.focus()}
            />
            <Input
              icon="calendar"
              title="Date"
              right={<Text style={styles.rightText}>12/12/2017</Text>}
              onPress={() => null}
            />
            <Input
              icon="info"
              title="Remarks"
              right={<SimpleLineIcons color={colors.main} size={18} name="pencil"/>}
              onPress={() => null}
            />
            <Input
              icon="tag"
              title="Category"
              right="Select one"
              border={false}
            />
            <View style={styles.wrapper}>
              {
                categories.map((category, key) =>
                  <Tile
                    category={category}
                    index={key}
                    key={key}
                    selected={this.state.selectedIndex == key}
                    onPress={() => this._handleTileClick(key)}
                  />
                )
              }
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 40,
    flex: 1,
    paddingHorizontal: 15
  },
  rightButton: {
    color: colors.main,
    fontFamily: fonts.bold,
    letterSpacing: 1.5,
    fontSize: 12
  },
  input: {
    height: 20,
    width: 65,
    textAlign: 'right',
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.main
  },
  rightText: {
    fontFamily: fonts.regular,
    color: colors.main
  },
  wrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
})

export default ExpenseModal
