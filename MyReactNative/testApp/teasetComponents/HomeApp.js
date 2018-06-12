import React, {Component} from 'react';
import {View, FlatList, Image, StyleSheet} from 'react-native';
import {Label, Input, Button, ListRow} from 'teaset';
import AV from 'leancloud-storage';
import LeancloudHelp from '../LeancloudSdk/LeancloudHelp';
import ItemDivideComponent from './ItemDivideComponent'

class HomeApp extends Component {
  static navigationOptions={
    title: '主页',//设置标题内容
  }
  constructor(props) {
    super(props)
    this.state = {msg: this.props.msg, userLsit: []}
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{
        flex: 1, 
        alignItems: 'stretch', 
        justifyContent: 'center',
        padding: 10,
      }}>
        <View style={{
          height: 5,
        }}>
          <Label style={{
              alignItems: 'flex-start',
            }} 
            size='xl' text={'用户信息查询'} 
          />
        </View>
        <View style={{
          top: 5,
          flex: 1, 
          alignItems: 'flex-start',
          justifyContent: 'space-around',
          flexDirection: 'row',
          padding:10,
        }}>          
          <Button style={{
              backgroundColor: '#8186ca', 
              borderColor: '#8a6d3b',
              padding:10,
              alignSelf: 'center'
            }}
          onPress={this.getUserLsit.bind(this)} title="查询用户信息" />
          <Button Button style={{
              backgroundColor: '#8bca81',
              borderColor: '#8a6d3b',           
              padding:10,
              alignSelf: 'center'
            }}
            onPress={() => {
            navigate('Login')
          }} title="跳转登录页" />
        </View>
        <View style={{
          flex: 4,
          alignSelf: 'auto',
          borderTopWidth: 1,
          top:1,
          overflow: 'scroll',
        }}>
        <FlatList style={{
            flex:1,
          }}
          ItemSeparatorComponent={ItemDivideComponent} // 分割线
          ListHeaderComponent={this._header}//header头部组件
          showsHorizontalScrollIndicator={true}
          // showsVerticalScrollIndicator={true}
          data={this.state.userLsit}
          renderItem={
            ({item}) =>
              <View style={{
                flex:1,
                justifyContent:'flex-start',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
                <Label style={styles.columns} text= {item.username} />
                <Label style={styles.columns} text= { item.organization} />
                <Label style={styles.columns} text= { item.mobilePhoneNumber} />
                <Label style={styles.columns} text= { item.position} />
                <Label style={styles.columns} text= { item.status} />
                <Label style={styles.columns} text= { item.createdAt} />
              </View>
            }
          />
        </View>
      </View>
    );
  }
  _header = function () {
    return (
      <View style={{
        justifyContent:'flex-start',
        flexDirection: 'row',
      }}>
        <Label style={styles.header} text= '姓名' />
        <Label style={styles.header} text= '校区' />
        <Label style={styles.header} text= '手机' />
        <Label style={styles.header} text= '职位' />
        <Label style={styles.header} text= '状态' />
        <Label style={styles.header} text= '添加时间' />
      </View>
    )
  }
  getUserLsit () {
    // console.warn(AV.User.current())
    LeancloudHelp.getList('_User').then(res => {
      this.setState({userLsit:this.state.userLsit.concat(res)})
      console.warn(res)
    }).catch(err => {
      console.error(err)
    })
  }
}
const styles = StyleSheet.create({
  columns : {
    flex : 1,
    padding : 5,
    alignSelf:'stretch',
    backgroundColor:'lightgray',
    borderColor: 'black',
    fontSize: 11,
   },
  header: {
    flex : 1,
    padding : 5,
    alignSelf:'stretch',
    backgroundColor:'lightgray',
    borderColor: 'black',
    fontWeight: 'bold',
    fontSize: 11
  },
  item: {
    padding : 10,
    fontSize : 26,
    height : 100,
  }
})
export default HomeApp
