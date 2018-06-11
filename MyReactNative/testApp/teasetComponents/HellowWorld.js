import React, {Component} from 'react';
import {View, AppRegistry} from 'react-native';
import {Label} from 'teaset';

class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Label size='xl' text='Hello world!' />
      </View>
    );
  }
}

export default HelloWorldApp
