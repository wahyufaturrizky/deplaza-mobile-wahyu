import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';

const data = [
  {
    id: 1,
    name: 'Whatsapp',
    message: 'hallo, saya mau pesan fsdfsdfs',
    avatar: require('../../assets/images/profileChat.jpg'),
    platform: require('../../assets/images/wa.png'),
    date: '24/7/2020',
    total: 120,
  },
  {
    id: 2,
    name: 'Instagram',
    message: 'hallo, saya mau pesan',
    avatar: require('../../assets/images/profileChat.jpg'),
    platform: require('../../assets/images/ig.png'),
    date: '24/7/2020',
    total: 76,
  },
  {
    id: 3,
    name: 'Messenger',
    message: 'hallo, saya mau pesan',
    avatar: require('../../assets/images/profileChat.jpg'),
    platform: require('../../assets/images/fb.png'),
    date: '24/7/2020',
    total: 88,
  },
];

// platform component
export default class Platform extends Component {
  renderItem = ({item}) => (
    <TouchableOpacity style={styles.listContainer}>
      <Image style={styles.avatar} source={item.platform} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message} numberOfLines={1}>
          {item.message}
        </Text>
      </View>
      <View style={styles.totalContent}>
        <Text style={styles.total}>{item.total}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: '#cecece',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  platform: {
    width: 15,
    height: 15,
    borderRadius: 15,
    alignSelf: 'flex-end',
    right: 15,
  },
  name: {
    fontSize: 16,
    color: '#000',
  },
  message: {
    color: 'grey',
    width: 170,
  },
  total: {
    fontSize: 13,
    color: '#fff',
    marginLeft: 10,
    marginRight: 10,
  },
  totalContent: {
    backgroundColor: '#4086f7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 50,
    height: 25,
    top: 20,
    position: 'absolute',
    right: 0,
  },
});
