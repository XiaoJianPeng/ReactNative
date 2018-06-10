import React, { Component } from 'react'
import { View } from 'react-native'

class FlexDirection extends Component {
  render () {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch'
        }}>
        <View style={{width: 50, backgroundColor: 'red'}} />
        <View style={{width: 50, backgroundColor: 'yellow'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'blue'}} />
      </View>
    )
  }
}

export default FlexDirection