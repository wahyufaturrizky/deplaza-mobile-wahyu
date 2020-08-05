import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from 'react-native-vector-icons/Feather';
import ActionButton from 'react-native-circular-action-menu';

import AllChat from './AllChat';

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

// detailchat component
export default class DetailChat extends Component {
  renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.listContainer}
      onPress={() =>
        this.props.navigation.navigate('ChatScreen', {data: item})
      }>
      <Image style={styles.avatar} source={item.avatar} />
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
    const item = this.props.route.params.data;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.buttonBack}
            onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-left" size={25} />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>{item.platform_name}</Text>
          <TouchableOpacity style={styles.searchIcon}>
            <Search name="search" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dot}>
            <Icon name="dots-vertical" size={25} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
        <ActionButton position="right" backdrop={true} radius={80}>
          <ActionButton.Item
            buttonColor="#fff"
            title="New Task"
            onPress={() => console.log('notes tapped!')}>
            <Image
              style={styles.iconButton}
              source={require('../../assets/images/fb.png')}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#fff"
            title="Notifications"
            onPress={() => {}}>
            <Image
              style={styles.iconButton}
              source={require('../../assets/images/ig.png')}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#fff"
            title="All Tasks"
            onPress={() => {}}>
            <Image
              style={styles.iconButton}
              source={require('../../assets/images/wa.png')}
            />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleHeader: {
    marginTop: 20,
    marginBottom: 20,
  },
  dot: {
    right: 10,
    position: 'absolute',
  },
  searchIcon: {
    right: 40,
    position: 'absolute',
  },
  buttonBack: {
    marginLeft: 10,
    marginRight: 10,
  },
  iconButton: {
    width: 30,
    height: 30,
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
  date: {
    textAlign: 'right',
    flex: 1,
    fontSize: 13,
    top: 10,
  },
});
