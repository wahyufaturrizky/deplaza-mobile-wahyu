/* eslint-disable */

import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, Image, Alert, ScrollView} from 'react-native';
import {Avatar} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import {URL} from '../../utils/global';

import Appbar from '../../components/appbarHome';
import BottomTab from '../../components/bottomTab';
import Loading from '../../components/loading';

function Akun(props) {
  const [nama, setNama] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [loading, setLoading] = useState(true);
  const [dataDetail, setDataDetail] = useState([]);

  const {height, width} = Dimensions.get('window');

  const urlProfile = URL + 'v1/my-profile';

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlProfile, {headers})
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData.data);
        setNama(responseData.data.fullname);
        setPhone(responseData.data.phone);
        setPhoto(responseData.data.avatar_url);
        setDataDetail(responseData.data);
        setLoading(false);
      });
  };

  const gotoEdit = () => {
    props.navigation.navigate('EditAkun', {
      title: 'Edit Akun',
      data: dataDetail,
    });
  };

  const gotoTarikDana = () => {
    props.navigation.navigate('SaldoPenjual', {title: 'Saldo Penjual'});
  };

  const gotoPembayaran = () => {
    props.navigation.navigate('PembayaranSaya', {title: 'Pembayaran Saya'});
  };

  const gotoRincianRekening = () => {
    props.navigation.navigate('RincianRekening', {
      title: 'Rincian Rekening Saya',
    });
  };

  const gotoWishlist = () => {
    props.navigation.navigate('Wishlist', {title: 'Produk Saya'});
  };

  const gotoNotifikasi = () => {
    props.navigation.navigate('Notifikasi', {title: 'Notifikasi'});
  };

  const handleLogout = async () => {
    Alert.alert(
      '',
      'Apakah anda yakin untuk logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Ok', onPress: () => logout()},
      ],
      {cancelable: false},
    );
  };

  const logout = async () => {
    await AsyncStorage.removeItem('regular');
    await AsyncStorage.removeItem('data');
    props.navigation.navigate('Login');
  };

  return (
    <View style={{flex: 1}}>
      <Appbar params={props} />
      <ScrollView>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View
            style={{
              flexDirection: 'row',
              padding: 25,
              backgroundColor: '#F8F8F8',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Avatar.Image size={height * 0.08} source={{uri: photo}} />
            <View style={{marginLeft: width * 0.04}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>{nama}</Text>
              <Text style={{fontSize: 16}}>+62 {phone}</Text>
              <TouchableOpacity
                onPress={gotoEdit}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Icon name="account-edit" size={30} color="#07A9F0" />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#07A9F0',
                    marginLeft: width * 0.01,
                  }}>
                  Ubah Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={gotoRincianRekening}>
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
              }}>
              <Image
                source={require('../../assets/images/wallet.png')}
                style={{
                  width: width * 0.1,
                  height: width * 0.1,
                  marginRight: width * 0.04,
                  resizeMode: 'contain',
                }}
              />
              <Text style={{fontSize: 18}}>Rincian Rekening Saya</Text>
            </View>
          </TouchableOpacity>

          <View style={{borderTopWidth: 1, borderColor: '#D5D5D5'}} />

          <TouchableOpacity onPress={gotoPembayaran}>
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
              }}>
              <Image
                source={require('../../assets/images/bill.png')}
                style={{
                  width: width * 0.1,
                  height: width * 0.1,
                  marginRight: width * 0.04,
                  resizeMode: 'contain',
                }}
              />
              <Text style={{fontSize: 18}}>Pembayaran Saya</Text>
            </View>
          </TouchableOpacity>

          <View style={{borderTopWidth: 1, borderColor: '#D5D5D5'}} />

          <TouchableOpacity onPress={gotoWishlist}>
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
              }}>
              <Image
                source={require('../../assets/images/box.png')}
                style={{
                  width: width * 0.1,
                  height: width * 0.1,
                  marginRight: width * 0.04,
                  resizeMode: 'contain',
                }}
              />
              <Text style={{fontSize: 18}}>Produk Saya</Text>
            </View>
          </TouchableOpacity>

          <View style={{borderTopWidth: 1, borderColor: '#D5D5D5'}} />

          <TouchableOpacity onPress={gotoNotifikasi}>
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
              }}>
              <Image
                source={require('../../assets/images/megaphone.png')}
                style={{
                  width: width * 0.1,
                  height: width * 0.1,
                  marginRight: width * 0.04,
                  resizeMode: 'contain',
                }}
              />
              <Text style={{fontSize: 18}}>Notifikasi</Text>
            </View>
          </TouchableOpacity>

          <View style={{borderTopWidth: 1, borderColor: '#D5D5D5'}} />

          <TouchableOpacity onPress={gotoTarikDana}>
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
              }}>
              <Image
                source={require('../../assets/images/penarikan.png')}
                style={{
                  width: width * 0.1,
                  height: width * 0.1,
                  marginRight: width * 0.04,
                  resizeMode: 'contain',
                }}
              />
              <Text style={{fontSize: 18}}>Tarik Dana</Text>
            </View>
          </TouchableOpacity>

          <View style={{borderTopWidth: 1, borderColor: '#D5D5D5'}} />

          <TouchableOpacity onPress={handleLogout}>
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
              }}>
              <Image
                source={require('../../assets/images/exit.png')}
                style={{
                  width: width * 0.1,
                  height: width * 0.1,
                  marginRight: width * 0.04,
                  resizeMode: 'contain',
                }}
              />
              <Text style={{fontSize: 18}}>Logout</Text>
            </View>
          </TouchableOpacity>

          <View style={{borderTopWidth: 1, borderColor: '#D5D5D5'}} />
        </View>

        {loading && <Loading />}
      </ScrollView>
      <BottomTab {...props} />
    </View>
  );
}

export default Akun;
