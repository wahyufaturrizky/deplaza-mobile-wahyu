import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '../../components/loading';

import Appbar from '../../components/appbarHome';
import {URL, formatRupiah} from '../../utils/global';
function informasiPenjualanSaya(props) {
  const [modal, setModal] = useState(false);
  const [history, setHistory] = useState([]);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [seller, setSeller] = useState('');
  const [buyer, setBuyer] = useState('');
  const [product, setProduct] = useState('');
  const [Varian, setVarian] = useState([]);
  const [komisi, setKomisi] = useState(null);
  const [komisiCustom, SetKomisiCustom] = useState(null);
  const [benefit, setBenefit] = useState(null);
  const [hargaPlusOngkir, setHargaPlusOngkir] = useState(null);
  const [total, setTotal] = useState(null);
  const [jumlah, setJumlah] = useState(null);
  const [alamat, setAlamat] = useState('');
  const [NoHp, setNoHp] = useState('');
  const [status, setStatus] = useState('');
  const [pembayaran, setPembayaran] = useState('');
  const [loading, setLoading] = useState(true);

  const {height, width} = Dimensions.get('window');
  let str = '';
  let n = 0;

  const urlHistory = URL + 'v1/saldo/my-history';
  const URL_STRING =
    URL +
    'v1/orders/my-order?limit=5&offset=0&invoice=&start_date=&end_date=&status=&details=1';

  useEffect(() => {
    getHistory();
  }, []);

  const modalTrigger = data => {
    console.log('modalTrigger', data);
    // if (data != '') {
    //   setDate(data.created_at);
    //   setDescription(data.description);
    //   setAmmount(data.ammount);
    // }
    setDate(data?.created_at);
    setSeller(data?.seller?.fullname);
    setBuyer(data?.customer?.fullname);
    setProduct(data[0]?.metadata_products);
    setJumlah(data[0]?.qty);
    setKomisi(data[0]?.commission);
    SetKomisiCustom(data[0]?.custom_commission);
    setBenefit(data[0]?.benefit);
    setHargaPlusOngkir(data?.delivery?.sipping_cost);
    setTotal(
      data[0]?.benefit +
        data[0]?.commission +
        data[0]?.custom_commission +
        data?.delivery?.sipping_cost +
        data[0]?.price * data[0]?.qty,
    );
    setAlamat(data?.delivery?.receiver_address);
    setNoHp(data?.customer?.phone);
    setNoHp(data?.customer?.phone);
    setStatus(data?.status_label);
    setPembayaran(data?.is_cod);
    setModal(!modal);
  };

  const getHistory = async () => {
    setLoading(true);
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(URL_STRING, {headers})
      .then(response => response.json())
      .then(responseData => {
        setLoading(false);
        let data = responseData.data;
        data.reverse();
        setHistory(data);
      });
  };

  const gotoAkun = () => {
    props.navigation.navigate('Akun', {title: 'Akun Saya', ...props});
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 10,
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '70%'}}>
          <TouchableOpacity onPress={gotoAkun}>
            <Icon
              name={'arrow-left'}
              size={30}
              color={'#707070'}
              style={{marginRight: width * 0.02}}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 16}}>Informasi Penjualan Saya</Text>
        </View>
        <View style={{width: '25%'}}>
          {/* <TouchableOpacity>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                            style={{borderRadius:10, padding:8,justifyContent:'center', alignItems:'center'}}
                        >
                            <Text style={{fontSize:14, textAlign:'center', color:'white'}}>
                                Simpan
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity> */}
        </View>
      </View>
      <View>
        {/* <Appbar params={props}/> */}
        <ScrollView style={{backgroundColor: 'white'}}>
          {history.map((data, i) => (
            <View key={i}>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginBottom: height * 0.01,
                  }}>
                  {moment(data?.created_at).format('D MMMM YYYY, H:mm A')}
                </Text>
                <Text style={{marginBottom: height * 0.02}}>
                  {data.payment.name}
                </Text>
                <TouchableOpacity
                  onPress={() => modalTrigger(data)}
                  style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  <Text style={{color: '#07A9F0'}}>Lihat Lebih Banyak</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: '#D5D5D5',
                  marginVertical: height * 0.01,
                }}
              />
            </View>
          ))}
          {/* ----- [SET LOADING PAGE] ----- */}
          {loading && <Loading />}
          {/* ----- [SET LOADING PAGE] ----- */}
        </ScrollView>

        {modal && (
          <View
            style={{
              position: 'absolute',
              flex: 1,
              zIndex: 1,
              width: width,
              height: height,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ScrollView
              style={[
                styles.shadow,
                {
                  alignSelf: 'center',
                  width: width * 0.8,
                  backgroundColor: 'rgba(255,255,255,1)',
                  padding: 15,
                },
              ]}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginBottom: height * 0.01,
                }}>
                {moment(date).format('D MMMM YYYY, H:mm A')}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: height * 0.01,
                }}>
                Seller
              </Text>
              <Text style={{fontSize: 14, marginBottom: height * 0.01}}>
                {/* {description} Sebesar Rp. {formatRupiah(ammount)} */}
                {seller ? seller : 'Empty'}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: height * 0.01,
                }}>
                Buyer
              </Text>
              <Text style={{fontSize: 14, marginBottom: height * 0.01}}>
                {/* {description} Sebesar Rp. {formatRupiah(ammount)} */}
                {buyer ? buyer : 'Empty'}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: height * 0.01,
                }}>
                Produk
              </Text>
              <Text style={{fontSize: 14, marginBottom: height * 0.01}}>
                {/* {description} Sebesar Rp. {formatRupiah(ammount)} */}
                {product ? product : 'Empty'}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: height * 0.01,
                }}>
                Jumlah
              </Text>
              <Text style={{fontSize: 14, marginBottom: height * 0.01}}>
                {/* {description} Sebesar Rp. {formatRupiah(ammount)} */}
                {jumlah ? jumlah : 'Empty'}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: height * 0.01,
                }}>
                Komisi
              </Text>
              <Text style={{fontSize: 14, marginBottom: height * 0.01}}>
                {/* {description} Sebesar Rp. {formatRupiah(ammount)} */}
                {komisi ? komisi : 'Empty'}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: height * 0.01,
                }}>
                Komisi Kustom
              </Text>
              <Text style={{fontSize: 14, marginBottom: height * 0.01}}>
                {/* {description} Sebesar Rp. {formatRupiah(ammount)} */}
                {komisiCustom ? komisiCustom : 'Empty'}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: height * 0.01,
                }}>
                Benefit
              </Text>
              <Text style={{fontSize: 14, marginBottom: height * 0.01}}>
                {/* {description} Sebesar Rp. {formatRupiah(ammount)} */}
                {benefit ? benefit : 'Empty'}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: height * 0.01,
                }}>
                Harga + Ongkir
              </Text>
              <Text style={{fontSize: 14, marginBottom: height * 0.01}}>
                {/* {description} Sebesar Rp. {formatRupiah(ammount)} */}
                {hargaPlusOngkir ? hargaPlusOngkir : 'Empty'}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: height * 0.01,
                }}>
                Total
              </Text>
              <Text style={{fontSize: 14, marginBottom: height * 0.01}}>
                {/* {description} Sebesar Rp. {formatRupiah(ammount)} */}
                {total ? total : 'Empty'}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: height * 0.01,
                }}>
                Alamat
              </Text>
              <Text style={{fontSize: 14, marginBottom: height * 0.01}}>
                {/* {description} Sebesar Rp. {formatRupiah(ammount)} */}
                {alamat ? alamat : 'Empty'}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: height * 0.01,
                }}>
                No Hp
              </Text>
              <Text style={{fontSize: 14, marginBottom: height * 0.01}}>
                {/* {description} Sebesar Rp. {formatRupiah(ammount)} */}
                {NoHp ? NoHp : 'Empty'}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: height * 0.01,
                }}>
                Status
              </Text>
              <Text style={{fontSize: 14, marginBottom: height * 0.01}}>
                {/* {description} Sebesar Rp. {formatRupiah(ammount)} */}
                {status ? status : 'Empty'}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: height * 0.01,
                }}>
                Pembayaran
              </Text>
              <Text style={{fontSize: 14, marginBottom: height * 0.01}}>
                {/* {description} Sebesar Rp. {formatRupiah(ammount)} */}
                {pembayaran ? pembayaran : 'Empty'}
              </Text>

              <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                onPress={() => modalTrigger('')}>
                <Text style={{fontSize: 14, color: '#07A9F0'}}>Tutup</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}

export default informasiPenjualanSaya;

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
  shadowBlue: {
    shadowColor: '#07A9F0',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 22,
  },
});
