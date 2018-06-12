// import {StackNavigator, TabNavigator} from 'react-navigation';
// import LoginApp from './teasetComponents/HelloWorldApp'
// import HomeApp from './teasetComponents/HomeApp'

// const MainScreenNavigation = TabNavigator({
//   LoginPage: {
//     screen: LoginApp,
//     navigationOptions: {
//       tabBarLabel: '登录',
//       headerTitle: '登录',
//       tabBarIcon: ({tintColor, focused}) => (
//         <Image style={[{height: 24, width: 24,},{tintColor: tintColor}]}
//           source={focused?require('./icons/home_active.png'):require('./icons/home.png')} />
//       ),
//     }
//   },
//   HomePage: {
//     screen: HomeApp,
//     navigationOptions:{
//       tabBarLabel: '主页',
//       headerTitle: '主页',
//     }
//   },
// },
// {
//   tabBarPosition: 'bottom',
//   swipeEnabled: false, // taBar显示的位置 android默认显示在页面顶端
//   animationEnabled: false, // 切换页面时是否有动画
//   tabBarComponent: {
//     activeTintColor: '#bb6b50', // 文字和图片选中的颜色
//     inactiveTintColor: '#333', // 文字图片未选中的颜色
//     showIcon: false, // android 默认不显示icon
//     indicatorStyle: {
//       height:0,   // Android 导航下默认显示一条黄色的线 高度为0可以隐藏
//     },
//     style: {
//       backgroundColor: 'white', // tabbar 背景色
//       height: 50,  // 高度必须写 ，否则安卓ios样式差别大
//     },
//     labelStyle: {
//       fontSize:14,
//       marginTop: -1,
//     },
//     tabBarIconStyle: {
//       marginTop: -3,
//     }
//   }
// });

// const option = {
//   headerTintColor: '#333',
//   headerBackTitle: null,
//   headerStyle: {
//     backgroundColor: '#fff',
//   },
//   gesturesEnabled: false,
// };

// const Stack = StackNavigator ({
//   Main: {
//     screen: MainScreenNavigation,
//   },
// },{
//   initialRouteName: 'Main',
//   navigationOptions: option,
// });

// export default Stack;
