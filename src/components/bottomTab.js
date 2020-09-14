import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage'

function bottomTab(props) {
  const title = props.route.params.title;
  //Pergi menuju halaman pesanan
  const gotoAkun = () => {
    props.navigation.navigate('Akun', {title: 'Akun Saya', ...props});
  };

  const gotoChat = async() => {
    let syncIg = await AsyncStorage.getItem(`sync-Instagram`);
    let syncWa = await AsyncStorage.getItem(`sync-Whatsapp`);
    let syncFb = await AsyncStorage.getItem(`sync-Mesengger`);
    console.log(syncIg+syncWa+syncFb)
    if(syncIg!=null || syncWa!=null || syncFb!=null){
      props.navigation.navigate('Chat');
    }else{
      props.navigation.navigate('Chat');
    }

  };

  const gotoBantuan = () => {
    props.navigation.navigate('Bantuan', {title: 'Bantuan Jualan'});
  };

  const gotoHome = () => {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'JualanAnda', params: {title: 'Jualan Anda'}}],
      }),
    );
  };

  return (
    <View
      style={[
        styles.shadow,
        {
          backgroundColor: '#FDFEFF',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        },
      ]}>
      <TouchableOpacity onPress={gotoHome}>
        <View style={{alignItems: 'center'}}>
          <Icon
            name="home"
            size={30}
            color={title === 'Jualan Anda' ? '#07A9F0' : '#949494'}
          />
          <Text>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={gotoBantuan}>
        <View style={{alignItems: 'center'}}>
          <Icon
            name="help-circle-outline"
            size={30}
            color={title === 'Bantuan Jualan' ? '#07A9F0' : '#949494'}
          />
          <Text>Bantuan Jualan</Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={gotoPesanan}>
                <View style={{alignItems:'center'}}>
                    <Icon name="account" size={30} color="#949494" />
                    <Text>Pesanan Saya</Text>
                </View>
            </TouchableOpacity> */}
      <TouchableOpacity onPress={gotoAkun}>
        <View style={{alignItems: 'center'}}>
          <Icon
            name="account"
            size={30}
            color={title === 'Akun Saya' ? '#07A9F0' : '#949494'}
          />
          <Text>Akun</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={gotoChat}>
        <View style={{alignItems: 'center'}}>
          <Icon
            name="chat"
            size={30}
            color={title === 'Chat' ? '#07A9F0' : '#949494'}
          />
          <Text>Chat</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default bottomTab;

const styles = StyleSheet.create({
  shadow: {
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
});
