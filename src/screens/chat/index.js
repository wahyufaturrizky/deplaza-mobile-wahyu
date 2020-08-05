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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconArrow from 'react-native-vector-icons/MaterialIcons';
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

// chat component
export default class Chat extends Component {
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
      <Text style={{color: item.status ? '#4086f7' : '#f74040'}}>
        {item.status ? 'On' : 'Off'}
      </Text>
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
              source={require('../../assets/images/profileChat.jpg')}
            />
          </View>
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
