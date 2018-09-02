/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';
import Bank from './Bank'
import User from './User'

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
const bank = new Bank()
bank.addListen(new User(1, '小明', 1000))
bank.addListen(new User(2, '小红', 2000))
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
        userId: null,
        name: '',
        balance: 0,
        balanceChange: 0
    }
  }
  sendMsg = () => {
    bank.sendMsg(this.state.userId,this.state.balanceChange)
  }

  render() {
    return (
        <View>
            <View style={styles.container}>
                <TextInput style={{height:40}}
                placeholder="输入用户Id"
                onChangeText={(text) => {
                this.setState({userId: text})
                }} />
                <TextInput style={{height:40}}
                placeholder="输入用户名"
                onChangeText={(text) => {
                this.setState({name: text})
                }} />
                <TextInput style={{height:40}}
                placeholder="输入余额"
                onChangeText={(text) => {
                this.setState({balance: text})
                }} />
                <Button
                onPress={this.addListen}
                title="增加订阅"
                color="#841584"
                accessibilityLabel="增加订阅"
                />
            </View>
            <View style={styles.container}>
                <TextInput style={{height:40}}
                placeholder="输入用户Id"
                onChangeText={(text) => {
                this.setState({userId: text})
                }} />
                <TextInput style={{height:40}}
                placeholder="输入用户变化金额"
                onChangeText={(text) => {
                this.setState({balanceChange: text})
                }} />
                <Button
                onPress={this.sendMsg}
                title="余额提醒"
                color="#841584"
                accessibilityLabel="发生余额提醒信息"
                />
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
