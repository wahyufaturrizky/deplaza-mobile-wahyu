import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Appbar from '../components/appbarHome';
import BottomTab from '../components/bottomTab';
import {Title, ActivityIndicator} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {URL, formatRupiah} from '../utils/global';
import Loading from '../components/loading';

function produk(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [color, setColor] = useState(false);

  let halaman = props.route.params.title;

  const {height, width} = Dimensions.get('window');
  const urlProduk = URL + 'v1/product';

  useEffect(() => {
    getProduct();
  }, []);

  //Pergi ke Hal List Produk
  const detailProduk = id => {
    props.navigation.navigate('ProdukDetail', {id, title: 'Lihat Produk'});
  };

  const getProduct = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);
    let param = '';

    if (halaman === 'Komisi Terbesar') {
      param = 'order_by=price_commission&order_direction=desc';
    } else {
      param = '';
    }

    console.log(urlProduk + '?' + param);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlProduk + '?' + param, {headers})
      .then(response => response.json())
      .then(responseData => {
        setProducts(responseData.data);
        // setColor
        // console.log(responseData.data)
        setLoading(false);
      })
      .catch(e => console.log(e));
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Appbar params={props} />

      <ScrollView style={{flex: 1, marginTop: 10}}>
        {products.map((product, index) => {
          // let variation = JSON.parse(products[0].variation)[0]
          // let slug = variation.split('[').pop();
          // let slug2= slug.substr(0, slug.indexOf(']'));
          // let color = slug2.replace(/[']+/g, '');
          // let colorArray = color.split(',');

          return (
            <View
              key={product.id}
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: '#ddd',
                width: '90%',
                paddingRight: 5,
                alignSelf: 'center',
                borderRadius: 20,
                borderLeftWidth: 0,
              }}>
              {products[index].images[0] != null ? (
                <Image
                  // source={require('../../assets/images/ex-produk.png')}
                  source={{uri: products[index].images[0].image_url}}
                  style={{height: '100%', width: '30%', borderRadius: 10}}
                />
              ) : (
                <Image
                  // source={require('../../assets/images/ex-produk.png')}
                  source={{
                    uri:
                      'https://dev-rest-api.deplaza.id/public/images/product/product-1593039951.png',
                  }}
                  style={{height: '100%', width: '30%', borderRadius: 10}}
                />
              )}
              <View style={{width: '68%'}}>
                <Title style={{fontSize: 16, lineHeight: 18}}>
                  {product.name}
                </Title>
                <Text style={{fontSize: 14}}>
                  Mulai Dari Rp {formatRupiah(product.price_basic)}
                </Text>
                <Text style={{color: '#949494'}}>Stok {product.stock}</Text>
                {products.variation_data != null ? (
                  <View>
                    <Text style={{color: '#949494'}}>Varian Warna</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                        paddingBottom: 20,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          width: '50%',
                        }}>
                        {products[index].variation_data.color.map(
                          (color, i) => (
                            <View
                              key={i}
                              style={{
                                backgroundColor: 'white',
                                borderWidth: 1,
                                borderColor: 'gray',
                                padding: 5,
                                marginBottom: height * 0.005,
                                borderRadius: 5,
                              }}>
                              <Text>{color}</Text>
                            </View>
                          ),
                        )}
                      </View>
                      <TouchableOpacity
                        style={{width: '38%'}}
                        onPress={() => detailProduk(product.id)}>
                        <Text style={{color: '#07A9F0'}}>Lihat Produk</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={{width: '38%', paddingVertical: 10}}
                    onPress={() => detailProduk(product.id)}>
                    <Text style={{color: '#07A9F0'}}>Lihat Produk</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {loading && <Loading />}

      <BottomTab {...props} />
    </View>
  );
}

export default produk;
