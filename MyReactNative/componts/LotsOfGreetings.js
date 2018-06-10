import React, {Component} from 'react'
import {Text, View } from 'react-native'
// Props 属性
class Greeting extends Component {
  render () {
    return (
      <Text>Hellp {this.props.name}! </Text>
    )
  }
}

class LotsOfGreetings extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Greeting name='Rexxar' />
        <Greeting name='Jaina' />
        <Greeting name='Valeera' />
      </View>
    )
  }
}

export default LotsOfGreetings