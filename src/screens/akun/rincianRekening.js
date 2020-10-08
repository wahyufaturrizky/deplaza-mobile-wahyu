/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput, HelperText} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-community/picker';

import Appbar from '../../components/appbarHome';
import Loading from '../../components/loading';

import {URL, formatRupiah} from '../../utils/global';
function rincianRekening(props) {
  const [noRek, setNoRek] = useState('');
  const [konfnoRek, setKonfNoRek] = useState('');
  const [namaRekening, setNamaRekening] = useState('');
  const [bank, setBank] = useState('kosong');
  const [branch, setBranch] = useState('');
  const [loading, setLoading] = useState(true);
  const [allBank, setAllBank] = useState([]);
  const [allRek, setAllRek] = useState([]);
  const [id, setId] = useState(0);
  const {height, width} = Dimensions.get('window');
  const urlBank = URL + 'v1/bank';
  const urlRekening = URL + 'v1/account';
  const urlListRekeing = URL + 'v1/account/me';

  useEffect(() => {
    getListBank();
    getRekening();
  }, []);

  const getListBank = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlBank, {headers})
      .then(response => response.json())
      .then(responseData => {
        setAllBank(responseData.data);
        setLoading(false);
      });
  };

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
        setId(responseData.data[0].id);
        setAllRek(responseData.data);
        setNoRek(responseData.data[0].number);
        setNamaRekening(responseData.data[0].name);
        setBank(responseData.data[0].bank.id);
        setBranch(responseData.data[0].branch);
        setLoading(false);
      });
  };

  const postRekening = async () => {
    console.log('postRekening');
    let dataRincianRekening = [
      {name: 'bank', value: bank},
      {name: 'noRek', value: noRek},
      {name: 'namaRekening', value: namaRekening},
      {name: 'branch', value: branch},
    ];

    let emptyField = dataRincianRekening.find(field => field.value === '');

    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);
    const id_user = data.id;

    if (!emptyField) {
      if (noRek != konfnoRek) {
        alert('Nomor Rekening Tidak Sama');
      } else {
        setLoading(true);
        var formdata = new FormData();
        formdata.append('bank_id', bank);
        formdata.append('number', noRek);
        formdata.append('name', namaRekening);
        formdata.append('branch', branch);

        let headers = {
          Authorization: `Bearer ${data.token}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
        };

        fetch(urlRekening, {
          method: 'POST',
          headers,
          body: formdata,
        })
          .then(response => response.json())
          .then(async responseData => {
            setLoading(false);
            alert('Rekening Berhasil di Tambahkan');
            console.log(responseData);
          })
          .done();
      }
    } else {
      alert(`Field ${emptyField.field} wajib di isi`);
    }
  };

  const editRek = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);
    console.log(data);
    const id_user = data.id;

    if (noRek != konfnoRek) {
      alert('Nomor Rekening Tidak Sama');
    } else {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('bank_id', bank);
      formdata.append('number', noRek);
      formdata.append('name', namaRekening);
      formdata.append('branch', branch);
      formdata.append('_method', 'put');

      let headers = {
        Authorization: `Bearer ${data.token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
      };

      fetch(`${urlRekening}/${id}`, {
        method: 'POST',
        headers,
        body: formdata,
      })
        .then(response => response.json())
        .then(async responseData => {
          setLoading(false);
          alert('Rekening Berhasil di Update');
          console.log(responseData);
        })
        .done();
    }
  };

  console.log('allRek', allRek);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Appbar params={props} />

      <ScrollView>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginVertical: height * 0.01,
          }}>
          <Text>Nomor Rekening</Text>
          <TextInput
            value={noRek}
            onChangeText={text => setNoRek(text)}
            style={{backgroundColor: 'white'}}
            underlineColor={'#07A9F0'}
            underlineColorAndroid={'#07A9F0'}
            selectionColor={'#07A9F0'}
            keyboardType={'numeric'}
          />
          <HelperText style={{color: '#93DCFC', paddingLeft: 0}}>
            Wajib Isi
          </HelperText>
        </View>

        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginBottom: height * 0.01,
          }}>
          <Text>Konfirmasi Nomor Rekening</Text>
          <TextInput
            value={konfnoRek}
            onChangeText={text => setKonfNoRek(text)}
            style={{backgroundColor: 'white'}}
            underlineColor={'#07A9F0'}
            underlineColorAndroid={'#07A9F0'}
            selectionColor={'#07A9F0'}
            keyboardType={'numeric'}
          />
          <HelperText style={{color: '#93DCFC', paddingLeft: 0}}>
            Wajib Isi
          </HelperText>
        </View>

        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginBottom: height * 0.01,
          }}>
          <Text>Nama Pemilik Rekening</Text>
          <TextInput
            value={namaRekening}
            onChangeText={text => setNamaRekening(text)}
            style={{backgroundColor: 'white'}}
            underlineColor={'#07A9F0'}
            underlineColorAndroid={'#07A9F0'}
            selectionColor={'#07A9F0'}
          />
          <HelperText style={{color: '#93DCFC', paddingLeft: 0}}>
            Wajib Isi
          </HelperText>
        </View>

        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginBottom: height * 0.01,
          }}>
          <Text>Nama Bank</Text>
          <Picker
            selectedValue={bank}
            onValueChange={(itemValue, itemIndex) => setBank(itemValue)}
            style={{borderBottomColor: '#07A9F0', borderBottomWidth: 1}}>
            <Picker.Item label={'Pilih Bank'} value={'kosong'} />
            {allBank.map((data, i) => (
              <Picker.Item key={i} label={data.name} value={data.id} />
            ))}
          </Picker>
          <HelperText style={{color: '#93DCFC', paddingLeft: 0}}>
            Wajib Isi
          </HelperText>
        </View>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginBottom: height * 0.01,
          }}>
          <Text>Branch</Text>
          <TextInput
            value={branch}
            onChangeText={text => setBranch(text)}
            style={{backgroundColor: 'white'}}
            underlineColor={'#07A9F0'}
            underlineColorAndroid={'#07A9F0'}
            selectionColor={'#07A9F0'}
          />
          <HelperText style={{color: '#93DCFC', paddingLeft: 0}}>
            Wajib Isi
          </HelperText>
        </View>

        {loading && <Loading />}

        <TouchableOpacity onPress={allRek.length < 1 ? postRekening : editRek}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#0956C6', '#0879D8', '#07A9F0']}
            style={{
              padding: 20,
              borderRadius: 10,
              width: '90%',
              marginBottom: height * 0.02,
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, textAlign: 'center', color: 'white'}}>
              {allRek.length < 1 ? 'Simpan' : 'Ubah'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{borderTopWidth: 1, borderColor: '#D5D5D5'}} />

        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon
            name="cloud-upload"
            size={32}
            color="gray"
            style={{marginRight: width * 0.04}}
          />
          <Text style={{width: '90%'}}>
            Masukan rincian Bank Anda dengan teliti. Rincian ini akan digunakan
            untuk pembayaran refund dan komisi.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default rincianRekening;
