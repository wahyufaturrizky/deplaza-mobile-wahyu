/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
import {SliderBox} from 'react-native-image-slider-box';
import HTML from 'react-native-render-html';
import {URL, formatRupiah} from '../../utils/global';
import RNFetchBlob from 'rn-fetch-blob';
import Loading from '../../components/loading';

import SearchableDropdown from 'react-native-searchable-dropdown';

import {ScrollView} from 'react-native-gesture-handler';
import {Title, Snackbar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Appbar from '../../components/appbarHome';
import InputNormal from '../../components/inputNormal';

function produkDetailAdaButtonDisukai(props) {
  const [dataDetail, setDataDetail] = useState([]);
  const [dataGambar, setDataGambar] = useState([]);
  const [loading, setLoading] = useState(false);

  const [copy, setCopy] = useState(false);
  const [qty, setQty] = useState(1);

  const [selectVariasi, setSelectVariasi] = useState([]);

  const [pressSize, setPressSize] = useState(false);

  const [selectKota, setSelectKota] = useState([]);
  const [totalKomisi, setTotalKomisi] = useState('0');

  const [varian, setVarian] = useState([]);

  const [kota, setKota] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [idCity, setIdCity] = useState(0);
  const [est, setEst] = useState('');
  const [totalOngkir, setTotalOngkir] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);
  const [metodeCOD, setmetodeCOD] = useState(false); //false kalo untuk bank
  const [likeProduk, setLikeProduk] = useState(0);
  const [pilihKota, setPilihKota] = useState(false);

  const urlProdukDetail = URL + 'v1/product/';
  const urlKota = URL + 'v1/shipment/cities';
  const urlKecamatan = URL + 'v1/shipment/subdistrict/city';
  const urlOngkir = URL + 'v1/shipment/cost/subdistrict';
  const urlWishlistMe = URL + 'v1/wishlist/me?limit=1000000';
  const urlWishlist = URL + 'v1/wishlist';
  const urlKotaDetail = URL + 'v1/shipment/city/';

  const {height, width} = Dimensions.get('window');
  let id = props.route.params.id;
  console.log('id', id);

  useEffect(() => {
    CekTandai();
    getDetailProduct();
    getKota();
  }, []);

  const copyToClipboard = async () => {
    const copyText = `Harga : Rp. ${formatRupiah(
      dataDetail.price_basic,
    )} \n Deskripsi : \n ${dataDetail.description}`;

    const regex = /(<([^>]+)>)/gi;
    const result = copyText.replace(regex, '');

    Clipboard.setString(result);
    setCopy(true);
  };

  const CekTandai = async () => {
    setLoading(true);
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };
    setLoading(true);
    await fetch(urlWishlistMe, {headers})
      .then(response => response.json())
      .then(async responseData => {
        let res = await responseData.data;
        let row = 1;
        await res.map(async (data, i) => {
          if (data.product_id === id) {
            setLikeProduk(1);
          }
        }, setLoading(false));
      })
      .catch(e => console.log(e));
  };

  console.log('kkk', likeProduk);

  const changeQty = simbol => {
    let hargaProduk = parseInt(
      dataDetail.price_basic +
        dataDetail.price_commission +
        dataDetail.price_benefit,
    );
    let totalOngkirNow = parseInt(totalOngkir);
    let stock = parseInt(dataDetail.stock);

    if (simbol === '+') {
      let qtynow = qty + 1;
      if (qtynow > 1) {
        if (qtynow > stock) {
          alert('Maksimal Quantity adalah ' + stock);
          qtynow = stock;
          setQty(
            qtynow,
            setTotalHarga(hargaProduk * qtynow + totalOngkirNow),
            setTotalKomisi(dataDetail.price_commission * qtynow),
          );
        } else {
          setQty(
            qtynow,
            setTotalHarga(hargaProduk * qtynow + totalOngkirNow),
            setTotalKomisi(dataDetail.price_commission * qtynow),
          );
        }
      } else {
        let qtynow = 1;
        alert('Minimal Quantity adalah 1');
        setQty(
          qtynow,
          setTotalHarga(hargaProduk * qtynow + totalOngkirNow),
          setTotalKomisi(dataDetail.price_commission * qtynow),
        );
      }
    } else if (simbol === '-') {
      let qtynow = qty - 1;
      if (qtynow > 1) {
        if (qtynow > stock) {
          alert('Maksimal Quantity adalah ' + stock);
          qtynow = stock;
          setQty(
            qtynow,
            setTotalHarga(hargaProduk * qtynow + totalOngkirNow),
            setTotalKomisi(dataDetail.price_commission * qtynow),
          );
        } else {
          setQty(
            qtynow,
            setTotalHarga(hargaProduk * qtynow + totalOngkirNow),
            setTotalKomisi(dataDetail.price_commission * qtynow),
          );
        }
      } else {
        qtynow = 1;
        alert('Minimal Quantity adalah 1');
        setQty(
          qtynow,
          setTotalHarga(hargaProduk * qtynow + totalOngkirNow),
          setTotalKomisi(dataDetail.price_commission * qtynow),
        );
      }
    }
  };

  const gotoRincianProduk = () => {
    props.navigation.navigate('WishlistSesungguhnya', {
      title: 'Produk yang Ditandai',
    });
  };

  const gotoPesan = () => {
    let stock = parseInt(dataDetail.stock);
    if (totalOngkir === 0) {
      alert('Pilih Terlebih Kota atau Kecamatan Tujuan');
    } else if (stock < 1) {
      alert('Mohon Maaf.., stok produk ini sedang habis');
    } else {
      props.navigation.navigate('Pesan', {
        title: 'Pesan & Kirim',
        data: {
          id_produk: id,
          variation: selectVariasi,
          qty,
          metodeCOD,
          totalHarga,
          totalOngkir,
          imageDetail: dataGambar[0],
        },
      });
    }
  };

  const getDetailProduct = async () => {
    setDataGambar([]);
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);
    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlProdukDetail + id, {headers})
      .then(response => response.json())
      .then(async responseData => {
        await setDataDetail(responseData.data);

        setTotalKomisi(responseData.data.price_commission);

        if (responseData.data.variation_data != null) {
          setVarian(responseData.data.variation_data);
        }

        let responseImage = responseData.data.images;
        let dataG = '';
        let dataUrl = '';

        responseImage.map(async (data, i) => {
          dataG = dataGambar;
          dataUrl = data.image_url;
          dataG.push(dataUrl);

          await setDataGambar(dataG);
        });
      });
  };

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    let date = new Date();
    let image_URL = dataGambar;

    image_URL.map((url, i) => {
      let ext = getExtention(url);
      ext = '.' + ext[0];
      const {config, fs} = RNFetchBlob;
      let PictureDir = fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path:
            PictureDir +
            '/image_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            ext,
          description: 'Image',
        },
      };
      config(options)
        .fetch('GET', url)
        .then(res => {
          console.log('res -> ', JSON.stringify(res));
        });
    });

    copyToClipboard();
    alert('Berhasil Mendownload Gambar');
  };

  const getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const getKota = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlKota, {headers})
      .then(response => response.json())
      .then(responseData => {
        const mapKota = responseData.rajaongkir.results;
        let data = mapKota.map(s => ({
          id: s.city_id,
          name: s.type + ' ' + s.city_name,
        }));
        setKota(data);
      })
      .catch(e => console.log(e));
  };

  const getKecamatan = async idKec => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlKecamatan + idKec, {headers})
      .then(response => response.json())
      .then(responseData => {
        const mapKota = responseData.rajaongkir.results;
        let data = mapKota.map(s => ({
          id: s.subdistrict_id,
          name: 'Kecamatan' + ' ' + s.subdistrict_name,
        }));
        setKecamatan(data);
      })
      .catch(e => console.log(e));
  };

  const _selectKota = async data_kota => {
    await setLoading(true);
    await setIdCity(data_kota.id);
    setPilihKota(false);
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    await fetch(`${urlKecamatan}/${data_kota.id}`, {headers})
      .then(response => response.json())
      .then(responseData => {
        // console.log('sfsdf', responseData.rajaongkir.results);
        const mapKota = responseData.rajaongkir.results;
        let data = mapKota.map(s => ({
          id: s.subdistrict_id,
          name: 'Kecamatan' + ' ' + s.subdistrict_name,
        }));
        setKecamatan(data);
      })
      .catch(e => console.log(e));
    setLoading(false);
    // const value = await AsyncStorage.getItem('data');
    // const data = JSON.parse(value)

    // let headers = {
    //     Authorization: `Bearer ${data.token}`,
    //     'Access-Control-Allow-Origin': '*',
    // }

    fetch(urlKotaDetail + data_kota.id, {headers})
      .then(response => response.json())
      .then(responseData => {
        // console.log('response_city',responseData)
        // console.log('dataDetail',dataDetail.cod_city_id)

        var cod_city = JSON.parse(dataDetail.cod_city_id);
        var n = cod_city.includes(data_kota.id);

        // console.log('metodeCod', n)
        // console.log('cityselect', data_kota.id)

        if (n) {
          setmetodeCOD(true);
        } else {
          setmetodeCOD(false);
        }
        setPilihKota(true);
      })
      .catch(e => console.log(e));

    // let formdata = new FormData();
    // formdata.append("origin", dataDetail.city_id)
    // formdata.append("destination", parseInt(data_kota.id))
    // formdata.append("weight", dataDetail.weight)
    // formdata.append("courier", 'jne')

    // fetch(urlOngkir, {method: 'POST', headers,
    //     body: formdata
    // })
    // .then(response => response.json())
    // .then(async(responseData) => {
    //     let tipe= await responseData.rajaongkir.results[0].costs
    //     setLoading(false)
    //     tipe.map((type) => {
    //         if(type.service === "REG"){
    //             setPilihKota(true)
    //             setTotalOngkir(type.cost[0].value, setTotalHarga(dataDetail.price_basic+dataDetail.price_commission+dataDetail.price_benefit+type.cost[0].value))
    //         }
    //     })
    // })
  };

  // console.log('sfsdf', dataDetail);
  const _selectKecamatan = async data_kota => {
    setLoading(true);

    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };
    fetch(urlKotaDetail + data_kota.id, {headers})
      .then(response => response.json())
      .then(responseData => {
        // var cod_city = JSON.parse(dataDetail.cod_city_id)
        console.log(cod_city);
        // var n = cod_city.includes(data_kota.id);
        // console.log('codiii', data_kota.id);
        // if(n) {
        //     setmetodeCOD(true)
        // }else{
        //     setmetodeCOD(false)
        // }
      })
      .catch(e => console.log(e.response));

    let formdata = new FormData();
    formdata.append('origin', dataDetail.city_id);
    formdata.append('destination', parseInt(data_kota.id));
    formdata.append('weight', dataDetail.weight);
    formdata.append('courier', 'jne');

    fetch(urlOngkir, {method: 'POST', headers, body: formdata})
      .then(response => response.json())
      .then(async responseData => {
        console.log('uuu', responseData);
        let tipe = await responseData.rajaongkir.results[0].costs;
        console.log('tipe', tipe);
        setLoading(false);
        tipe.map(type => {
          if (type.service === 'REG' || type.service === 'CTC') {
            setLoading(false);
            setPilihKota(true);
            setEst(type.cost[0].etd);
            setTotalOngkir(type.cost[0].value);
            // console.log("harga total = "+type.cost[0].value+" "+dataDetail.price_basic+" "+dataDetail.price_commission+" "+dataDetail.price_benefit)
            setTotalHarga(
              dataDetail.price_basic +
                dataDetail.price_commission +
                dataDetail.price_benefit +
                type.cost[0].value,
            );
          }
        });
      });
  };

  // console.log('est', est);

  const postWishlist = async id => {
    setLoading(true);
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);
    const id_user = data.id;

    var formdata = new FormData();
    formdata.append('product_id', id);
    formdata.append('user_id', id_user);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data',
    };

    fetch(urlWishlist, {
      method: 'POST',
      headers,
      body: formdata,
    })
      .then(response => response.json())
      .then(async responseData => {
        console.log(responseData);
        setLoading(false);
        alert(responseData.message);
        gotoRincianProduk();
      })
      .catch(e => console.log(e))
      .done();
  };

  const _onDismissSnackBar = () => setCopy(false);

  const addVariasi = (variant, value) => {
    let data = [{[variant]: value}];
    let allVariasi = selectVariasi;

    allVariasi.forEach(function(v) {
      delete v[variant];
    });

    let filtered = allVariasi.filter(value => JSON.stringify(value) !== '{}');

    setSelectVariasi(filtered.concat(data));
  };

  // console.log('Kecamatan', totalHarga);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Appbar params={props} like={likeProduk < 1 ? false : true} />

      <ScrollView keyboardShouldPersistTaps="always">
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginBottom: height * 0.02,
            flex: 1,
          }}>
          <SliderBox
            images={dataGambar}
            style={{
              width: '90%',
              height: height * 0.4,
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              fontSize: 16,
              marginVertical: 10,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            {dataDetail.name}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <View style={{width: '60%'}}>
              <SearchableDropdown
                onItemSelect={item => {
                  const items = selectKota;
                  items.push(item);
                  setSelectKota(items);
                  _selectKota(item);
                }}
                containerStyle={{width: '100%', borderRadius: 10}}
                onRemoveItem={(item, index) => {
                  const items = selectKota.filter(
                    sitem => sitem.id !== item.id,
                  );
                  setSelectKota(items);
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5,
                  width: '100%',
                }}
                itemTextStyle={{color: '#222'}}
                itemsContainerStyle={{borderRadius: 10}}
                items={kota}
                defaultIndex={2}
                resetValue={false}
                textInputProps={{
                  placeholder: 'Pilih Kota',
                  underlineColorAndroid: 'transparent',
                  style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                  },
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />

              <SearchableDropdown
                onItemSelect={item => {
                  const items = selectKota;
                  items.push(item);
                  setSelectKota(items);
                  _selectKecamatan(item);
                }}
                containerStyle={{width: '100%', borderRadius: 10}}
                onRemoveItem={(item, index) => {
                  const items = selectKota.filter(
                    sitem => sitem.id !== item.id,
                  );
                  setSelectKota(items);
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5,
                  width: '100%',
                }}
                itemTextStyle={{color: '#222'}}
                itemsContainerStyle={{borderRadius: 10}}
                items={kecamatan}
                defaultIndex={2}
                resetValue={false}
                textInputProps={{
                  placeholder: 'Pilih Kecamatan',
                  underlineColorAndroid: 'transparent',
                  style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                  },
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
            </View>
            {/* ------- [START BUTTON CHECK HARGA] ------- */}
            {/* <TouchableOpacity style={{width: '34%'}}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={['#0956C6', '#0879D8', '#07A9F0']}
                style={{padding: 15, borderRadius: 10}}>
                <Text style={{textAlign: 'center', color: 'white'}}>
                  Cek Harga
                </Text>
              </LinearGradient>
            </TouchableOpacity> */}
            {/* ------- [END BUTTON CHECK HARGA] ------- */}
          </View>

          {!metodeCOD && pilihKota && (
            <View
              style={{
                padding: 10,
                width: '100%',
                backgroundColor: '#E0F5FE',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}>
              <Icon name="alert" size={14} color="#07A9F0" />
              <Text style={{fontSize: 10}}>
                {' '}
                Metode Pembayaran COD tidak tersedia di lokasi ini
              </Text>
            </View>
          )}

          {pilihKota && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: height * 0.01,
              }}>
              <View>
                <Text style={{fontSize: 24}}>
                  Rp. {formatRupiah(totalHarga)}
                </Text>
                <Text style={{fontSize: 12}}>*Harga Sudah Termasuk Ongkir</Text>
              </View>
              <View
                style={{
                  backgroundColor: '#D5D5D5',
                  height: height * 0.03,
                  paddingHorizontal: 5,
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 12}}>
                  Komisi Rp. {formatRupiah(totalKomisi)}
                </Text>
              </View>
            </View>
          )}

          <View
            style={{
              backgroundColor: '#D5D5D5',
              paddingVertical: 5,
              width: '30%',
              paddingHorizontal: 20,
              marginTop: height * 0.01,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 12}}>Stok {dataDetail.stock}</Text>
          </View>

          <View
            style={{
              backgroundColor: '#D5D5D5',
              paddingVertical: 5,
              width: '60%',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              marginTop: height * 0.01,
              justifyContent: 'flex-start',
            }}>
            <Icon name="calendar" size={16} color="#000" />
            <Text style={{fontSize: 12}}> Akan Dikirimkan {est} hari</Text>
          </View>
        </View>

        <View style={{borderTopWidth: 1, borderColor: '#D5D5D5'}} />

        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginVertical: height * 0.02,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 5,
              justifyContent: 'space-between',
              backgroundColor: '#F8F8F8',
              alignItems: 'center',
            }}>
            <Title>Rincian Produk</Title>
            <TouchableOpacity onPress={copyToClipboard}>
              <View style={{padding: 10, backgroundColor: '#D5D5D5'}}>
                <Text>Salin Deskripsi</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: height * 0.01}}>
            <HTML html={dataDetail.description} />
          </View>
        </View>

        <View style={{borderTopWidth: 1, borderColor: '#D5D5D5'}} />

        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginVertical: height * 0.02,
          }}>
          <View style={{backgroundColor: '#F8F8F8', padding: 5}}>
            <Title>Pilih Variasi dan Jumlah</Title>
          </View>
        </View>

        {varian.map((data, i) => {
          let tvariant = Object.keys(data)[0];
          if (tvariant != '') {
            return (
              <View key={i}>
                <View style={{borderTopWidth: 1, borderColor: '#D5D5D5'}} />

                <View style={{width: '90%', alignSelf: 'center', padding: 10}}>
                  <Title style={{marginBottom: height * 0.01}}>
                    {tvariant}
                  </Title>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      width: '50%',
                    }}>
                    {data[tvariant].map((val, j) => {
                      let found = false;

                      for (let k = 0; k < selectVariasi.length; k++) {
                        if (selectVariasi[k][tvariant] == val) {
                          found = true;
                          break;
                        }
                      }
                      return (
                        <TouchableOpacity
                          onPress={() => addVariasi(tvariant, val)}>
                          <View
                            style={{
                              backgroundColor: 'white',
                              borderWidth: 1,
                              borderColor: found ? 'red' : 'gray',
                              padding: 5,
                              marginBottom: height * 0.005,
                              marginRight: 5,
                              borderRadius: 5,
                            }}>
                            <Text>{val}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>
            );
          }
        })}

        <View style={{borderTopWidth: 1, borderColor: '#D5D5D5'}} />

        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
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
                value={qty.toString()}
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
      </ScrollView>

      {loading && <Loading />}

      <Snackbar visible={copy} onDismiss={_onDismissSnackBar} duration={1000}>
        Deskripsi Berhasil di Salin
      </Snackbar>

      {likeProduk === 1 ? (
        <View
          style={[
            styles.shadow,
            {flexDirection: 'row', height: height * 0.06},
          ]}>
          {loading ? null : (
            <TouchableOpacity
              style={{width: '50%', height: height * 0.06}}
              onPress={checkPermission}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: height * 0.01,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Icon
                  name="cloud-download"
                  size={height * 0.04}
                  color="#07A9F0"
                />
                <Text style={{fontSize: width * 0.03, color: '#07A9F0'}}>
                  Simpan Gambar
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {loading ? null : (
            <TouchableOpacity
              style={{width: '50%', height: height * 0.06}}
              onPress={gotoPesan}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={['#0956C6', '#0879D8', '#07A9F0']}
                style={{
                  flexDirection: 'row',
                  padding: height * 0.01,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/images/inbox.png')}
                  style={{width: width * 0.08, height: width * 0.08}}
                />
                <Text style={{fontSize: width * 0.03, color: '#fff'}}>
                  Pesan {'&'} Kirim
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      ) : loading ? null : (
        <TouchableOpacity onPress={() => postWishlist(dataDetail.id)}>
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
            <Icon name="heart" size={20} color="#fff" />
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: 'white',
                marginLeft: width * 0.04,
              }}>
              Tandai Produk Ini
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default produkDetailAdaButtonDisukai;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
