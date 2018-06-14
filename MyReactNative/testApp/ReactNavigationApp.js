import { StackNavigator} from 'react-navigation'; // 导入StackNavigator
import LoginApp from './teasetComponents/LoginApp' //登录页
import TabMain from './TabMain'

// 1 StackNavigator: 类似于普通的Navigator，屏幕上方导航栏
// 2 TabNavigator: 相当于ios里面的TabBarController，屏幕下方的标签栏
// 3 DrawerNavigator: 抽屉效果，侧边滑出
const App = StackNavigator({
  Login: {screen: LoginApp},
  TabMain: {
    screen: TabMain,
  }
},{
  initialRouteName: 'Login', // 默认显示界面
  mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
  headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
  onTransitionStart: ()=>{ console.log('导航栏切换开始'); },  // 回调
  onTransitionEnd: ()=>{ console.log('导航栏切换结束'); }  // 回调
});

export default App
