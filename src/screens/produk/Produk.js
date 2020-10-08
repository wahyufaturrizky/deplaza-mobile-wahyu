/* eslint-disable */

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import BottomTab from '../../components/bottomTab';
import {Title, Appbar} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {URL, formatRupiah} from '../../utils/global';
import Loading from '../../components/loading';
import InputNormal from '../../components/inputNormal';

function produk(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [any, setAny] = useState(true);
  const [search, setSearch] = useState(false);
  const [dataSearch, setDataSearch] = useState('');
  const [pageOff, setPageOff] = useState(0);

  // Untuk Dapetin lagi di page mana
  let halaman = props.route.params.title;

  const {height, width} = Dimensions.get('window');
  const urlProduk = URL + 'v1/product';

  useEffect(() => {
    if (halaman == 'Cari Produk') {
      searchProduk(props.route.params.search);
    } else {
      getProduct();
    }
  }, []);

  //Pergi ke Hal List Produk
  const detailProduk = (id, name) => {
    props.navigation.navigate('ProdukDetailAdaButtonDisukai', {
      id,
      title: name,
    });
  };

  const gotoWishlist = () => {
    props.navigation.navigate('Wishlist', {title: 'Produk Saya'});
  };

  const getProduct = async () => {
    setLoading(true);
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

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlProduk + '?limit=10&offset=0&order_direction=desc' + param, {
      headers,
    })
      .then(response => response.json())
      .then(async responseData => {
        await setProducts(responseData.data);
        console.log(products.data);
        setPage(0);
        setLoading(false);
      })
      .catch(e => console.log(e));
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
    param += dataSearch ? '&keyword=' + dataSearch : '';

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    console.log('okok', param);

    await fetch(
      `${urlProduk}?order_direction=desc&limit=10&offset=${off}${param}`,
      {headers},
    )
      .then(response => response.json())
      .then(async responseData => {
        console.log('ll', responseData);
        await setProducts(products.concat(responseData.data));
        setPage(responseData.meta.current_page);
        setLoading(false);

        // setLoad(true)
        if (responseData.data.length == 0) {
          setAny(false);
        }
      })
      .catch(e => console.log(e.response));
  };

  const OpenSearchTrigger = async () => {
    setSearch(true);
  };

  const CloseSearchTrigger = async () => {
    setSearch(false);
    setAny(true);
    getProduct();
  };

  const searchProduk = async search => {
    setDataSearch(search);
    setLoading(true);
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);
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
    param += '&keyword=' + search;

    console.log(urlProduk + '?limit=10&offset=0' + param);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlProduk + `?order_direction=desc&limit=10&offset=0${param}`, {
      headers,
    })
      .then(response => response.json())
      .then(async responseData => {
        await setProducts(responseData.data);
        setLoading(false);
        console.log(responseData);
        setPage(responseData.meta.current_page);
        if (responseData.data.length == 0) {
          setAny(false);
        }
      })
      .catch(e => console.log(e));
  };

  // console.log('product', products);

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
        {products.map((product, index) => {
          return (
            <View
              key={product.id}
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                height: height * 0.18,
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
                source={{uri: product.images[0].image_url}}
                style={{height: '100%', width: '30%', borderRadius: 10}}
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
                  {product.name}
                </Text>
                <Text style={{fontSize: 13, marginTop: 5}}>
                  Mulai Dari Rp{' '}
                  {formatRupiah(
                    product.price_basic +
                      product.price_benefit +
                      product.price_commission,
                  )}
                </Text>
                <Text style={{color: '#949494', fontSize: 12}}>
                  Stok {product.stock}
                </Text>
                <TouchableOpacity
                  style={{
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    flex: 1,
                    paddingVertical: 10,
                  }}
                  onPress={() => detailProduk(product.id, product.name)}>
                  <Text style={{color: '#07A9F0', marginRight: 10}}>
                    Lihat Produk
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        {any && products ? (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
            onPress={() => loadMore(page + 1)}>
            <Text>Produk Selanjutnya</Text>
          </TouchableOpacity>
        ) : products.length !== 0 ? (
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

      <BottomTab {...props} />
    </View>
  );
}

export default produk;

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
