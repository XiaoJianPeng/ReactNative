import React, {Component} from 'react';
import {View, FlatList, Image, StyleSheet} from 'react-native';
import {Label, Input, Button, ListRow} from 'teaset';
import LeancloudHelp from '../LeancloudSdk/LeancloudHelp';
import ItemDivideComponent from './ItemDivideComponent'

class HomeApp extends Component {
  // static navigationOptions={
  //   title: '主页',//设置标题内容
  // }
  constructor(props) {
    super(props)
    this.state = {
      msg: this.props.msg, 
      userLsit: [],
      loading: false, // 控制加载动画显示
      total: 0, //查询到的总记录数
      showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
      // isRefreshing: false,//上拉刷新
      filters: {
        username: '',
        limit: 10,
        currpage: 1
      }
    }
  }
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={{
        flex: 1, 
        alignItems: 'stretch', 
        justifyContent: 'center',
        padding: 10,
      }}>
        <View style={{
          height: 20,
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
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          flexWrap:'wrap',
          padding:10,
        }}>
          <Input
            style={{width: 100, backgroundColor: '#fcf8e3', borderColor: '#8a6d3b', color: '#8a6d3b', textAlign: 'left'}}
            value={this.state.filters.username}
            placeholder="请输入用户名"
            onChangeText={text =>{ 
              this.setState(previousState => {
                let filters = previousState.filters;
                filters.username = text;
                return {filters: filters}
              })
            }}
          />
          <Button style={{
              backgroundColor: '#8186ca', 
              borderColor: '#8a6d3b',
              padding:10,
            }}
          onPress={this.getFirstPage.bind(this)} title="查询" />
          <Button Button style={{
              backgroundColor: '#8bca81',
              borderColor: '#8a6d3b',           
              padding:10,
            }}
            onPress={() => {
            navigate('Login')
          }} title="跳转登录页" />
        </View>
        <View style={{
          flex: 10,
          alignSelf: 'auto',
          borderTopWidth: 1,
          top:1,
          overflow: 'scroll',
        }}>
        <FlatList style={{
            flex:1,
          }}
          refreshing = {this.state.loading}
          onRefresh ={() => {return;}} // 上拉刷新
          ItemSeparatorComponent={ItemDivideComponent} // 分割线
          ListHeaderComponent={this._header}//header头部组件
          ListFooterComponent={this._renderFooter.bind(this)} // 尾部组件
          showsHorizontalScrollIndicator={true} // 展示垂直滚动条
          // showsVerticalScrollIndicator={true}  // 水平滚动条
          onEndReachedThreshold= {0.2}
          onEndReached = {this._onEndReached.bind(this)} // 下拉刷新    
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
  renderLoadingView() {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                animating={true}
                color='red'
                size="large"
            />
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
  _renderFooter(){
    if (this.state.showFoot === 1) {
        return (
            <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                <Label style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                    没有更多数据了
                </Label>
            </View>
        );
    } else if(this.state.showFoot === 2) {
        return (
            <View style={styles.footer}>
                <Label>正在加载更多数据...</Label>
            </View>
        );
    } else if(this.state.showFoot === 0){
        return (
          <View style={styles.footer}>
              <Label />
          </View>
        );
    }
  }
  _onEndReached(){
    let filters = this.state.filters;
    if(filters.currpage * filters.limit >= this.state.total) {
      this.setState({showFoot:1});
      return;
    }
    filters.currpage ++;
    this.setState({filters:filters, showFoot:2})
    //获取数据
    this.getUserLsit();    
  }
  getFirstPage () {
    let filters = this.state.filters;
    filters.currpage = 1;
    this.setState({filters: filters});
    this.getUserLsit();
  }
  getUserLsit () {
    let params = [
      {colName: 'username', value: this.state.filters.username, queryType: 'contains'}
    ]
    this.setState({loading: true})
    // console.warn(this.state.filters)
    LeancloudHelp.getList('_User', params,this.state.filters.limit,this.state.filters.currpage).then(res => {
      if (this.state.filters.currpage === 1) {
        this.setState({userLsit: res.data})
      } else {
        this.setState({userLsit: this.state.userLsit.concat(res.data)})
      }
      this.setState({total: res.total})
      if(this.state.filters.currpage * this.state.filters.limit >= res.total) {
        this.setState({showFoot:1});
      } else {
        this.setState({showFoot:2});
      }
      this.setState({loading: false})
    }).catch(err => {
      console.error(err)
    })
  }
}
const styles = StyleSheet.create({
  columns : {
    flex:1,
    padding : 15,
    // alignSelf:'auto',
    backgroundColor:'lightgray',
    borderColor: 'black',
    fontSize: 12,
   },
  header: {
    flex:1,
    padding : 5,
    // alignSelf:'auto',
    backgroundColor:'lightgray',
    borderColor: 'black',
    fontWeight: 'bold',
    fontSize: 11
  },
  item: {
    padding : 10,
    fontSize : 26,
    height : 100,
  },
  container:{
    flex: 1,
    backgroundColor:'#fff'
  },
  icon: {
      height: 22,
      width: 22,
      resizeMode: 'contain'
  }
})
export default HomeApp
