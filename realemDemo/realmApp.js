const Realm = require('realm');
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'
import dayjs from 'dayjs'
import User, {UserSchema} from './realm/User'
import Message from './realm/Message'
import RealmHelper from './realm/RealmHelper';

export default class realmApp extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: null
    };
  }

  componentWillMount() {
   this.initObj()
  }

  initObj = async () => {
    let user = new User(UserSchema)
    // await user.open()
    // let user = new RealmHelper([UserSchema])
    console.log(user)
    this.setState({user}) 
  }
  
  add = () => {
    const obj = {
      update: false,
      data: [
        {
          id: dayjs().valueOf().toString(), // 用户Id
          username: 'Tom'+dayjs().valueOf().toString(), // 用户名
          orgLabel: '集团管理中心', // 组织名称
          department: '系统部',
        }
      ],      
    }
    this.state.user.save(obj).then((res) => {      
      console.log(res)
    })
  }

  delete = () => {
    this.state.user.delete().then(res => {
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
          onPress={this.add}
          title="增加"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={this.delete}
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
