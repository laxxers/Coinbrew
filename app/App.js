import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions
} from 'react-native'
import Header from './components/Header'
import DateSeparator from './components/DateSeparator'
import Expense from './components/Expense'
import colors from './config/colors'
import fonts from './config/fonts'

const {height, width} = Dimensions.get('window')

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isScrolling: false
    }
  }

  _onScroll = (event) => {
    let offset = event.nativeEvent.contentOffset.y
    this.setState({
      isScrolling: offset > 0
    })

  }

  _onScrollBeginDrag = (event) => {
    console.log('onScrollBeginDrag', event.nativeEvent.contentOffset)
  }

  _onScrollEndDrag = (event) => {
    console.log('onScrollEndDrag', event.nativeEvent.contentOffset)
    let offset =  event.nativeEvent.contentOffset.y
    if(offset > 40) {
      this.assistScroll.scrollTo({y: height / 3})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          scroll={this.state.isScrolling}
          title="Test"
        />
        <ScrollView
          pagingEnabled
          style={{flex: 1}}
          scrollEventThrottle={16}
          ref={ref => { this.assistScroll = ref }}
          onScroll={(event) => this._onScroll(event)}
          onScrollBeginDrag={(event) => this._onScrollBeginDrag(event)}
          onScrollEndDrag={(event) => this._onScrollEndDrag(event)}
          onTouchStart={() => console.log('onTouchStart')}
          onTouchMove={() => console.log('onTouchMove')}
          onTouchEnd={() => console.log('onTouchEnd')}
        >
          <View style={{backgroundColor: colors.white, height: height / 3}}>
            <Text>sad</Text>
          </View>
          <View style={{padding: 20, backgroundColor: colors.light}}>
            <DateSeparator
              date="17 FEBRUARY"
            />
            <View style={{flex: 1, paddingTop: 10, paddingBottom: 10}}>
              <Expense category="Groceries" amount="100" icon="lol"/>
              <Expense category="Petrol" amount="200" icon="lol"/>
              <Expense category="Food" amount="100" icon="lol"/>
            </View>
          </View>
        </ScrollView>
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
