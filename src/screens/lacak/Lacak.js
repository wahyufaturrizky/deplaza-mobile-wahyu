/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {Text, View, Dimensions, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-community/clipboard';
import {Snackbar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import AppBarHome from '../../components/appbarHome';
import Loading from '../../components/loading';

import {URL, formatRupiah} from '../../utils/global';
import {ScrollView} from 'react-native-gesture-handler';

function Lacak(props) {
  const [copy, setCopy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [methodId, setMethodId] = useState(0);
  const [qty, setQty] = useState('');
  const [komisi, setKomisi] = useState(0);
  const [kustomKomisi, setKustomKimisi] = useState(0);
  const [benefit, setBenefit] = useState(0);
  const [shipCost, setShipCost] = useState(0);
  const [price, setPrice] = useState(0);
  const [total_price, setTotal_price] = useState(0);
  const [trackingId, setTrackingId] = useState('');
  const [trackingName, setTrackingName] = useState('');
  const [manifest, setManifest] = useState([]);

  const [productImages, setProductImages] = useState(
    'https://via.placeholder.com/150',
  );
  const [productName, setProductName] = useState('0');

  const [logs, setLogs] = useState([]);
  const id_order = props.route.params.id;
  const urlRincianPesanan = URL + '/v1/orders/';
  const urlProdukDetail = URL + 'v1/product/';
  const urlCourir = URL + 'v1/courier/';
  const urlCourirTracing = URL + 'v1/shipment/new/tracing';

  const {height, width} = Dimensions.get('window');

  useEffect(() => {
    getRincianPesanan();
  }, []);

  const getRincianPesanan = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);
    let headers = {
      Authorization: `Bearer ${data.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(urlRincianPesanan + id_order, {headers})
      .then(response => response.json())
      .then(async responseData => {
        let logs = responseData.data.logs;
        logs.reverse();
        setLogs(logs);
        setMethodId(responseData.data.payment.method_id);
        setTrackingId(responseData.data.delivery.tracking_id);
        setQty(responseData.data.details[0].qty);
        setTotal_price(responseData.data.total_price);
        setShipCost(responseData.data.delivery.sipping_cost);
        setBenefit(responseData.data.details[0].benefit);
        setKustomKimisi(responseData.data.details[0].custom_commission);
        setKomisi(responseData.data.details[0].commission);
        setPrice(responseData.data.details[0].price);

        let id_produk = responseData.data.details[0].product_id;

        await fetch(urlProdukDetail + id_produk, {headers})
          .then(response => response.json())
          .then(responseData => {
            setLoading(false);
            setProductName(responseData.data.name);
            setProductImages(responseData.data.images[0].image_url);
          });

        await fetch(urlCourir + responseData.data.delivery.courier_id, {
          headers,
        })
          .then(response => response.json())
          .then(async response => {
            let nameTracking = response.data.name;
            const dataResi = {
              resi: responseData.data.delivery.tracking_id,
              courier: response.data.name.toLowerCase(),
            };
            setTrackingName(nameTracking);
            await fetch(urlCourirTracing, {
              method: 'POST',
              headers,
              body: JSON.stringify(dataResi),
            })
              .then(response => response.json())
              .then(async responseData => {
                // let manifest = await responseData.rajaongkir.result.manifest;
                let manifest = await responseData.data.data.outbounds;
                setManifest(manifest);
              })
              .catch(err => console.log(err.message));
          });
      });
  };

  const tracing = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);
    let headers = {
      Authorization: `Bearer ${data.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(urlRincianPesanan + id_order, {headers})
      .then(response => response.json())
      .then(async responseData => {
        const dataResi = {
          resi: responseData.data.delivery.tracking_id,
          courier: 'sicepat',
        };
        await fetch(urlCourirTracing, {
          method: 'POST',
          body: JSON.stringify(dataResi),
          headers,
        })
          .then(response => response.json())
          .then(async responseData => {
            let manifest = await responseData.rajaongkir.result.manifest;
            setManifest(manifest);
          })
          .catch(err => console.log('dasdas', {err}));
      });
  };

  const copyToClipboard = async () => {
    const copyText = trackingId;
    Clipboard.setString(copyText);
    setCopy(true);
  };

  const _onDismissSnackBar = () => setCopy(false);

  const totalPrice =
    price * qty + benefit * qty + komisi * qty + kustomKomisi * qty + shipCost;
  console.log('manifest', manifest);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <AppBarHome params={props} />

      <ScrollView>
        <View
          style={{
            padding: 20,
            backgroundColor: '#f8f8f8',
            marginBottom: height * 0.02,
          }}>
          <Text style={{fontSize: 16}}>Linimasa</Text>
        </View>

        {logs.map((data, i) => (
          <View
            key={i}
            style={{flexDirection: 'row', width: '90%', alignSelf: 'center'}}>
            <View style={{alignItems: 'center', marginRight: width * 0.03}}>
              <Image
                source={require('../../assets/images/EllipseNo.png')}
                style={{width: width * 0.05, height: width * 0.05}}
              />
              <Image
                source={require('../../assets/images/Line.png')}
                style={{width: width * 0.005, height: height * 0.1}}
              />
            </View>

            <View>
              <Text>
                {moment(data.created_at).format('D MMMM YYYY, h:mm A')}
              </Text>
              <Text style={{width: width * 0.8}}>{data.description}</Text>
            </View>
          </View>
        ))}
        {manifest &&
          manifest.map((data, i) => (
            <View
              key={i}
              style={{flexDirection: 'row', width: '90%', alignSelf: 'center'}}>
              <View style={{alignItems: 'center', marginRight: width * 0.03}}>
                <Image
                  source={require('../../assets/images/EllipseNo.png')}
                  style={{width: width * 0.05, height: width * 0.05}}
                />
                <Image
                  source={require('../../assets/images/Line.png')}
                  style={{width: width * 0.005, height: height * 0.1}}
                />
              </View>

              <View>
                <Text>
                  {moment(data.created_at).format('D MMMM YYYY, h:mm A')}
                </Text>
                <Text style={{width: width * 0.8}}>
                  {data.manifest_description}
                </Text>
              </View>
            </View>
          ))}

        <View style={{borderTopWidth: 1, borderColor: '#D5D5D5'}} />

        <View style={{padding: 20, marginTop: height * 0.01}}>
          <Text style={{marginBottom: height * 0.01, fontSize: 16}}>
            Metode Pembayaran
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                {methodId != 1 ? 'TRANSFER' : 'COD'}
              </Text>
              <Text>Kurir : {trackingName}</Text>

              <Text>
                No. Resi :
                {trackingId != '' ? (
                  <Text>{trackingId}</Text>
                ) : (
                  <Text style={{color: 'red'}}> Resi Belum di Input</Text>
                )}
              </Text>
            </View>
            {trackingId != '' && (
              <TouchableOpacity
                style={{
                  backgroundColor: '#E6E6E6',
                  width: '30%',
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={copyToClipboard}>
                <Icon name="content-copy" size={16} color={'#07A9F0'} />
                <Text style={{color: '#07A9F0'}}> No. Resi</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={{borderTopWidth: 1, borderColor: '#D5D5D5'}} />

        <View style={{padding: 20, marginTop: height * 0.01}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'flex-start',
              height: height * 0.2,
            }}>
            <View style={{width: '30%'}}>
              <Image
                source={{uri: productImages}}
                style={{
                  width: '100%',
                  height: height * 0.2,
                  resizeMode: 'cover',
                  borderRadius: 10,
                }}
              />
            </View>

            <View
              style={{
                width: '60%',
                justifyContent: 'space-between',
                height: '100%',
                flexDirection: 'column',
              }}>
              <View>
                <View>
                  <Text style={{fontSize: 14}}>{productName}</Text>
                  <Text>Rp. {formatRupiah(totalPrice)}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'gray',
                        marginTop: height * 0.01,
                      }}>
                      Jumlah: {qty}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {loading && <Loading />}

      <Snackbar visible={copy} onDismiss={_onDismissSnackBar} duration={1000}>
        Nomor Resi Berhasil di Salin
      </Snackbar>
    </View>
  );
}

export default Lacak;
