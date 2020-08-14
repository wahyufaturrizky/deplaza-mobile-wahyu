import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {WebView} from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';

export default class Sync extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.buttonBack}
              onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-left" size={25} />
            </TouchableOpacity>
            <Text style={styles.titleHeader}>Canva</Text>
          </View>
          {/* <View style={styles.sync}>
            <Text style={styles.textSync}>Sinkronisasi {content.title}</Text>
            <Switch
              trackColor={{false: 'gray', true: 'teal'}}
              thumbColor="white"
              ios_backgroundColor="gray"
              onValueChange={value => this.setState({toggle: value})}
              value={this.state.toggle}
            />
          </View> */}
        </View>

        <WebView
          scalesPageToFit={false}
          userAgent={
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.04147.89 Mobile Safari/537.36'
          }
          source={{uri: 'https://www.canva.com/id_id/'}}
        />

        {/* <View style={styles.content}>
            <Image style={styles.icon} source={content.icon} />
            <View style={styles.textInput}>
              <TextInput
                label="Username"
                mode="outlined"
                onChangeText={val => this.setState({val: val})}
                selectionColor={'#07A9F0'}
                underlineColor={'#07A9F0'}
                underlineColorAndroid={'#07A9F0'}
                theme={{
                  colors: {primary: '#07A9F0', underlineColor: 'transparent'},
                }}
                style={{
                  width: '75%',
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  height: 50,
                }}
              />
              <TextInput
                label="Password"
                mode="outlined"
                onChangeText={val => this.setState({val: val})}
                selectionColor={'#07A9F0'}
                underlineColor={'#07A9F0'}
                underlineColorAndroid={'#07A9F0'}
                theme={{
                  colors: {primary: '#07A9F0', underlineColor: 'transparent'},
                }}
                style={{
                  width: '75%',
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  height: 50,
                  marginTop: 10,
                }}
              />
            </View>
          </View> */}

        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('ListChat')}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#0956C6', '#0879D8', '#07A9F0']}
            style={{padding: 15}}>
            <Text style={{fontSize: 20, textAlign: 'center', color: 'white'}}>
              Tambah Akun Chat
            </Text>
          </LinearGradient>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    backgroundColor: '#f5f5f5',
    width: '100%',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonBack: {
    marginLeft: 10,
  },
  titleHeader: {
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
  },
  sync: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
  },
  textSync: {
    fontSize: 16,
    marginBottom: 20,
    marginTop: 20,
  },
  icon: {
    width: 40,
    height: 40,
    marginLeft: 25,
    marginTop: 5,
  },
  content: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    flexDirection: 'column',
    width: '100%',
    right: 35,
  },
  button: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
});
