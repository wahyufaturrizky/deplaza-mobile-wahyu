import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {URL, capitalLetters} from '../../utils/global';

import Appbar from '../../components/appbarHome';
import BottomTab from '../../components/bottomTab';
import Loading from '../../components/loading';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

function Kategori(props) {
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [page, setPage] = useState(0);
  const [any, setAny] = useState(true);

  const {height, width} = Dimensions.get('window');
  const urlWishlist = URL + 'v1/category';

  useEffect(() => {
    getKategori();
  }, []);

  const listProduk = (title, idKategori) => {
    props.navigation.navigate('Produk', {title, idKategori});
  };

  const getKategori = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlWishlist + '?limit=9&offset=0', {headers})
      .then(response => response.json())
      .then(responseData => {
        setLoading(false);
        let totalData = responseData.data.length;
        console.log(totalData);
        setKategori(responseData.data);
      })
      .catch(e => console.log(e));
  };

  const loadMore = async hal => {
    setLoading(true);

    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let pageNow = hal;

    let off = 9 * pageNow;

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlWishlist + '?limit=9&offset=' + off, {headers})
      .then(response => response.json())
      .then(async responseData => {
        await setKategori(kategori.concat(responseData.data));
        setPage(pageNow++);
        setLoading(false);
        // setLoad(true)
        if (responseData.data.length == 0) {
          setAny(false);
        }
      })
      .catch(e => console.log(e));
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Appbar params={props} />
      <ScrollView>
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {kategori.map((data, i) => (
            <View
              key={i}
              style={{
                width: '30%',
                height: height * 0.24,
                justifyContent: 'space-between',
                marginVertical: height * 0.01,
                borderRadius: 10,
                padding: 2,
                borderColor: 'gray',
                borderWidth: 0.5,
              }}>
              <TouchableOpacity
                onPress={() => {
                  listProduk('Produk Kategori ' + data.name, data.id);
                }}
                style={{width: '100%', alignItems: 'center'}}>
                <Image
                  source={{uri: data.image_url}}
                  style={{
                    width: '100%',
                    resizeMode: 'cover',
                    height: height * 0.17,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    marginVertical: 5,
                  }}>
                  {capitalLetters(data.name)}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {any ? (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginBottom: 20,
              top: -5,
            }}
            onPress={() => loadMore(page + 1)}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={['#0956C6', '#0879D8', '#07A9F0']}
              style={{padding: 15, borderRadius: 10}}>
              <Text style={{fontWeight: 'bold', fontSize: 10, color: 'white'}}>
                Kategori Selanjutnya
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <Text style={{textAlign: 'center'}}>Tidak Ada Produk lagi</Text>
        )}
      </ScrollView>
      {loading && <Loading />}
      <BottomTab {...props} />
    </View>
  );
}

export default Kategori;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    // shadowOffset: {
    //     width: 0,
    //     height: 0.2,
    // },
    // shadowOpacity: 0.20,
    // shadowRadius: 0.41,

    // elevation: 0.2,
  },
});
