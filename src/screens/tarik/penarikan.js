/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

import Appbar from '../../components/appbarHome';
import {URL, formatRupiah} from '../../utils/global';
import Loading from '../../components/loading';

function penarikan(props) {
  const [check, setCheck] = useState(false);
  const [ammount, setAmmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rek, setRek] = useState([]);
  const [norek, setNoRek] = useState('');
  const [bank, setBank] = useState([]);

  const {height, width} = Dimensions.get('window');
  const urlSaldo = URL + 'v1/withdrawal';
  const urlListRekeing = URL + 'v1/account/me';
  const urlSaldoUpdate = URL + 'v1/saldo/my';
  const [saldo, setSaldo] = useState('0');

  useEffect(() => {
    getRekening();
  }, []);

  const getRekening = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlListRekeing, {headers})
      .then(response => response.json())
      .then(responseData => {
        setNoRek(responseData.data[0].number);
        setBank(responseData.data[0].bank);
        setLoading(false);
      });
  };

  console.log(bank);

  const gotoTarikDana = () => {
    props.navigation.navigate('SaldoPenjual', {title: 'Saldo Penjual'});
  };

  const gotoPenarikan = () => {
    props.navigation.navigate('Penarikan', {title: 'Penarikan'});
  };

  const postWithDraw = async () => {
    setLoading(true);
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    var formdata = new FormData();
    formdata.append('account_id', data.id);
    formdata.append('amount', ammount);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    var requestOptions = {
      headers,
      method: 'POST',
      body: formdata,
    };

    console.log('ammount', ammount);

    if (ammount === 0) {
      Alert.alert(
        '',
        'Penarikan Dana Gagal diajukan, mohon untuk mengisi nominal diatas Rp 0',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Ok',
            onPress: () => gotoPenarikan(),
          },
        ],
        {cancelable: false},
      );
      setLoading(false);
    } else {
      fetch(URL + '/v1/withdrawal', requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setLoading(false);
          Alert.alert(
            '',
            'Penarikan Dana Berhasil diajukan, proses peninjauan paling lambat 1 x 24 jam',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Ok',
                onPress: () => gotoTarikDana(),
              },
            ],
            {cancelable: false},
          );
        })
        .catch(error => console.log('error', error));
    }
  };

  const getSaldo = async () => {
    setLoading(true);
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlSaldoUpdate, {headers})
      .then(response => response.json())
      .then(responseData => {
        setLoading(false);
        setSaldo(responseData.data);
        console.log(responseData.data);
      })
      .catch(e => console.log(e));
  };

  return (
    <View style={{flex: 1}}>
      <Appbar params={props} />

      <View style={{flex: 1}}>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginVertical: height * 0.01,
          }}>
          <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
            Tarik Saldo dari Saldo Penjual Ke Bank
          </Text>
        </View>

        <View style={{backgroundColor: 'white'}}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginVertical: height * 0.01,
            }}>
            <Text
              style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold'}}>
              Saldo: Rp {formatRupiah(saldo)}
            </Text>
          </View>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginVertical: height * 0.01,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View>
              <Image
                source={{uri: bank.image_url}}
                style={{
                  width: width * 0.12,
                  height: width * 0.05,
                  resizeMode: 'stretch',
                }}
                width={width * 0.12}
                height={width * 0.05}
              />
              <Text>Bank {bank.name}</Text>
            </View>
            <Text>{norek}</Text>
          </View>
        </View>

        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginVertical: height * 0.01,
          }}>
          <Text>Jumlah Penarikan Dana</Text>
        </View>

        <View style={{backgroundColor: 'white'}}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: height * 0.01,
            }}>
            <Text style={{fontSize: 24}}>Rp.</Text>
            <TextInput
              placeholder={'0'}
              value={ammount}
              keyboardType="numeric"
              onChangeText={val => setAmmount(val)}
              style={{fontSize: 24}}
            />
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderColor: '#D5D5D5',
              marginVertical: height * 0.01,
            }}
          />
        </View>

        <View style={{backgroundColor: 'white', marginTop: height * 0.01}}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginVertical: height * 0.01,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text>Biaya Penarikan Dana</Text>
              <Text style={{fontSize: 10, color: 'gray'}}>
                Diterapkan ke Penarikan Dana yang Sukses
              </Text>
            </View>
            <Text>Tanpa Biaya</Text>
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderColor: '#D5D5D5',
              marginVertical: height * 0.01,
            }}
          />
        </View>

        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginVertical: height * 0.01,
          }}>
          <Text>Jumlah Transfer ke Bank</Text>
        </View>

        <View style={{backgroundColor: '#E0F5FE'}}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              marginVertical: height * 0.01,
            }}>
            <Icon name="alert" size={20} color="#07A9F0" />
            <Text>
              Dana yang kamu tarik akan di transfer 1 x / 2 minggu. Setiap
              tanggal 1 dan tanggal 16
            </Text>
          </View>
        </View>
      </View>

      {loading && <Loading />}

      <TouchableOpacity onPress={() => postWithDraw()}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#0956C6', '#0879D8', '#07A9F0']}
          style={{
            padding: 15,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, textAlign: 'center', color: 'white'}}>
            Tarik Dana
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

export default penarikan;
