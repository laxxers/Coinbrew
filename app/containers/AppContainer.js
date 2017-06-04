import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  PixelRatio
} from 'react-native'
import {connect} from 'react-redux'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Header from '../components/Header'
import DateSeparator from '../components/DateSeparator'
import Expense from '../components/Expense'
import ExpenseModal from '../components/ExpenseModal'
import colors from '../config/colors'

const {height, width} = Dimensions.get('window')

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isScrolling: false,
      isOpen: false,
      initialY: 0
    }

    console.log(this.props)
  }

  _onScroll = (event) => {
    let offset = event.nativeEvent.contentOffset.y
    this.setState({
      isScrolling: offset > 0
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          scroll={this.state.isScrolling}
          title="expenses"
          right={
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.setState({isOpen: true})}
            >
              <SimpleLineIcons
                name="options"
                size={16}
                style={{color: colors.dark}}
              />
            </TouchableOpacity>
          }
        />
        <ScrollView
          style={{flex: 1}}
          scrollEventThrottle={16}
          onScroll={(event) => this._onScroll(event)}
        >
          <View style={{backgroundColor: colors.white, height: height / 3}}>
          </View>
          <View style={{padding: 20, backgroundColor: colors.light}}>
            <DateSeparator
              date="17 February"
            />
            <View style={{flex: 1, paddingTop: 10, paddingBottom: 10}}>
              <Expense category="Groceries" amount="$100" icon="basket" description="Bacon and cheese at B.E.N"/>
              <Expense category="Petrol" amount="$200.90" icon="ghost"/>
              <Expense category="Food" amount="$100" icon="fire"/>
            </View>
          </View>
        </ScrollView>
        <ExpenseModal
          isOpen={this.state.isOpen}
          onClose={() => this.setState({isOpen: false})}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light
  }
})


const mapStateToProps = (state, props) => ({
  expenses: state.expenses
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App)
