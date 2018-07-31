const Realm = require('realm');
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import test from './realm/test'

export default class realmApp extends Component {
  constructor(props) {
    super(props);
    this.state = { realm: null };
  }

  componentWillMount() {
    // Realm.open({
    //   schema: [{name: 'Dog', properties: {name: 'string'}}]
    // }).then(realm => {
    //   realm.write(() => {
    //     realm.create('Dog', {name: 'Rex'});
    //   });
    //   console.log(realm.objects('Dog'))
    //   this.setState({ realm });
    // });
    test.RealmOpen()
  }

  render() {
    const info = this.state.realm
      ? 'Number of dogs in this Realm: ' + this.state.realm.objects('Dog').length
      : 'Loading...';

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {info}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
