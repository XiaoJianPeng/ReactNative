import React, {Component} from 'react'
import { Button, View, TextInput} from 'react-native'
import AV from 'leancloud-storage';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {username: '', password: ''}
  }
  render() {
    return (
      <View style={{
        flex:1,
        padding : 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        }}>
        <TextInput style={{
          height:40,
          borderBottomColor: '#000000',
        }}
          placeholder="请输入用户名"
          onChangeText={(text) => {
            this.setState(previousState => {
              return { username: text };
            })
            
          }}
          value= {this.state.username}
        />
        <TextInput style={{height:40}}
          placeholder="请输入密码"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState(previousState => {
              return { password: text };
            })
          }}
          value= {this.state.password}
        />
        <View style={{
          height: 60,
          padding:10,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
          <Button style={{
            padding:10,
          }}
            onPress={this.addUser.bind(this)}
            title="注册"
            color="steelblue"
            accessibilityLabel="Learn more about purple"
          />
          <Button style={{
            padding:20
          }}
            onPress={this.onlogIn.bind(this)}
            title="登录"
            color="green"
            accessibilityLabel="Learn more about purple"
          />
        </View>
      </View>
    )
  }
  async onlogIn() {
    await AV.User.logIn(this.state.username, this.state.password).then(function (loggedInUser) {
      alert('登录成功');
      console.warn('登录成功', loggedInUser);
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
    await user.save().then(
      (res) => {
        retUser = res.toJSON()
      }).catch((error) => {
      throw error
    })
  }
}

export default Login
