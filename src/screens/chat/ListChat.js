import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from 'react-native-vector-icons/Feather';
import TopBar from './TopBar';

// ListChat component
export default class ListChat extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.buttonBack}
            onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-left" size={25} />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Pengaturan Akun Chat</Text>
          <TouchableOpacity style={styles.searchIcon}>
            <Search name="search" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.dot}>
            <Icon name="dots-vertical" size={25} />
          </TouchableOpacity>
        </View>
        <TopBar />
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
});
