import { AppRegistry } from 'react-native';
import React, {Component} from 'react';
//#region 原生组件练习
/* reactNative 原生组件练习
import LotsOfGreetings from './componts/LotsOfGreetings'
import BlinkApp from './componts/BlinkApp'
import LotsOfStyle from './componts/LotsOfStyle'
import FlexDimensionsBasics from './componts/FlexDimensionsBasics'
import FlexDirection from './componts/FlexDirection'
import TextInputTest from './componts/TextInputTest'
import ScrollViewTest from './componts/ScrollViewTest'
import FlatListTest from './componts/FlatListTest'
import SectionListTest from './componts/SectionListTest'
import FetchTest from './componts/FetchTest'
*/
//#endregion
import LoginApp from './testApp/Login';
import AV from 'leancloud-storage';
AV.init({
  appId: 'VKJfEk81YqWIqkxLtqxlyGpH-gzGzoHsz',
  appKey: 'H1hrm0dJWbnpzFAS6jJRsmuD'
});

AppRegistry.registerComponent('MyReactNative', () => LoginApp);
