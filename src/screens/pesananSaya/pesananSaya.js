/* eslint-disable */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
// import Appbar from '../../components/appbarHome'
import BottomTab from '../../components/bottomTab';
import {Title, Appbar} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {URL, formatRupiah} from '../../utils/global';
import Loading from '../../components/loading';
import InputNormal from '../../components/inputNormal';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

function pesananSaya(props) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [any, setAny] = useState(true);
  const [search, setSearch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  let halaman = props.route.params.title;
  let stsComplain = props.route.params.stsComplain;

  const {height, width} = Dimensions.get('window');
  const urlOrder = URL + '/v1/orders/my-order?details=1';

  useEffect(() => {
    getProduct();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getProduct();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //Pergi ke Hal List Produk
  const detailProduk = id => {
    props.navigation.navigate('RincianPesanan', {id, title: 'Rincian Pesanan'});
  };

  const getProduct = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlOrder + '&limit=10&offset=0&order_direction=desc', {headers})
      .then(response => response.json())
      .then(responseData => {
        setOrders(responseData.data);
        setLoading(false);
      });
  };

  console.log('oo', orders.length);

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

    fetch(urlOrder + '&limit=10&offset=' + off + '&order_direction=desc', {
      headers,
    })
      .then(response => response.json())
      .then(async responseData => {
        await setOrders(orders.concat(responseData.data));
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
    getProduct();
  };

  const searchProduk = async search => {
    setLoading(true);
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);
    let param = '&invoice=' + search + '&customer=' + search;
    console.log(urlOrder + '?limit=10&offset=' + page + '' + param);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlOrder + '&limit=10&offset=0&order_direction=desc' + param, {
      headers,
    })
      .then(response => response.json())
      .then(async responseData => {
        await setOrders(responseData.data);
        setPage(1);
        setLoading(false);
      })
      .catch(e => console.log(e));
  };

  const gotoWishlist = () => {
    props.navigation.navigate('Wishlist', {title: 'Produk Saya'});
  };

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
              placeholder="Cari Nomor Invoice"
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

      <ScrollView
        style={{flex: 1, marginTop: 10}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {console.log('data pesanan saya', orders)}
        {orders.map((data, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              height: height * 0.3,
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: '#ddd',
              width: '90%',
              paddingRight: 5,
              alignSelf: 'center',
              borderRadius: 20,
              borderLeftWidth: 0,
            }}>
            <View style={{width: width * 0.35, height: height * 0.2}}>
              <View style={{height: height * 0.3}}>
                <ImageBackground
                  source={{
                    uri:
                      data.details[0].product &&
                      data.details[0].product.images[0].image_url,
                  }}
                  resizeMode="stretch"
                  style={{
                    height: height * 0.2,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingTop: 5,
                    width: '100%',
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: 'white',
                      borderWidth: 1,
                      borderColor: 'black',
                    }}>
                    <Text style={{fontSize: 10}}>{data.invoice}</Text>
                  </View>
                </ImageBackground>
              </View>
            </View>

            <View style={{width: width * 0.5}}>
              <Title style={{fontSize: 14, lineHeight: 18}}>
                {data.details[0].product &&
                  data.details[0].product.name.substring(0, 100)}
              </Title>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: height * 0.01,
                }}>
                <View style={{width: '60%'}}>
                  <Text style={{fontSize: 14}}>
                    Rp.{' '}
                    {formatRupiah(
                      data.delivery
                        ? data.delivery.sipping_cost
                        : 0 +
                            data.details[0].price * data.details[0].qty +
                            data.details[0].benefit * data.details[0].qty +
                            data.details[0].qty * data.details[0].commission +
                            data.details[0].qty *
                              data.details[0].custom_commission,
                    )}
                  </Text>
                  <Text style={{color: '#949494', fontSize: 10}}>
                    Margin Rp.{' '}
                    {formatRupiah(
                      data.details[0].qty * data.details[0].commission +
                        data.details[0].qty * data.details[0].custom_commission,
                    )}
                  </Text>
                </View>

                <View
                  style={{
                    width: '30%',
                    borderWidth: 1,
                    borderColor:
                      data.status_label == 'Blm Dibayar' ||
                      data.status_label == 'Ditolak' ||
                      data.status_label == 'Pesanan sadang di komplain'
                        ? 'red'
                        : 'green',
                    padding: 5,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 8,
                      color:
                        data.status_label == 'Blm Dibayar' ||
                        data.status_label == 'Ditolak' ||
                        data.status_label == 'Pesanan sadang di komplain'
                          ? 'red'
                          : 'green',
                    }}>
                    {data.status_label}
                  </Text>
                </View>
              </View>

              <View style={{borderTopWidth: 1, borderColor: '#D5D5D5'}} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                  paddingBottom: 20,
                }}>
                <View style={{justifyContent: 'space-around', width: '40%'}}>
                  {data.delivery ? (
                    <Text style={{fontSize: 8}}>
                      {data.delivery.tracking_id}
                    </Text>
                  ) : (
                    <Text style={{fontSize: 8, color: 'red', marginBottom: 4}}>
                      Resi Belum di Input
                    </Text>
                  )}
                  <Text
                    style={{color: '#949494', fontSize: 10, marginBottom: 4}}>
                    Pembeli: {data.customer.fullname}
                  </Text>
                  <Text style={{color: '#949494', fontSize: 10}}>
                    {moment(data.created_at).format('MMMM D, YYYY')}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{width: '50%'}}
                  onPress={() => detailProduk(data.id)}>
                  <Text style={{color: '#07A9F0', fontSize: 10}}>
                    Cek Resi dan Lacak
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {any ? (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
            onPress={() => loadMore(page + 1)}>
            <Text>Pesanan Selanjutnya</Text>
          </TouchableOpacity>
        ) : (
          <Text style={{textAlign: 'center'}}>Tidak Ada Pesanan lagi</Text>
        )}
      </ScrollView>

      {loading && <Loading />}

      <BottomTab {...props} />
    </View>
  );
}

export default pesananSaya;

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
