import React, {Component} from 'react';
import {View} from 'react-native';
import {Label, Input, Button} from 'teaset';
import RealtimeHelp from '../LeancloudSdk/RealtimeHelp';

class MyMessage extends Component {
  static navigationOptions = {
    title: '消息页',
  };
  constructor(props) {
    super(props)
    this.state = {msg: this.props.msg}
  }
  render() {
    return (
      <View style={{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
      }}>
        <View style={{
          height: 60,
          padding:10,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
         <Label style={{
              alignItems: 'flex-start',
            }} 
            size='xl' text={this.state.msg} 
          />
          <Button style={{
            backgroundColor: '#8186ca', 
            borderColor: '#8a6d3b',
            padding:10,
            alignSelf: 'center'
          }}
          onPress={this.sendMsg.bind(this)}>
            <Label style={{color: '#8a6d3b', fontSize: 16, paddingLeft: 8}} text='发送消息' />
          </Button>
          <Button style={{
            backgroundColor: '#8186ca', 
            borderColor: '#8a6d3b',
            padding:10,
            alignSelf: 'center'
          }}
          onPress={this.receiveMsg.bind(this)}>
            <Label style={{color: '#8a6d3b', fontSize: 16, paddingLeft: 8}} text='收取消息' />
          </Button>
        </View>
      </View>
    );
  }
  async sendMsg () {
    let realtime = new RealtimeHelp()
    realtime.createIMCClient();
  }
  async receiveMsg () {
    let realtime = new RealtimeHelp()
    realtime.receivedMsg();
  }
}

export default MyMessage
