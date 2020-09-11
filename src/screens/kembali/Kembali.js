/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  ImageStore,
} from 'react-native';
import {RadioButton, TextInput, Checkbox, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import ImagePicker from 'react-native-image-crop-picker';

import Appbar from '../../components/appbarHome';
import InputNormal from '../../components/inputNormal';
import {URL, formatRupiah} from '../../utils/global';
import Loading from '../../components/loading';

function Kembali(props) {
  const [checked, setChecked] = useState('penukaran');
  const [check, setCheck] = useState(false);
  const [alasanDetail, setAlasanDetail] = useState('');
  const [qty, setQty] = useState('0');
  const [selectQty, setSelectQty] = useState('0');
  const [files, setFiles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [receiver_name, setReceiver_name] = useState('');
  const [receiver_address, setReceiver_address] = useState('');
  const [phone, setPhone] = useState('');

  const [video, setVideo] = useState([]);
  const [image, setImage] = useState([]);

  const [reasonComplaint, setReasonComplaint] = useState([]);
  const [selectReason, setSelectReason] = useState('kosong');

  const urlRincianPesanan = URL + '/v1/orders/';
  const urlProdukDetail = URL + 'v1/product/';
  const urlReasonComplaint = URL + 'v1/complaint/reason';
  const urlComplaint = URL + 'v1/complaint';

  const id_order = props.route.params.id;
  const {height, width} = Dimensions.get('window');

  useEffect(() => {
    getRincianPesanan();
    getReasonComplaint();
  }, []);

  const gotoPesanan = () => {
    props.navigation.navigate('PesananSaya', {
      title: 'Pesanan Saya',
    });
  };

  const getRincianPesanan = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);
    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlRincianPesanan + id_order, {headers})
      .then(response => response.json())
      .then(async responseData => {
        console.log(responseData.data);

        setReceiver_name(responseData.data.delivery.receiver_name);
        setReceiver_address(responseData.data.delivery.receiver_address);
        setPhone(responseData.data.customer.phone);
        setQty(responseData.data.details[0].qty);

        let id_produk = responseData.data.details[0].product_id;

        fetch(urlProdukDetail + id_produk, {headers})
          .then(response => response.json())
          .then(responseData => {
            setLoading(false);
          });
      });
  };

  const getReasonComplaint = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);
    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlReasonComplaint, {headers})
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData.data);
        setReasonComplaint(responseData.data);
      });
  };

  const changeQty = simbol => {
    if (simbol === '+') {
      let qtynow = parseInt(selectQty) + 1;
      if (qtynow > qty) {
        setSelectQty(qty);
        alert('Maksimal Kuantiti Adalah = ' + qty);
      } else {
        setSelectQty(qtynow);
      }
    } else if (simbol === '-') {
      let qtynow = parseInt(selectQty) - 1;
      if (qtynow < 1) {
        setSelectQty(1);
        alert('Maksimal Kuantiti Adalah = 1');
      } else {
        setSelectQty(qtynow);
      }
    }
  };

  const handleChoosePhoto = () => {
    let date = new Date();
    ImagePicker.openPicker({
      // multiple: true,
      // cropping: true,
    }).then(value => {
      setImage([...image, value]);
    });
  };

  const handleChooseVideo = () => {
    let date = new Date();
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      setVideo(video);
    });
  };

  const postTukar = async () => {
    if (image.length < 1) {
      alert('Harap Mengupload Gambar Komplain Terlebih Dahulu');
    } else {
      setLoading(true);
      const value = await AsyncStorage.getItem('data');
      const data = JSON.parse(value);
      console.log(data);
      const options = {
        noData: true,
      };

      let headers = {
        Authorization: `Bearer ${data.token}`,
        'Access-Control-Allow-Origin': '*',
        Accept: 'multipart/form-data',
        'content-type': 'multipart/form-data',
      };

      let formData = new FormData();
      formData.append('reason_id', selectReason);
      formData.append('order_id', id_order);
      formData.append('description', checked + ' : ' + alasanDetail);
      formData.append('qty', qty);
      formData.append('address_id', 1);

      const photos = image;
      photos.forEach(photo => {
        formData.append('files[]', {
          uri: photo.path,
          type: 'image/jpeg', // or photo.type
          name: 'avatar.jpg',
        });
      });

      console.log(JSON.stringify(formData));
      fetch(urlComplaint, {method: 'POST', headers, body: formData})
        .then(response => console.log(response.text()))
        .then(async responseData => {
          console.log('responseData komplain', responseData);
          setLoading(false);
          alert('Komplain Berhasil di Kirim');
          gotoPesanan();
        });
    }
  };
  // console.log('images', image);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Appbar params={props} />

      <ScrollView>
        <View
          style={{
            padding: 10,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: '#F8F8F8',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              value="penukaran"
              status={checked === 'penukaran' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('penukaran')}
            />
            <Text> Penukaran</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              value="pengembalian"
              status={checked === 'pengembalian' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('pengembalian')}
            />
            <Text>Pengembalian</Text>
          </View>
        </View>

        <View style={{width: '90%', alignSelf: 'center'}}>
          <View style={{padding: 10, marginBottom: height * 0.02}}>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                alignSelf: 'center',
                justifyContent: 'center',
                width: '90%',
                borderRadius: 10,
                height: height * 0.055,
              }}>
              <Picker
                selectedValue={selectReason}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectReason(itemValue)
                }
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Picker.Item label={'Pilih Alasan'} value={'kosong'} />
                {reasonComplaint.map((data, i) => (
                  <Picker.Item
                    key={i}
                    label={data.description}
                    value={data.id}
                  />
                ))}
              </Picker>
            </View>

            <TextInput
              label="Alasan Detail"
              value={alasanDetail}
              mode="outlined"
              onChangeText={val => setAlasanDetail(val)}
              style={{
                width: '90%',
                alignSelf: 'center',
                borderRadius: 10,
                backgroundColor: 'white',
                marginTop: height * 0.005,
              }}
              multiline={true}
              numberOfLines={4}
              theme={{
                colors: {primary: '#07A9F0', underlineColor: 'transparent'},
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                alignSelf: 'center',
                marginVertical: height * 0.01,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {image[0] !== undefined ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{marginHorizontal: width * 0.01}}>
                    <Image
                      source={{uri: image[0].path}}
                      style={{width: width * 0.2, height: width * 0.2}}
                    />
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    borderStyle: 'dashed',
                    padding: 10,
                    width: width * 0.2,
                    height: width * 0.2,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                  }}>
                  <TouchableOpacity
                    onPress={handleChoosePhoto}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon name="image" size={32} color="gray" />
                    <Text
                      style={{
                        fontSize: 9,
                        textAlign: 'center',
                        color: 'gray',
                      }}>
                      Tambahkan Gambar
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {image[1] !== undefined ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{marginHorizontal: width * 0.01}}>
                    <Image
                      source={{uri: image[1].path}}
                      style={{width: width * 0.2, height: width * 0.2}}
                    />
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    borderStyle: 'dashed',
                    padding: 10,
                    width: width * 0.2,
                    height: width * 0.2,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                  }}>
                  <TouchableOpacity
                    onPress={handleChoosePhoto}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon name="image" size={32} color="gray" />
                    <Text
                      style={{
                        fontSize: 9,
                        textAlign: 'center',
                        color: 'gray',
                      }}>
                      Tambahkan Gambar
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {image[2] !== undefined ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{marginHorizontal: width * 0.01}}>
                    <Image
                      source={{uri: image[2].path}}
                      style={{width: width * 0.2, height: width * 0.2}}
                    />
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    borderStyle: 'dashed',
                    padding: 10,
                    width: width * 0.2,
                    height: width * 0.2,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                  }}>
                  <TouchableOpacity
                    onPress={handleChoosePhoto}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon name="image" size={32} color="gray" />
                    <Text
                      style={{
                        fontSize: 9,
                        textAlign: 'center',
                        color: 'gray',
                      }}>
                      Tambahkan Gambar
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={{backgroundColor: '#F8F8F8', padding: 10}}>
              <Text>
                *Mohon unggah gambar{' '}
                <Text style={{color: 'red'}}>(Maksimal 3 gambar saja)</Text>{' '}
                yang jelas dan asli dari produk yang dikirim untuk menghindari
                penolakan permintaan pengembalian Anda.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            borderTopWidth: 1,
            borderColor: '#D5D5D5',
            marginVertical: height * 0.01,
          }}
        />

        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingVertical: height * 0.01,
            alignItems: 'center',
          }}>
          <Title>Jumlah</Title>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '50%',
            }}>
            <TouchableOpacity onPress={() => changeQty('-')}>
              <View
                style={{
                  height: height * 0.065,
                  backgroundColor: '#D5D5D5',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text style={{fontSize: 20}}>-</Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                borderWidth: 1,
                borderColor: '#D5D5D5',
                width: '20%',
                height: height * 0.065,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <InputNormal
                style={{
                  borderColor: 'rgb(18, 48, 92)',
                  fontSize: 10,
                  color: 'black',
                }}
                value={selectQty.toString()}
                disabled
                editable={false}
              />
            </View>

            <TouchableOpacity onPress={() => changeQty('+')}>
              <View
                style={{
                  height: height * 0.065,
                  backgroundColor: '#D5D5D5',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text style={{fontSize: 20}}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            borderTopWidth: 1,
            borderColor: '#D5D5D5',
            marginVertical: height * 0.01,
          }}
        />
        <View
          style={{
            borderTopWidth: 1,
            borderColor: '#D5D5D5',
            marginVertical: height * 0.01,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Checkbox
            status={check ? 'checked' : 'unchecked'}
            onPress={() => {
              setCheck(!check);
            }}
          />
          <Text style={{textAlign: 'left'}}>
            Saya Setuju untuk Mengembalikan Sesuai Kondisi Semula.
          </Text>
        </View>
      </ScrollView>

      {loading && <Loading />}

      <TouchableOpacity onPress={postTukar}>
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
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: 'white',
              marginLeft: width * 0.04,
            }}>
            Kirim
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

export default Kembali;
