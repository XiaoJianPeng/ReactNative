import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Label, Input, Button} from 'teaset';
import RealtimeHelp from '../LeancloudSdk/RealtimeHelp';
import ItemDivideComponent from './ItemDivideComponent';
import {Realtime, Event, TextMessage} from 'leancloud-realtime';
import AV from 'leancloud-storage';

class MyMessage extends Component {
  // static navigationOptions = {
  //   title: '聊天',
  // };
  constructor(props) {
    super(props)
    this.state = {
      msg: this.props.msg, 
      msgList: [],
      msginfo: '新消息：',
    }
  }
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'flex-start'
      }}>
        <Label style={{
            alignItems: 'flex-start',
          }} 
          size='xl' text={params.msg} 
        />
        <View style={{
          height: 60,
          padding:10,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
         
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
        <View style={{
          flex: 1,
          alignSelf: 'flex-start',
          justifyContent: 'flex-start',
          overflow: 'scroll',
        }}>
          <Label style={{color: '#8a6d3b', fontSize: 16, paddingLeft: 8}} text={this.state.msginfo} />
          {/* <FlatList style={{
              flex:1,
              backgroundColor:'lightgray',
            }}
            ListHeaderComponent={this._header}//header头部组件
            data={this.state.msgList}
            renderItem={
              ({item}) =>{
                <Label text= {item} />
              }
            }
          /> */}
        </View>
      </View>
    );
  }
  componentDidMount () {
    // this.receiveMsg.bind(this)
  }
  _header = function () {
    return (
      <View style={{
        alignSelf: 'center',
        justifyContent:'flex-start',
        flexDirection: 'row',
      }}>
        <Label style={styles.header} text= '聊天记录' />
      </View>
    )
  }
  sendMsg () {
    let realtime = new RealtimeHelp()
    realtime.createIMCClient();
  }
  receiveMsg () {
    let _this = this // 此处首先定义_this 赋值为当前this，避免在实时通信接收消息时读取不到当前的this
    let realtime = new RealtimeHelp()
    let newMsg = '暂无信息'
    let username = AV.User.current().get('username');
    realtime.createIMClient(username).then((res) => {
      res.on(Event.MESSAGE, function(message, conversation) {
        newMsg = message.text;
        alert(newMsg)
        _this.setState({msginfo: newMsg}) 
        console.warn(newMsg)
        // alert(newMsg)
        let msgs = _this.state.msgList;
        msgs.push(newMsg)
        _this.setState({msgList: msgs}) 
      });
    }).catch(err => console.error(err));
   

  }
}
const styles = StyleSheet.create({
  header: {
    flex:1,
    padding : 5,
    // alignSelf:'auto',
    // backgroundColor:'lightgray',
    borderColor: 'black',
    fontWeight: 'bold',
    fontSize: 12
  },
})

export default MyMessage
