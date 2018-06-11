import React, {Component} from 'react';
import { View, Text, Button, StyleSheet, TouchableHighlight} from 'react-native';
class FetchTest extends Component {
    render() {
        return (
            <View style={styles.container}>
              <TouchableHighlight
                  underlayColor='rgb(210,260,260)'
                  style={{padding: 10, marginTop: 10, borderRadius: 5,}}
                  onPress={this.get}
              >
                <Text >get请求</Text>
              </TouchableHighlight>
              <TouchableHighlight
                  underlayColor='rgb(210,260,260)'
                  style={{padding: 10, marginTop: 10, borderRadius: 5,}}
                  onPress={this.post}
              >
                <Text >post请求</Text>
              </TouchableHighlight>
            </View>
        );
    }

    get() {
        fetch('http://ip.taobao.com/service/getIpInfo.php?ip=59.108.51.32', {
            method: 'GET',
            headers: {
              'Content-Type': 'text/html;charset=UTF-8'
          }
        }).then((response) => {
            console.warn('json', response);//1
        }).catch((err) => {//2
            console.error(err);
        });
    }
    post() {
      fetch('http://ip.taobao.com/service/getIpInfo.php', {
          method: 'POST',//1
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({//2
              'ip': '59.108.23.12'
          })
      }).then((response) => {response.json();
        console.warn(response)}
      ).then((jsonData) => {
        console.warn(jsonData);
        let country = jsonData.data.country;
        let city = jsonData.data.city;
        alert("country:" + country + "-------city:" + city);
      });
  }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    }
});
export default FetchTest
