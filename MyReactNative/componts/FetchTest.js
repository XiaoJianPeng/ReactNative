import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

class FetchTest extends Component {
  fetchData = (enableCallback) => {
    fetch('http://bbs.reactnative.cn/api/category/3', {
      method: 'GET', // GET POST
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      }
      // body: JSON.stringify({
      //   firstParam: 
      // })
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
    })
    .catch((error) => {
      console.error(error);
    });
  }
  render() {
    return (
      <View>
        <Button onPress={this.fetchData} text="提交" />
      </View>
    )
  }
}

export default FetchTest
