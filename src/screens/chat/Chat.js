import React, {useState, useCallback, useEffect} from 'react';
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
import {GiftedChat} from 'react-native-gifted-chat';

export default function Example(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  // fungsi untuk kirim pesan
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const item = props.route.params.data;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => props.navigation.goBack()}>
          <Icon name="arrow-left" size={25} />
        </TouchableOpacity>
        <Image style={styles.avatar} source={item.avatar} />
        <Text style={styles.titleHeader}>{item.name}</Text>
        <TouchableOpacity style={styles.searchIcon}>
          <Search name="search" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dot}>
          <Icon name="dots-vertical" size={25} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    </View>
  );
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
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
    width: 35,
    height: 35,
    borderRadius: 35,
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
