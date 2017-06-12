import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Header from '../components/Header'
import DateSeparator from '../components/DateSeparator'
import Expense from '../components/Expense'
import ExpenseModal from '../components/ExpenseModal'
import colors from '../config/colors'
import * as ActionCreators from '../actions'

const {height, width} = Dimensions.get('window')

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isScrolling: false,
      isOpen: false,
      initialY: 0
    }
  }

  componentWillMount() {
    const {fetchExpenses} = this.props

    fetchExpenses()
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  _onScroll = (event) => {
    let offset = event.nativeEvent.contentOffset.y
    this.setState({
      isScrolling: offset > 0
    })
  }

  render() {
    const {addExpense, expenses, feeds, isFetching} = this.props

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
            {
              feeds.map((feed, parent) => {
                return (
                  <View
                    key={parent}
                  >
                    <DateSeparator
                      date={feed.day}
                    />
                    <View style={{flex: 1, paddingTop: 10, paddingBottom: 10}}>
                      {
                        feed.items.map((item, child) =>
                          <Expense
                            key={child}
                            category={item.category}
                            amount={item.amount}
                            description={item.description}
                          />
                        )
                      }
                    </View>
                  </View>
                )
              })
            }
            { isFetching && <ActivityIndicator/>}
          </View>
        </ScrollView>
        <ExpenseModal
          addExpense={(expense) => addExpense(expense)}
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
  ...state.expenses
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
