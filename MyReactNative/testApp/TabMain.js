import React, {Component} from 'react';
import {createBottomTabNavigator, Image, StyleSheet } from 'react-navigation';
import MyMessage from './teasetComponents/MyMessage';
import HomeApp from './teasetComponents/HomeApp';　// home 页

// 创建并导出一个React组件
export default TabMain = createBottomTabNavigator({
  Home: {
    screen: HomeApp,
    navigationOptions: ({navigation}) => ({
      //这里设置Tabbar不同页面可能会不同的属性
      tabBarVisible: true,
      tabBarLabel:'主页',
      // tabBarIcon:(({tintColor, focused}) => {
      //   return(
      //     <Image
      //       source={require('./icons/home_active.png')}
      //       // style={[{tintColor: tintColor}, styles.tabbarImage]}
      //     />
      //   )
      // })
    })
  },
  Message: {
    screen: MyMessage,
    navigationOptions: ({navigation}) => ({
      //这里设置Tabbar不同页面可能会不同的属性
      tabBarVisible: true,
      tabBarLabel:'聊天',
      // tabBarIcon:(({tintColor, focused}) => {
      //   return(
      //     <Image
      //       source={require('./icons/edit2x.png')}
      //       // style={[{tintColor: tintColor},styles.tabbarImage]}
      //     />
      //   )
      // })
    })
  }
},{
  initialRouteName: 'Message', // 设置默认的页面组件
  backBehavior:'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
  tabBarOptions:{
    activeTintColor:'#d81e06', // label和icon的前景色 活跃状态下（选中）
    inactiveTintColor:'#515151', // label和icon的前景色 不活跃状态下(未选中)
    labelStyle:{
        fontSize: 12,
    } //label的样式
  }
})

// const styles = StyleSheet.create({
//   navigatorTitle:{
//       fontSize:17,
//       color:'white',
//   },
//   navigator:{
//       backgroundColor:'#d81e06',
//   },
//   tabbarImage:{
//       width:25,
//       height:25,
//       marginBottom:-3,
//   }
// })
