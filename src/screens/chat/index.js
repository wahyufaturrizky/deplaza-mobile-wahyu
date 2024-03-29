import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconArrow from 'react-native-vector-icons/MaterialIcons';
import {URL} from '../../utils/global'
const data = [
  {
    id: 1,
    title: 'Whatsapp',
    description: '+6289995465',
    icon: require('../../assets/images/wa.png'),
    status: true,
  },
  {
    id: 2,
    title: 'Messenger',
    description: 'test@email.com',
    icon: require('../../assets/images/fb.png'),
    status: true,
  },
  {
    id: 3,
    title: 'Instagram',
    description: '',
    icon: require('../../assets/images/ig.png'),
    status: false,
  },
];

const urlProfile = URL+'v1/my-profile'

// chat component
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instagram: false,
      whatsapp: false,
      mesengger: false,
      nama:'',
      avatar:''
    };
  }
  
  componentDidMount() {
    this.checkSync()
    this.getProfile()
  }

  checkSync = async() =>{
    let syncIg = await AsyncStorage.getItem(`sync-Instagram`);
    console.log('ig',syncIg)
    syncIg=='true' ? this.setState({instagram:'On'}) : this.setState({instagram:'Off'})

    let syncWa = await AsyncStorage.getItem(`sync-Whatsapp`);
    console.log('wa',syncWa)
    syncWa=='true' ? this.setState({whatsapp:'On'}) : this.setState({whatsapp:'Off'})
    
    let syncFb = await AsyncStorage.getItem(`sync-Mesengger`);
    console.log('fb',syncFb)
    syncFb=='true' ? this.setState({mesengger:'On'}) : this.setState({mesengger:'Off'})
  }

  getProfile = async() => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value)

    let headers = {
        Authorization: `Bearer ${data.token}`,
        'Access-Control-Allow-Origin': '*',
    }

    fetch(urlProfile, {headers})
        .then(response => response.json())
        .then(responseData => {
            this.setState({nama:responseData.data.fullname,avatar:responseData.data.avatar_url})
        })
  }

  renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.contentList}
      onPress={() => this.props.navigation.navigate('Sync', {content: item})}>
      <Image style={styles.imageList} source={item.icon} />
      <View style={styles.contentCenter}>
        <Text style={styles.titleContent}>{item.title}</Text>
        <Text style={styles.textContentDesc}>
          {item.description === ''
            ? `Setting chat ${item.title}`
            : item.description}
        </Text>
      </View>
      {item.title=="Whatsapp" && 
      <Text style={{color: (this.state.whatsapp=="On") ? '#4086f7' : '#f74040' }}>
        {this.state.whatsapp}
      </Text>
      }
      {item.title=="Instagram" && 
      <Text style={{color: (this.state.instagram=="On") ? '#4086f7' : '#f74040' }}>
        {this.state.instagram}
      </Text>
      }
      {item.title=="Messenger" && 
      <Text style={{color: (this.state.mesengger=="On") ? '#4086f7' : '#f74040' }}>
        {this.state.mesengger}
      </Text>
      }
      <IconArrow name="keyboard-arrow-right" style={styles.iconContent} />
    </TouchableOpacity>
  );

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.buttonBack}
            onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-left" size={25} />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Pengaturan Akun Chat</Text>
          <TouchableOpacity style={styles.dot}>
            <Icon name="dots-vertical" size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.contentAvatar}>
            <Image
              style={styles.avatar}
              source={{uri:this.state.avatar}}
            />
          </View>
          <Text style={styles.textContentTitle}>{this.state.nama}</Text>
          <Text style={styles.textContentTitle}>Pilih Akun Sosial Media</Text>
          <Text style={styles.textContentDesc}>
            Untuk melanjutkan ke halaman Chat
          </Text>
        </View>
        <View style={{marginTop: 50}}>
          <FlatList
            data={data}
            renderItem={this.renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,
  },
  titleHeader: {
    marginTop: 20,
    marginBottom: 20,
  },
  dot: {
    right: 10,
    position: 'absolute',
  },
  buttonBack: {
    marginLeft: 10,
    marginRight: 10,
  },
  contentAvatar: {
    width: 90,
    height: 90,
    borderRadius: 90,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 90,
  },
  textContentTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
  },
  textContentDesc: {
    color: 'grey',
  },
  contentList: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageList: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    flex: 1,
  },
  contentCenter: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    flex: 3,
  },
  iconContent: {
    fontSize: 25,
  },
  titleContent: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
