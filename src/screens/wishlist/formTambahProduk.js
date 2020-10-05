/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {TextInput, Avatar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import Loading from '../../components/loading';

import {URL} from '../../utils/global';

function formTambahProduk(props) {
  const [fullname, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [alamat, setAlamat] = useState('');
  const [email, setEmail] = useState('');
  const [pos, setPos] = useState('');
  const [allAlamat, setAllAlamat] = useState([]);

  const [provinces, setProvinces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [subdistricts, setSubdistrict] = useState([]);
  const [getProvince, setGetProvince] = useState([]);

  const [provinsi, setProvinsi] = useState('kosong');
  const [kota, setKota] = useState('kosong');
  const [selectKota, setSelectKota] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [values, setValues] = useState({val: []});
  const [secondValues, setSecondValues] = useState({val: []});
  const [thirdValues, setThirdValues] = useState({val: []});

  const [provinsiDetail, setProvinsiDetail] = useState({});
  const [kotaDetail, setKotaDetail] = useState({});
  const [photo, setPhoto] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [idCity, setIdCity] = useState(null);
  const [idKecataman, setIdKecataman] = useState(null);
  const [codCityId, setCodCityId] = useState([]);
  const [cod, setCod] = useState(null);
  const [weight, setWeight] = useState(null);
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(null);
  const [priceCommission, setPriceCommission] = useState(0);
  const [priceBasic, setPriceBasic] = useState(null);
  const [brand, setBrand] = useState('');
  const [nameProduct, setNameProduct] = useState('');
  const [awb, setAwb] = useState(null);
  const [idSupplier, setIdSupplier] = useState(null);
  const [getSupplier, setGetSupplier] = useState([]);
  const [lengthProduct, setLengthProduct] = useState(null);
  const [heightProduct, setHeightProduct] = useState(null);
  const [widthProduct, setWidthProduct] = useState(null);
  const [file, setFile] = useState([]);
  const [source, setSource] = useState('');
  const [nameVariation, setNameVariation] = useState('');
  const [nameSecondVariation, setNameSecondVariation] = useState('');
  const [nameThirdVariation, setNameThirdVariation] = useState('');

  const [loading, setLoading] = useState(true);

  const [avatar, setAvatar] = useState('');
  const {height, width} = Dimensions.get('window');

  const URL_POST = URL + 'v1/product';
  const URL_GET_CATEGORY = URL + 'v1/category?limit=1000';
  const URL_GET_CITIES = URL + 'v1/shipment/cities';
  const URL_GET_PROVINCE = URL + 'v1/shipment/provinces';
  const URL_GET_CITY = URL + 'v1/shipment/city/province';

  const urlProvinces = URL + 'v1/shipment/provinces';
  const urlCities = URL + 'v1/shipment/city/province/';
  const urlKecamatan = URL + 'v1/shipment/subdistrict/city/';
  const urlProvincesDetail = URL + 'v1/shipment/province/';
  const urlKotaDetail = URL + 'v1/shipment/city/';
  const urlUpdateUser = URL + 'v1/user/';
  const urlUpdateAddress = URL + 'v1/address';
  const urlGetAddress = URL + 'v1/address/me';
  const urlProfile = URL + 'v1/my-profile';

  useEffect(() => {
    getDataSupplier();
    getDataCategory();
    getDataCity();
    getDataProvinces();
    getProvinsi();
    getAlamat();
    // getProfile();
  }, []);

  // const getProfile = async () => {
  //   const value = await AsyncStorage.getItem('data');
  //   const data = JSON.parse(value);

  //   let headers = {
  //     Authorization: `Bearer ${data.token}`,
  //     'Access-Control-Allow-Origin': '*',
  //   };

  //   fetch(urlProfile, {headers})
  //     .then(response => response.json())
  //     .then(async responseData => {
  //       setFullName(responseData.data.fullname);
  //       setPhone(responseData.data.phone);
  //       setEmail(responseData.data.email);
  //       setPhoto(responseData.data.avatar_url);
  //     });
  // };

  const getDataProvinces = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(URL_GET_PROVINCE, {headers})
      .then(response => response.json())
      .then(async responseData => {
        const mapProvinsi = responseData.rajaongkir.results;
        let data = mapProvinsi.map(s => ({
          id: s.province_id,
          name: 'Provinsi ' + s.province,
        }));
        setGetProvince(data);
        setLoading(false);
      });
  };

  const getDataSupplier = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(URL + `v1/supplier?limit=10000`, {headers})
      .then(response => response.json())
      .then(async responseData => {
        const mapAlamatGudangSupplier = responseData.data;
        let data = mapAlamatGudangSupplier.map(s => ({
          id: s.id,
          name: 'Alamat ' + s.alamat + ' Kode Pos: ' + s.post_code,
        }));
        setGetSupplier(data);
        setLoading(false);
      });
  };

  const handleChoosePhoto = () => {
    const options = {
      title: `Upload foto product anda`,
      storageOptions: {
        path: 'images',
      },
    };
    ImagePicker.openPicker({
      cropping: true,
    }).then(value => {
      console.log('handleChoosePhoto', value);
      // setFile([value]);
      setFile([value]);
    });
  };

  const getAlamat = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlGetAddress, {headers})
      .then(response => response.json())
      .then(async responseData => {
        let data = responseData.data;
        data.reverse();
        await setAllAlamat(data[0]);
        setAlamat(data[0].address);
        setKota(data[0].city_id);
        setProvinsi(data[0].prov_id);
        setPos(data[0].zip_code);
        // console.log(data[0].zip_code);
      });
  };

  // Fungsi untuk get data kategori
  const getDataCategory = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(URL_GET_CATEGORY, {headers})
      .then(response => response.json())
      .then(async responseData => {
        await setCategories(responseData.data);
        setLoading(false);
      });
  };

  const getDataCity = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(URL_GET_CITIES, {headers})
      .then(response => response.json())
      .then(responseData => {
        const mapKota = responseData.rajaongkir.results;
        let data = mapKota.map(s => ({
          id: s.city_id,
          name: s.type + ' ' + s.city_name,
        }));
        setCities(data);
        setLoading(false);
      })
      .catch(e => console.log(e));
  };

  // Fungsi untuk get data provinsi
  const getProvinsi = async () => {
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlProvinces, {headers})
      .then(response => response.json())
      .then(async responseData => {
        await setProvinces(responseData.rajaongkir.results);
        setLoading(false);
      });
  };

  // Fungsi untuk get data kota
  const getKota = async id_prov => {
    setLoading(true);
    setProvinsi(id_prov);

    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlCities + id_prov, {headers})
      .then(response => response.json())
      .then(async responseData => {
        await setCities(responseData.rajaongkir.results);

        fetch(urlProvincesDetail + id_prov, {headers})
          .then(response => response.json())
          .then(async responseData => {
            await setProvinsiDetail(responseData.rajaongkir.results);
            setLoading(false);
          });
      });
  };

  // Fungsi untuk get data kota
  const getKecamatan = async id_kota => {
    setLoading(true);
    setKota(id_kota);

    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    fetch(urlKecamatan + id_kota, {headers})
      .then(response => response.json())
      .then(async responseData => {
        await setSubdistrict(responseData.rajaongkir.results);

        fetch(urlKotaDetail + id_kota, {headers})
          .then(response => response.json())
          .then(async responseData => {
            setLoading(false);
            await setKotaDetail(responseData.rajaongkir.results);
          });
      });
  };

  // Fungsi untuk ADD NEW PRODUCT
  const addNewProduct = async () => {
    console.log('nameProduct', file.path);
    // console.log('categoryId', categoryId);
    // console.log('brand', brand);
    // console.log('priceBasic', priceBasic);
    // console.log('priceCommission', priceCommission);
    // console.log('Stok', stock);
    // console.log('setDescription', description);
    // console.log('setWeight', weight);
    // console.log('idCity', idCity);
    // console.log('idKecataman', idKecataman);
    // console.log('bisa COD', cod);
    // console.log('codCityId', codCityId);
    // console.log('resi otomatis atau tidak', awb);

    let checkDataEmpty = [
      {name: 'Judul Produk', value: nameProduct},
      {name: 'description', value: description},
      {name: 'category', value: categoryId},
      {name: 'brand', value: brand},
      {name: 'photo product', value: file},
      {name: 'Harga Pokok Produk', value: priceBasic},
      {name: 'Benefit Deplaza', value: priceCommission},
      {name: 'stock', value: stock},
      {name: 'weight', value: weight},
      {name: 'Kota Asal Produk', value: idCity},
      {name: 'Kecamatan Asal Produk', value: idKecataman},
    ];

    // if (awb === 1) {
    //   checkDataEmptyAwb = [
    //     {name: 'id Supplier', value: idSupplier},
    //     {name: 'widthProduct', value: widthProduct},
    //     {name: 'lengthProduct', value: lengthProduct},
    //     {name: 'heightProduct', value: heightProduct},
    //   ];

    //   let emptyFieldAwb = checkDataEmptyAwb.find(field => field.value === null);
    // }

    let emptyField = checkDataEmpty.find(
      field => field.value === '' || field.value === null,
    );

    if (!emptyField) {
      setLoading(true);
      const value = await AsyncStorage.getItem('data');
      const data = JSON.parse(value);

      let headers = {
        Authorization: `Bearer ${data.token}`,
        'Access-Control-Allow-Origin': '*',
        Accept: 'multipart/form-data',
        'content-type': 'multipart/form-data',
      };

      const testVariation = [
        {[nameVariation]: values.val},
        {[nameSecondVariation]: secondValues.val},
        {[nameThirdVariation]: thirdValues.val},
      ];

      let formData = new FormData();
      // file.forEach(file => formData.append('images[]', file));
      formData.append('images[]', {
        uri: file[0].path,
        type: file[0].mime, // or photo.type
        name: 'avatar.jpg',
      });
      formData.append('name', nameProduct);
      formData.append('description', description);
      formData.append('category_id', parseInt(categoryId));
      formData.append('brand', brand);
      formData.append('price_basic', parseInt(priceBasic));
      formData.append('price_commission', parseInt(priceCommission));
      formData.append('stock', parseInt(stock));
      formData.append('weight', parseInt(weight));
      formData.append('city_id', parseInt(idCity));
      formData.append('subdistrict_id', parseInt(idKecataman));
      formData.append('cod', parseInt(cod));
      formData.append('supplier_id', parseInt(idSupplier));
      formData.append('length', 1);
      formData.append('width', 1);
      formData.append('height', 1);
      formData.append('is_awb_auto', 1);
      formData.append('cod_city_id', JSON.stringify(codCityId));
      formData.append('price_benefit', parseInt(0));
      formData.append('user_id', data.id);
      formData.append('variation', JSON.stringify(testVariation));

      console.log('formData', formData);

      fetch(URL_POST, {
        headers,
        method: 'POST',
        body: formData,
      })
        .then(response => response.text())
        .then(async result => {
          console.log('addNewProduct', result);
          setLoading(false);
          alert('Product berhasil dibuat');
        })
        .catch(error => {
          console.log('error addNewProduct', error);
          alert(`Gagal upload new product`);
          setLoading(false);
        });
    } else {
      alert(`field ${emptyField.name} wajib di isi`);
    }
  };

  const _selectKota = async data_kota => {
    await setLoading(true);
    await setIdCity(data_kota.id);
    const value = await AsyncStorage.getItem('data');
    const data = JSON.parse(value);

    let headers = {
      Authorization: `Bearer ${data.token}`,
      'Access-Control-Allow-Origin': '*',
    };

    await fetch(urlKecamatan + data_kota.id, {headers})
      .then(response => response.json())
      .then(responseData => {
        setLoading(false);
        console.log('kecamatan', responseData.rajaongkir.result);
        const mapKota = responseData.rajaongkir.results;
        let data = mapKota.map((s, index) => ({
          id: s.subdistrict_id,
          name: 'Kecamatan' + ' ' + s.subdistrict_name,
        }));
        setKecamatan(data);
      })
      .catch(e => console.log('Error kecamatan', e));
  };

  const _selectKecamatan = async data_kota => {
    setIdKecataman(data_kota.id);
  };

  const handleChangeCodCity = data => {
    console.log('getDataCities', data);
    let catArray = [];
    data && data.map(i => catArray.push(i.id));
    const getCityId = cities.filter(obj => {
      if (catArray.indexOf(obj.province_id) === -1) {
        return false;
      }
      return true;
    });
    const getDataCities = getCityId.map(id => id.id);

    setCodCityId(getDataCities);
  };

  function handleChange(event) {
    let vals = [...values.val];
    vals[this] = event.target.value;
    setValues({val: vals});
    // setVariation([...variation, nameVariation, ...values.val])
    console.log('vals', event);
  }

  function createInputs() {
    return (
      <View>
        {values.val.length > 0 ? (
          <TextInput
            label="Variasi 1 Nama"
            value={nameVariation}
            mode="outlined"
            onChangeText={val => setNameVariation(val)}
            style={{
              width: '90%',
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
              marginBottom: height * 0.01,
            }}
            theme={{
              colors: {primary: '#07A9F0', underlineColor: 'transparent'},
            }}
          />
        ) : null}
        {values.val.map((el, i) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '90%',
              alignSelf: 'center',
              marginBottom: height * 0.01,
            }}>
            <TextInput
              label={`Variasi 1 Pilihan ${i + 1}`}
              // value={el || ''}
              mode="outlined"
              onChangeText={val => handleChange.bind(i)}
              style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 10,
                marginBottom: height * 0.01,
              }}
              theme={{
                colors: {primary: '#07A9F0', underlineColor: 'transparent'},
              }}
            />
            <TouchableOpacity onPress={removeClick.bind(i)}>
              <View
                style={{
                  backgroundColor: '#cecece',
                  width: 25,
                  height: 25,
                  borderRadius: 6,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="trash" size={20} />
              </View>
            </TouchableOpacity>
          </View>
        ))}
        {values.val.length > 0 ? (
          <View>
            <TouchableOpacity
              style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: 'white',
                marginBottom: height * 0.01,
              }}
              onPress={addClick}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={['#0956C6', '#0879D8', '#07A9F0']}
                style={{
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 6,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    color: 'white',
                  }}>
                  TAMBAHKAN PILIHAN
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            {secondValues.val.length > 0 ? null : (
              <TouchableOpacity
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  marginBottom: height * 0.01,
                }}
                onPress={addClick2}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={['#0956C6', '#0879D8', '#07A9F0']}
                  style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 6,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    TAMBAHKAN
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        ) : null}
      </View>
    );
  }

  function handleSecondChange(event) {
    let vals = [...secondValues.val];
    vals[this] = event.target.value;
    setSecondValues({val: vals});
    // setVariation([...variation, nameSecondVariation, secondValues.val])
    console.log(vals);
  }

  function createInputs2() {
    return (
      <View>
        {secondValues.val.length > 0 ? (
          <TextInput
            label="Variasi 2 Nama"
            value={nameSecondVariation}
            mode="outlined"
            onChangeText={val => setNameSecondVariation(val)}
            style={{
              width: '90%',
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
              marginBottom: height * 0.01,
            }}
            theme={{
              colors: {primary: '#07A9F0', underlineColor: 'transparent'},
            }}
          />
        ) : null}
        {secondValues.val.map((el, i) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '90%',
              alignSelf: 'center',
              marginBottom: height * 0.01,
            }}>
            <TextInput
              label={`Variasi 2 Pilihan ${i + 1}`}
              // value={el || ''}
              mode="outlined"
              onChangeText={val => handleSecondChange.bind(i)}
              style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 10,
                marginBottom: height * 0.01,
              }}
              theme={{
                colors: {primary: '#07A9F0', underlineColor: 'transparent'},
              }}
            />
            <TouchableOpacity onPress={removeSecondClick.bind(i)}>
              <View
                style={{
                  backgroundColor: '#cecece',
                  width: 25,
                  height: 25,
                  borderRadius: 6,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="trash" size={20} />
              </View>
            </TouchableOpacity>
          </View>
        ))}
        {secondValues.val.length > 0 ? (
          <View>
            <TouchableOpacity
              style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: 'white',
                marginBottom: height * 0.01,
              }}
              onPress={addClick2}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={['#0956C6', '#0879D8', '#07A9F0']}
                style={{
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 6,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    color: 'white',
                  }}>
                  TAMBAHKAN PILIHAN
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            {thirdValues.val.length > 0 ? null : (
              <TouchableOpacity
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  marginBottom: height * 0.01,
                }}
                onPress={addClick3}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={['#0956C6', '#0879D8', '#07A9F0']}
                  style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 6,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    TAMBAHKAN
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        ) : null}
      </View>
    );
  }

  function handleThirdChange(event) {
    let vals = [...thirdValues.val];
    vals[this] = event.target.value;
    setThirdValues({val: vals});
    // setVariation([...variation, nameThirdVariation, thirdValues.val])
    console.log(vals);
  }

  function createInputs3() {
    return (
      <View>
        {thirdValues.val.length > 0 ? (
          <TextInput
            label="Variasi 3 Nama"
            value={nameThirdVariation}
            mode="outlined"
            onChangeText={val => setNameThirdVariation(val)}
            style={{
              width: '90%',
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
              marginBottom: height * 0.01,
            }}
            theme={{
              colors: {primary: '#07A9F0', underlineColor: 'transparent'},
            }}
          />
        ) : null}
        {thirdValues.val.map((el, i) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '90%',
              alignSelf: 'center',
              marginBottom: height * 0.01,
            }}>
            <TextInput
              label={`Variasi 3 Pilihan ${i + 1}`}
              // value={el || ''}
              mode="outlined"
              onChangeText={val => handleThirdChange.bind(i)}
              style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 10,
                marginBottom: height * 0.01,
              }}
              theme={{
                colors: {primary: '#07A9F0', underlineColor: 'transparent'},
              }}
            />
            <TouchableOpacity onPress={removeThirdClick.bind(i)}>
              <View
                style={{
                  backgroundColor: '#cecece',
                  width: 25,
                  height: 25,
                  borderRadius: 6,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="trash" size={20} />
              </View>
            </TouchableOpacity>
          </View>
        ))}
        {thirdValues.val.length > 0 ? (
          <View>
            <TouchableOpacity
              style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: 'white',
                marginBottom: height * 0.01,
              }}
              onPress={addClick3}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={['#0956C6', '#0879D8', '#07A9F0']}
                style={{
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 6,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    color: 'white',
                  }}>
                  TAMBAHKAN PILIHAN
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }

  const addClick = () => {
    if (values.val.length > 9) {
      alert('Pilihan tidak boleh lebih dari 10');
    } else {
      setValues({val: [...values.val, '']});
    }
  };

  const addClick2 = () => {
    if (secondValues.val.length > 9) {
      alert('Pilihan tidak boleh lebih dari 10');
    } else {
      setSecondValues({val: [...secondValues.val, '']});
    }
  };

  const addClick3 = () => {
    if (thirdValues.val.length > 9) {
      alert('Pilihan tidak boleh lebih dari 10');
    } else {
      setThirdValues({val: [...thirdValues.val, '']});
    }
  };

  const removeClick = () => {
    let vals = [...values.val];
    vals.splice(this, 1);
    setValues({val: vals});
  };

  const removeSecondClick = () => {
    let vals = [...secondValues.val];
    vals.splice(this, 1);
    setSecondValues({val: vals});
  };

  const removeThirdClick = () => {
    let vals = [...thirdValues.val];
    vals.splice(this, 1);
    setThirdValues({val: vals});
  };

  return (
    <View style={{flex: 1, height: '100%'}}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View
          style={{
            padding: 15,
            backgroundColor: '#F8F8F8',
            marginTop: height * 0.01,
            flex: 1,
          }}>
          <TouchableOpacity onPress={handleChoosePhoto}>
            {file[0] !== undefined ? (
              <Image
                style={{
                  alignSelf: 'center',
                  marginBottom: 10,
                  width: 150,
                  height: 150,
                  borderRadius: 20,
                }}
                source={{uri: file[0].path}}
              />
            ) : (
              <View
                style={{
                  backgroundColor: '#cecece',
                  width: 150,
                  height: 150,
                  borderRadius: 20,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="camera" size={100} />
              </View>
            )}
            <Text style={{alignSelf: 'center', marginVertical: 14}}>
              Upload Photo Product
            </Text>
          </TouchableOpacity>

          <TextInput
            label="Judul Produk"
            value={nameProduct}
            mode="outlined"
            onChangeText={val => setNameProduct(val)}
            style={{
              width: '90%',
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
              marginBottom: height * 0.04,
            }}
            theme={{
              colors: {primary: '#07A9F0', underlineColor: 'transparent'},
            }}
          />

          <View
            style={{
              borderColor: 'gray',
              justifyContent: 'center',
              width: '90%',
              alignSelf: 'center',
              marginBottom: height * 0.03,
            }}>
            <SearchableDropdown
              onItemSelect={item => {
                const items = selectKota;
                items.push(item);
                setCategoryId(item.id);
                setSelectKota(items);
              }}
              containerStyle={{
                width: '100%',
                borderRadius: 10,
                justifyContent: 'center',
              }}
              onRemoveItem={(item, index) => {
                const items = selectKota.filter(sitem => sitem.id !== item.id);
                setSelectKota(items);
              }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#fff',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
                width: '100%',
              }}
              itemTextStyle={{color: '#222'}}
              itemsContainerStyle={{borderRadius: 10}}
              items={categories}
              defaultIndex={2}
              resetValue={false}
              textInputProps={{
                placeholder: 'Kategori',
                underlineColorAndroid: 'transparent',
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 5,
                  backgroundColor: '#fff',
                },
              }}
              listProps={{
                nestedScrollEnabled: true,
              }}
            />
          </View>

          <TextInput
            label="Brand"
            value={brand}
            mode="outlined"
            onChangeText={val => setBrand(val)}
            style={{
              width: '90%',
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
              marginBottom: height * 0.03,
            }}
            theme={{
              colors: {primary: '#07A9F0', underlineColor: 'transparent'},
            }}
          />

          <TextInput
            label="Harga Pokok Produk"
            value={priceBasic}
            keyboardType="numeric"
            mode="outlined"
            onChangeText={val => setPriceBasic(val)}
            style={{
              width: '90%',
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
              marginBottom: height * 0.03,
            }}
            theme={{
              colors: {primary: '#07A9F0', underlineColor: 'transparent'},
            }}
          />

          {/* <TextInput
            label="Komisi"
            value={priceCommission}
            keyboardType="numeric"
            mode="outlined"
            onChangeText={val => setPriceCommission(val)}
            style={{
              width: '90%',
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
              marginBottom: height * 0.03,
            }}
            theme={{
              colors: {primary: '#07A9F0', underlineColor: 'transparent'},
            }}
          /> */}

          <TextInput
            label="Stok Produk"
            value={stock}
            keyboardType="numeric"
            mode="outlined"
            onChangeText={val => setStock(val)}
            style={{
              width: '90%',
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
              marginBottom: height * 0.03,
            }}
            theme={{
              colors: {primary: '#07A9F0', underlineColor: 'transparent'},
            }}
          />

          {createInputs()}
          {createInputs2()}
          {createInputs3()}

          {values.val.length === 0 ? (
            <TouchableOpacity
              style={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: 'white',
                marginBottom: height * 0.03,
              }}
              onPress={addClick}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={['#0956C6', '#0879D8', '#07A9F0']}
                style={{
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 6,
                }}>
                <Text
                  style={{fontSize: 14, textAlign: 'center', color: 'white'}}>
                  AKTIFKAN VARIASI
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : null}

          <TextInput
            label="Deskripsi Produk"
            value={description}
            mode="outlined"
            onChangeText={val => setDescription(val)}
            style={{
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: 'white',
              marginBottom: height * 0.03,
            }}
            multiline={true}
            numberOfLines={4}
            theme={{
              colors: {primary: '#07A9F0', underlineColor: 'transparent'},
            }}
          />

          <TextInput
            label="Berat Produk (gram)"
            value={weight}
            keyboardType="numeric"
            mode="outlined"
            onChangeText={val => setWeight(val)}
            style={{
              width: '90%',
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
              marginBottom: height * 0.03,
            }}
            theme={{
              colors: {primary: '#07A9F0', underlineColor: 'transparent'},
            }}
          />

          {/* <TextInput
            label="Supplier (Sumber Produk)"
            value={source}
            mode="outlined"
            onChangeText={val => setSource(val)}
            style={{
              width: '90%',
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
              marginBottom: height * 0.04,
            }}
            theme={{
              colors: {primary: '#07A9F0', underlineColor: 'transparent'},
            }}
          /> */}

          <View
            style={{
              borderColor: 'gray',
              justifyContent: 'center',
              width: '90%',
              alignSelf: 'center',
              marginBottom: height * 0.03,
            }}>
            <SearchableDropdown
              onItemSelect={item => {
                const items = selectKota;
                items.push(item);
                setSelectKota(items);
                _selectKota(item);
              }}
              containerStyle={{
                width: '100%',
                borderRadius: 10,
                justifyContent: 'center',
              }}
              onRemoveItem={(item, index) => {
                const items = selectKota.filter(sitem => sitem.id !== item.id);
                setSelectKota(items);
              }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#fff',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
                width: '100%',
              }}
              itemTextStyle={{color: '#222'}}
              itemsContainerStyle={{borderRadius: 10}}
              items={cities}
              defaultIndex={2}
              resetValue={false}
              textInputProps={{
                placeholder: 'Kota Asal Produk',
                underlineColorAndroid: 'transparent',
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 5,
                  backgroundColor: '#fff',
                },
              }}
              listProps={{
                nestedScrollEnabled: true,
              }}
            />
          </View>

          <View
            style={{
              borderColor: 'gray',
              justifyContent: 'center',
              width: '90%',
              alignSelf: 'center',
              marginBottom: height * 0.03,
            }}>
            <SearchableDropdown
              onItemSelect={item => {
                const items = selectKota;
                items.push(item);
                setSelectKota(items);
                _selectKecamatan(item);
              }}
              containerStyle={{
                width: '100%',
                borderRadius: 10,
                justifyContent: 'center',
              }}
              onRemoveItem={(item, index) => {
                const items = selectKota.filter(sitem => sitem.id !== item.id);
                setSelectKota(items);
              }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#fff',
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
                placeholder: 'Kecamatan Asal Produk',
                underlineColorAndroid: 'transparent',
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 5,
                  backgroundColor: '#fff',
                },
              }}
              listProps={{
                nestedScrollEnabled: true,
              }}
            />
          </View>

          {/* <View
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              justifyContent: 'center',
              width: '90%',
              alignSelf: 'center',
              marginBottom: height * 0.03,
              borderRadius: 10,
              height: height * 0.055,
            }}>
            <Picker
              selectedValue={cod}
              onValueChange={(itemValue, itemIndex) => setCod(itemValue)}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Picker.Item label={'Bisa COD / Tidak'} value={null} />
              <Picker.Item label="Iya" value={1} />
              <Picker.Item label="Tidak" value={0} />
            </Picker>
          </View> */}

          {cod === 1 ? (
            <View
              style={{
                borderColor: 'gray',
                justifyContent: 'center',
                width: '90%',
                alignSelf: 'center',
              }}>
              <SearchableDropdown
                onItemSelect={item => {
                  const items = selectKota;
                  items.push(item);
                  setSelectKota(items);
                  handleChangeCodCity(items);
                }}
                containerStyle={{
                  width: '100%',
                  borderRadius: 10,
                  justifyContent: 'center',
                }}
                onRemoveItem={(item, index) => {
                  const items = selectKota.filter(
                    sitem => sitem.id !== item.id,
                  );
                  setSelectKota(items);
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#fff',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5,
                  width: '100%',
                }}
                itemTextStyle={{color: '#222'}}
                itemsContainerStyle={{borderRadius: 10}}
                items={getProvince}
                defaultIndex={2}
                resetValue={false}
                textInputProps={{
                  placeholder: 'Daerah COD',
                  underlineColorAndroid: 'transparent',
                  style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 5,
                    backgroundColor: '#fff',
                  },
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
            </View>
          ) : null}

          {/* <View
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              justifyContent: 'center',
              width: '90%',
              alignSelf: 'center',
              marginBottom: height * 0.01,
              borderRadius: 10,
              height: height * 0.055,
            }}>
            <Picker
              selectedValue={awb}
              onValueChange={(itemValue, itemIndex) => setAwb(itemValue)}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Picker.Item label={'Resi Otomatis / Tidak'} value={null} />
              <Picker.Item label="Iya" value={1} />
              <Picker.Item label="Tidak" value={0} />
            </Picker>
          </View> */}

          {awb === 1 ? (
            <View>
              <View
                style={{
                  borderColor: 'gray',
                  justifyContent: 'center',
                  width: '90%',
                  alignSelf: 'center',
                }}>
                <SearchableDropdown
                  onItemSelect={item => {
                    const items = selectKota;
                    items.push(item);
                    setSelectKota(items);
                    setIdSupplier(item.id);
                  }}
                  containerStyle={{
                    width: '100%',
                    borderRadius: 10,
                    justifyContent: 'center',
                  }}
                  onRemoveItem={(item, index) => {
                    const items = selectKota.filter(
                      sitem => sitem.id !== item.id,
                    );
                    setSelectKota(items);
                  }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#fff',
                    borderColor: '#bbb',
                    borderWidth: 1,
                    borderRadius: 5,
                    width: '100%',
                  }}
                  itemTextStyle={{color: '#222'}}
                  itemsContainerStyle={{borderRadius: 10}}
                  items={getSupplier}
                  defaultIndex={2}
                  resetValue={false}
                  textInputProps={{
                    placeholder: 'Alamat Gudang Supplier',
                    underlineColorAndroid: 'transparent',
                    style: {
                      padding: 12,
                      borderWidth: 1,
                      borderColor: 'gray',
                      borderRadius: 5,
                      backgroundColor: '#fff',
                    },
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
              </View>
              <TextInput
                label="Panjang (Cm)"
                value={heightProduct}
                keyboardType="numeric"
                mode="outlined"
                onChangeText={val => setHeightProduct(val)}
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  borderRadius: 10,
                  marginBottom: height * 0.01,
                }}
                theme={{
                  colors: {primary: '#07A9F0', underlineColor: 'transparent'},
                }}
              />
              <TextInput
                label="Lebar (Cm)"
                value={widthProduct}
                keyboardType="numeric"
                mode="outlined"
                onChangeText={val => setWidthProduct(val)}
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  borderRadius: 10,
                  marginBottom: height * 0.01,
                }}
                theme={{
                  colors: {primary: '#07A9F0', underlineColor: 'transparent'},
                }}
              />
              <TextInput
                label="Tinggi (Cm)"
                value={lengthProduct}
                keyboardType="numeric"
                mode="outlined"
                onChangeText={val => setLengthProduct(val)}
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  borderRadius: 10,
                  marginBottom: height * 0.01,
                }}
                theme={{
                  colors: {primary: '#07A9F0', underlineColor: 'transparent'},
                }}
              />
            </View>
          ) : null}
        </View>
        {/* ----- [SET LOADING PAGE] ----- */}
        {loading && <Loading />}
        {/* ----- [SET LOADING PAGE] ----- */}
      </ScrollView>
      <TouchableOpacity onPress={addNewProduct}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#0956C6', '#0879D8', '#07A9F0']}
          style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 14, textAlign: 'center', color: 'white'}}>
            TAMBAH
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

export default formTambahProduk;
