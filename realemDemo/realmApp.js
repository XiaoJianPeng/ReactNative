const Realm = require('realm');
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import test from './realm/test'
import User from './realm/User'
import Message from './realm/Message'

export default class realmApp extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: null
    };
  }

  componentWillMount() {
    // Realm.open({
    //   schema: [{name: 'Dog', properties: {name: 'string'}}]
    // }).then(realm => {
    //   realm.write(() => {
    //     realm.create('Dog', {name: 'Rex'});
    //   });
    //   console.log(realm.objects('Dog'))
    //   this.setState({ realm });
    // });
    // test.RealmOpen()
   this.initObj()
  }

  initObj = async () => {
    let user = new User()
    await user.open()
    console.log(user)
    this.setState({user})
  }
  
  add = () => {
    const obj = {
      id: '1001', // 用户Id
      username: 'Tom1', // 用户名
      orgLabel: '集团管理中心', // 组织名称
      department: '系统部',
    }
    this.state.user.create(obj).then((res) => {      
      console.log(res)
    })
  }

  render() {
    const info = this.state.realm
      ? 'Number of dogs in this Realm: ' + this.state.realm.objects('Dog').length
      : 'Loading...';

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {info}
        </Text>
        <Button
          onPress={() => {}}
          title="增加"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() => {}}
          title="删除"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() => {}}
          title="修改"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
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
