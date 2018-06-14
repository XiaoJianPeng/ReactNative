import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {Label, Input, Button} from 'teaset';
import AV from 'leancloud-storage';

class LoginApp extends Component {
  static navigationOptions = {
    title: '欢迎来到登录页面',
  };
  constructor(props) {
    super(props)
    this.state = {username: '', password: ''}
  }
  render() {
    return (
      <View style={{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
      }}>
        <Label style={{
        padding:20,
        }} 
        size='xl' text='Hello world!' /> 
        <Input style={{
          width: 200,
          padding:20,
        }}
        size='lg'
        value={this.state.username}
        placeholder="请输入用户名"
        onChangeText={text => this.setState({username: text})}
        />
        <Input style={{
          width: 200,
          padding:20,
        }}
        size='lg'
        value={this.state.password}
        placeholder="请输入密码"
        secureTextEntry={true}
        onChangeText={text => this.setState({password: text})}
        />
        <View style={{
          height: 60,
          padding:10,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
          <Button style={{
            backgroundColor: '#8bca81',
            borderColor: '#8a6d3b',           
            padding:10,
            alignSelf: 'center'
          }}
          onPress={this.addUser.bind(this)}>
            <Label style={{color: '#8a6d3b', fontSize: 16, paddingLeft: 8}} text='注册' />
          </Button>
          <Button style={{
            backgroundColor: '#8186ca', 
            borderColor: '#8a6d3b',
            padding:10,
            alignSelf: 'center'
          }}
          onPress={this.onlogIn.bind(this)}>
            <Label style={{color: '#8a6d3b', fontSize: 16, paddingLeft: 8}} text='登录' />
          </Button>
          <Button onPress={() => {
          this.props.navigation.navigate('Home')
        }} title="下一页" />
        </View>
      </View>
    );
  }
  async onlogIn() {
    console.warn('正在登录.......');
    await AV.User.logIn(this.state.username, this.state.password).then((loggedInUser) => {
      alert('登录成功');
      console.warn('登录成功', loggedInUser);
      this.props.navigation.navigate('TabMain', {msg: '登录成功！'});
    }, function (error) {
      console.error(error)
    });
  };
  async addUser () {
    console.warn(this.state)
    let user = new AV.User();
    user.setUsername(this.state.username);
    user.setPassword(this.state.password);
    console.warn(user);
    await user.signUp().then(
      (res) => {
        retUser = res.toJSON()
      }).catch((error) => {
      throw error
    })
  }
}

export default LoginApp
