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
    name: 'Achmad Fatur Rizky',
    message: 'hallo, saya mau pesan fsdfsdfs',
    avatar: require('../../assets/images/profileChat.jpg'),
    platform: require('../../assets/images/wa.png'),
    platform_name: 'Whatsapp',
    date: '24/7/2020',
  },
  {
    id: 2,
    name: 'Tiger Hazian',
    message: 'hallo, saya mau pesan',
    avatar: require('../../assets/images/profileChat.jpg'),
    platform: require('../../assets/images/ig.png'),
    platform_name: 'Instagram',
    date: '24/7/2020',
  },
  {
    id: 3,
    name: 'Raisa Andriana',
    message: 'hallo, saya mau pesan',
    avatar: require('../../assets/images/profileChat.jpg'),
    platform: require('../../assets/images/fb.png'),
    platform_name: 'Messenger',
    date: '24/7/2020',
  },
  {
    id: 4,
    name: 'Luis Fernandez',
    message: 'hallo, saya mau pesan',
    avatar: require('../../assets/images/profileChat.jpg'),
    platform: require('../../assets/images/wa.png'),
    platform_name: 'Whatsapp',
    date: '24/7/2020',
  },
];

// AllChat component
export default class AllChat extends Component {
  renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.listContainer}
      onPress={() =>
        this.props.navigation.navigate('DetailChat', {data: item})
      }>
      <Image style={styles.avatar} source={item.avatar} />
      <Image style={styles.platform} source={item.platform} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message} numberOfLines={1}>
          {item.message}
        </Text>
      </View>
      <Text style={styles.date}>{item.date}</Text>
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
    width: 55,
    height: 55,
    borderRadius: 55,
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
  date: {
    textAlign: 'right',
    flex: 1,
    fontSize: 13,
    top: 10,
  },
});
