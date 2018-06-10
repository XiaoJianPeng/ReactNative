import React, { Component } from 'react'
import { ScrollView, Image, Text, View } from 'react-native'

class ScrollViewTest extends Component {
  render () {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <ScrollView horizontal= "true">
        <Text style={{fontSize:80}}>React Native</Text>
        <Image source={pic} style={{width: 193, height: 110}} />
        <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
        <Image source={pic} style={{width: 193, height: 110}} />
        <View style={{width: 100, height: 100, backgroundColor: 'steelblue'}} />
        <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
        <Image source={pic} style={{width: 193, height: 110}} />
        <View style={{width: 100, height: 100, backgroundColor: 'steelblue'}} />
        <Image source={pic} style={{width: 193, height: 110}} />
      </ScrollView>
    )
  }
}

export default ScrollViewTest
