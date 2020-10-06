/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../../components/loading';
import {ScrollView} from 'react-native-gesture-handler';
import {Title, Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import Appbar from '../../components/appbarHome'
import BottomTab from '../../components/bottomTab';
import InputNormal from '../../components/inputNormal';
import LinearGradient from 'react-native-linear-gradient';

import {URL, formatRupiah} from '../../utils/global';
import axios from 'axios';

function WishlistNoButtonTambah(props) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [any, setAny] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [pageOff, setPageOff] = useState(0);
  const {height, width} = Dimensions.get('window');
  const urlWishlist = URL + 'v1/wishlist/me';
  const urlProduk = URL + 'v1/product/me';

  let halaman = props.route.params.title;
  console.log('nav', props);
  useEffect(() => {
    if (halaman == 'Cari Produk') {
      searchProduk(props.route.params.search);
    } else {
      getWishlist();
    }
    getWishlist();
    getStatus();
  }, []);

  const getWishlist = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);
    let param = '';

    if (halaman === 'Komisi Terbesar') {
      param = '&order_by=price_commission&order_direction=desc';
    } else if (props.route.params.idKategori != null) {
      param = '&category=' + props.route.params.idKategori;
    } else if (halaman === 'Paling Disukai') {
      param = '&order_by=wishlist_qty&order_direction=desc';
    } else {
      param = '';
    }
    param += '&keyword=' + search;

    console.log('param', param);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlProduk + '?limit=10&offset=0&order_direction=desc' + param, {
      headers,
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('getWishlist', responseData);
        setWishlist(responseData.data);
        setLoading(false);
        setPage(1);
      })
      .catch(e => console.log(e));
  };

  const getStatus = async () => {
    const regular = await AsyncStorage.getItem('regular');
    setStatus(regular);
  };

  const goCreateNewProduct = () => {
    props.navigation.navigate('TambahProduk', {
      title: 'Tambah Produk',
    });
  };

  console.log(status);

  //Pergi ke Hal List Produk
  const detailProduk = (id, name) => {
    props.navigation.navigate('ProdukDetail', {id, title: name});
  };

  const hapusProduk = async id => {
    setLoading(true);

    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);
    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };
    axios
      .delete(`${URL}v1/wishlist/${id}/delete`, {
        headers,
      })
      .then(result => {
        console.log('hapus produk', result);
        if (result.status === 200) {
          setLoading(false);
        }
      })
      .catch(err => {
        console.log('Error hapus produk', err.response);
      });
  };

  const loadMore = async hal => {
    setLoading(true);

    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let pageNow = hal;

    let off = 10 * pageNow;

    await setPageOff(off);

    let param = '';

    if (halaman === 'Komisi Terbesar') {
      param += '&order_by=price_commission&order_direction=desc';
    } else if (props.route.params.idKategori != null) {
      param += '&category=' + props.route.params.idKategori;
    } else if (halaman === 'Paling Disukai') {
      param += '&order_by=wishlist_qty&order_direction=desc';
    } else {
      param += '';
    }
    param += search ? '&keyword=' + search : '';

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    await fetch(
      urlProduk +
        '?order_direction=desc&limit=10&offset=' +
        pageOff +
        '' +
        param,
      {
        headers,
      },
    )
      .then(response => response.json())
      .then(async responseData => {
        await setWishlist(wishlist.concat(responseData.data));
        setPage(pageNow++);
        setLoading(false);
        if (responseData.data.length == 0) {
          setAny(false);
        }
      })
      .catch(e => console.log(e));
  };

  const OpenSearchTrigger = async () => {
    setSearch(true);
  };

  const CloseSearchTrigger = async () => {
    setSearch(false);
    getWishlist();
  };

  const searchProduk = async searchData => {
    setLoading(true);
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);
    let param = '';
    // let param ="&invoice="+searchData
    // console.log(urlOrder+"?limit=10&offset="+page+""+param)
    if (halaman === 'Komisi Terbesar') {
      param += '&order_by=price_commission&order_direction=desc';
    } else if (props.route.params.idKategori != null) {
      param += '&category=' + props.route.params.idKategori;
    } else if (halaman === 'Paling Disukai') {
      param += '&order_by=wishlist_qty&order_direction=desc';
    } else {
      param += '';
    }
    param += '&keyword=' + search;

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(
      urlProduk + `?order_direction=desc&limit=10&offset=${pageOff}${param}`,
      {
        headers,
      },
    )
      .then(response => response.json())
      .then(async responseData => {
        await setWishlist(responseData.data);
        setLoading(false);
        setPage(pageOff++);
      })
      .catch(e => console.log(e));
  };

  const gotoWishlist = () => {
    props.navigation.navigate('Wishlist', {title: 'Produk Saya'});
  };

  // filter if have null object
  const cleanEmpty = obj => {
    if (Array.isArray(obj)) {
      return obj
        .map(v => (v && typeof v === 'object' ? cleanEmpty(v) : v))
        .filter(v => !(v == null));
    } else {
      return Object.entries(obj)
        .map(([k, v]) => [k, v && typeof v === 'object' ? cleanEmpty(v) : v])
        .reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {});
    }
  };
  const nextFilter = cleanEmpty(wishlist).filter(i => (i.name ? i : null));

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Appbar.Header
        style={[
          styles.shadow,
          {backgroundColor: 'white', width: '100%', height: 70},
        ]}>
        <Appbar.BackAction
          onPress={() => {
            props.navigation.goBack();
          }}
        />

        {search ? (
          <View
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              width: width * 0.4,
            }}>
            <InputNormal
              placeholder="Cari Produk"
              onChangeText={val => searchProduk(val)}
            />
          </View>
        ) : (
          <Text>{halaman}</Text>
        )}

        <Appbar.Content />

        <View style={{flexDirection: 'row'}}>
          {search ? (
            <TouchableOpacity onPress={CloseSearchTrigger}>
              <Appbar.Action size={30} icon="close" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={OpenSearchTrigger}>
              <Appbar.Action size={30} icon="magnify" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={gotoWishlist}>
            <Appbar.Action size={30} icon="heart" />
          </TouchableOpacity>
        </View>
      </Appbar.Header>

      <ScrollView style={{flex: 1, marginTop: 10}}>
        {console.log('asdasdasd', wishlist)}
        {cleanEmpty(wishlist) &&
          nextFilter.map((data, index) => {
            return (
              <View
                key={data.id}
                style={{
                  flexDirection: 'row',
                  marginVertical: 10,
                  height: height * 0.22,
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  borderColor: '#ddd',
                  width: '90%',
                  paddingRight: 5,
                  alignSelf: 'center',
                  borderRadius: 20,
                  borderLeftWidth: 0,
                }}>
                <Image
                  source={{
                    uri: data && data.images[0].image_url,
                  }}
                  style={{
                    height: '100%',
                    width: '30%',
                    borderRadius: 10,
                  }}
                />

                <View style={{width: '68%'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      width: 210,
                      marginTop: 10,
                      textTransform: 'capitalize',
                    }}
                    numberOfLines={2}>
                    {data && data.name}
                  </Text>
                  <Text style={{fontSize: 13, marginTop: 5}}>
                    Mulai Dari Rp{' '}
                    {data
                      ? formatRupiah(
                          data.price_basic +
                            data.price_benefit +
                            data.price_commission,
                        )
                      : '0'}
                  </Text>
                  <Text style={{color: '#949494', fontSize: 12}}>
                    Stok {data && data.stock}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 10,
                      paddingBottom: 20,
                    }}>
                    {console.log('asdasdasd', data)}
                    {/* <TouchableOpacity
                      style={{
                        width: '50%',
                      }}
                      onPress={() => hapusProduk(data.id)}>
                      <Text style={{color: 'red'}}>
                        Hapus Produk
                      </Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      style={{
                        width: '50%',
                      }}
                      onPress={() => detailProduk(data.id, data.name)}>
                      <Text style={{color: '#07A9F0'}}>Lihat Produk</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}

        {any ? (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
            onPress={() => loadMore(page + 1)}>
            <Text>Produk Selanjutnya</Text>
          </TouchableOpacity>
        ) : (
          <Text style={{textAlign: 'center'}}>Tidak Ada Produk lagi</Text>
        )}
      </ScrollView>
      {loading && <Loading />}
      {/* <TouchableOpacity onPress={goCreateNewProduct} style={styles.button}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#0956C6', '#0879D8', '#07A9F0']}
          style={styles.button}>
          <Icon name="plus" size={20} color="#fff" />
          <Text style={styles.buttonText}>Tambah</Text>
        </LinearGradient>
      </TouchableOpacity> */}
      <BottomTab {...props} />
    </View>
  );
}

export default WishlistNoButtonTambah;

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
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 17,
    textAlign: 'center',
    color: 'white',
  },
});
