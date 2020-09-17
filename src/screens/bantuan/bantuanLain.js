/* eslint-disable */
import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

import Appbar from '../../components/appbarHome';
import {ScrollView} from 'react-native-gesture-handler';
import {URL, formatRupiah} from '../../utils/global';

function bantuanLain(props) {
  const [masalah, setMasalah] = useState('');
  const [changeBantu, setChangeBantu] = useState(0);
  const {height, width} = Dimensions.get('window');

  const handleProblem = async () => {
    let formdata = new FormData();
    formdata.append('problem', masalah);
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);
    let requestOptions = {
      method: 'POST',
      body: formdata,
      headers: {
        Authorization: `Bearer ${data.token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    fetch(URL + '/v1/helpdesk', requestOptions)
      .then(response => response.json())
      .then(async responseData => {
        if (responseData.message === 'Success') {
          alert('Berhasil kirim data');
          props.navigation.navigate('JualanAnda', {
            title: 'Jualan Anda',
          });
        } else {
          alert('Ada kesalahan, mohon ulang');
        }
      })
      .done();
  };
  return (
    <View style={{flex: 1}}>
      <Appbar params={props} />

      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            width: '90%',
            alignSelf: 'center',
          }}>
          <Image
            source={require('../../assets/images/ask.png')}
            style={{
              width: width * 0.2,
              height: width * 0.2,
              resizeMode: 'contain',
              marginBottom: height * 0.02,
              marginTop: 20,
            }}
          />

          <View
            style={{alignItems: 'center', width: '90%', alignSelf: 'center'}}>
            <Text
              style={{
                fontSize: 26,
                fontWeight: 'bold',
                marginBottom: height * 0.02,
                textAlign: 'center',
              }}>
              Tulis Masalah Anda di Sini
            </Text>
          </View>

          <TextInput
            label="Masalah Detail"
            value={masalah}
            mode="outlined"
            onChangeText={val => setMasalah(val)}
            style={{
              width: '100%',
              alignSelf: 'center',
              backgroundColor: 'white',
              marginTop: height * 0.005,
              marginBottom: height * 0.01,
            }}
            multiline={true}
            numberOfLines={6}
          />
        </View>

        <View
          style={{
            flex: 1,
            width: '90%',
            alignSelf: 'center',
            marginBottom: height * 0.01,
          }}>
          <Text>Note :</Text>
          <Text>Kami akan menghubungi Anda 1 x 24 jam</Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={{width: '90%', alignSelf: 'center'}}
            onPress={() => handleProblem()}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={['#0956C6', '#0879D8', '#07A9F0']}
              style={{
                padding: height * 0.02,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text style={{fontSize: 20, textAlign: 'center', color: 'white'}}>
                Kirim
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default bantuanLain;
