import { AppRegistry,Image, View  } from 'react-native';
import App from './App';
import React, {Component} from 'react'
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
// class Bananas extends Component {
//   render() {
//     let pic = {
//       uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
//     };
//     return (
//       <View>
//         <Image source={pic} style={{width: 193, height: 110}} />
//         <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
//         <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}} />
//       </View>
//     );
//   }
// }

AppRegistry.registerComponent('MyReactNative', () => FetchTest);
