import React, {Component} from 'react'
import {Text, View } from 'react-native'

class Blink extends Component {
  constructor(props) {
    super(props)
    this.state = {showText: true}

    setInterval(() => {
      this.setState(previousState => {
        return {showText: !previousState.showText}
      })
    }, 1000)
  }
  render() {
    // 根据当前showText的值决定是否显示text内容
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text>{display}</Text>
    );
  }
}

class BlinkApp extends Component {
  render () {
    return (
      <View>
        <Blink text ='I lova to blink' />
        <Blink text ='Yes blinking is so great' />
        <Blink text='Why did they ever take this out of HTML' />
        <Blink text='Look at me look at me look at me' />
      </View>
    )
  }
}

export default BlinkApp
