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

function WishlistSesungguhnya(props) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [any, setAny] = useState(true);
  const [search, setSearch] = useState(false);
  const [dataSearch, setDataSearch] = useState('');

  const [status, setStatus] = useState('');
  const {height, width} = Dimensions.get('window');
  const urlWishlist = URL + 'v1/wishlist/me';
  let halaman = props.route.params.title;

  useEffect(() => {
    getWishlist();
    getStatus();
  }, []);

  const getWishlist = async () => {
    setLoading(true);
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlWishlist + '?limit=10&offset=0&order_direction=desc', {headers})
      .then(response => response.json())
      .then(responseData => {
        //console.log('WishlistSesungguhnya', urlWishlist);
        setWishlist(responseData.data);
        setLoading(false);
        setPage(0);
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

  //console.log(status);

  //Pergi ke Hal List Produk
  const detailProduk = (id, name) => {
    props.navigation.navigate('ProdukDetailAdaButtonDisukai', {
      id,
      title: name,
    });
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
        // console.log('hapus produk', result);
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

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    let param = dataSearch ? '&keyword=' + dataSearch : '';

    fetch(
      `${urlWishlist}?limit=10&offset=${off}${param}&order_direction=desc`,
      {
        headers,
      },
    )
      .then(response => response.json())
      .then(async responseData => {
        await setWishlist(wishlist.concat(responseData.data));
        setPage(responseData.meta.current_page);
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
    setAny(true);
    getWishlist();
  };

  const searchProduk = async searchData => {
    console.log('searc', searchData);
    setDataSearch(searchData);
    setLoading(true);
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);
    let param = '';
    // let param ="&invoice="+searchData
    // console.log(urlOrder+"?limit=10&offset="+page+""+param)
    param += '&keyword=' + searchData;
    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(
      `${urlWishlist}?limit=10&offset=${page}&order_direction=desc${param}`,
      {
        headers,
      },
    )
      .then(response => response.json())
      .then(async responseData => {
        console.log('oko', responseData);
        await setWishlist(responseData.data);
        setLoading(false);
        setPage(responseData.meta.current_page);
        if (responseData.data.length == 0) {
          setAny(false);
        }
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
  const nextFilter = cleanEmpty(wishlist).filter(i => (i.product ? i : null));
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
        {cleanEmpty(wishlist) &&
          nextFilter.map((data, index) => {
            return (
              <View
                key={index}
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
                    uri: data.product.images
                      ? data.product.images[0].image_url
                      : 'https://lh3.googleusercontent.com/proxy/uQ57CmiuEgbf1MNThWA-PX-8sZSv6CAAMQm0DdE78twErrPaX8XhTKOI8X7g8xvLEN688sO51evXX3AIgxCcbpwZ6ArQp2EhN4KVY5L6Ec0YLpaqj2TwApSyXO32doK9Eg',
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
                    {data.product && data.product.name}
                  </Text>
                  <Text style={{fontSize: 13, marginTop: 5}}>
                    Mulai Dari Rp{' '}
                    {data.product
                      ? formatRupiah(
                          data.product.price_basic +
                            data.product.price_benefit +
                            data.product.price_commission,
                        )
                      : '0'}
                  </Text>
                  <Text style={{color: '#949494', fontSize: 12}}>
                    Stok {data.product && data.product.stock}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 10,
                      paddingBottom: 20,
                    }}>
                    <TouchableOpacity
                      style={{
                        width: '50%',
                      }}
                      onPress={() => hapusProduk(data.id)}>
                      <Text style={{color: 'red'}}>Hapus Produk</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: '50%',
                      }}
                      onPress={() =>
                        detailProduk(data.product.id, data.product.name)
                      }>
                      <Text style={{color: '#07A9F0'}}>Lihat Produk</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}

        {any && wishlist ? (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
            onPress={() => loadMore(page + 1)}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={['#0956C6', '#0879D8', '#07A9F0']}
              style={{padding: 15, borderRadius: 10}}>
              <Text style={{fontWeight: 'bold', fontSize: 12, color: 'white'}}>
                Produk Selanjutnya
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : wishlist.length !== 0 ? (
          <Text style={{textAlign: 'center'}}>Tidak Ada Produk lagi</Text>
        ) : (
          <Text style={{textAlign: 'center'}}>
            Produk dengan kata kunci{' '}
            <Text style={{fontWeight: 'bold'}}>{dataSearch}</Text> tidak
            ditemukan
          </Text>
        )}
      </ScrollView>
      {loading && <Loading />}
      {/* {status === 'true' ? null : (
        <TouchableOpacity onPress={goCreateNewProduct} style={styles.button}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#0956C6', '#0879D8', '#07A9F0']}
            style={styles.button}>
            <Icon name="plus" size={20} color="#fff" />
            <Text style={styles.buttonText}>Tambah</Text>
          </LinearGradient>
        </TouchableOpacity>
      )} */}
      {/* ------ [START BUTTON DOWN PAGE] ------ */}
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
      {/* ------ [END BUTTON DOWN PAGE] ------ */}
      <BottomTab {...props} />
    </View>
  );
}

export default WishlistSesungguhnya;

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
