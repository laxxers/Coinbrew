import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Text
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Header from '../components/Header'
import DateSeparator from '../components/DateSeparator'
import Expense from '../components/Expense'
import ExpenseModal from '../components/ExpenseModal'
import Bar from '../components/Bar'
import Stat from '../components/Stat'
import colors from '../config/colors'
import fonts from '../config/fonts'
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
          <View style={{backgroundColor: colors.white, flex: 1, padding: 20, flexDirection: 'column', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
              <Bar
                label="M"
                height={78}
              />
              <Bar
                label="T"
                height={10}
              />
              <Bar
                label="W"
                height={50}
              />
              <Bar
                label="T"
                height={34}
              />
              <Bar
                label="F"
                height={55}
              />
              <Bar
                label="S"
                height={0}
              />
              <Bar
                label="S"
                height={12}
              />

            </View>

            <View style={{flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'space-around', marginTop: 15}}>
              <Stat
                main="$2000"
                sub="weekly total"
              />
              <Stat
                main="$18.10"
                sub="average / day"
              />
            </View>

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
            { isFetching && <ActivityIndicator/> }
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
