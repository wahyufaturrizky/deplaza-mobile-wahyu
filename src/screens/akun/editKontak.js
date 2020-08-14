/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage'
import {Picker} from '@react-native-community/picker'
import LinearGradient from 'react-native-linear-gradient'

import Loading from '../../components/loading'

import {URL} from '../../utils/global'

function editKontak(props) {
    const [fullname,setFullName] = useState("")
    const [phone,setPhone] = useState("")
    const [alamat,setAlamat] = useState("")
    const [email,setEmail] = useState("")
    const [pos,setPos] = useState("")
    const [allAlamat,setAllAlamat] = useState([])

    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [subdistricts, setSubdistrict] = useState([])

    const [provinsi, setProvinsi] = useState("kosong");
    const [kota, setKota] = useState("kosong");

    const [provinsiDetail, setProvinsiDetail] = useState({})
    const [kotaDetail, setKotaDetail] = useState({})

    const [loading, setLoading] = useState(true)


    const { height, width } = Dimensions.get("window");
    
    const urlProvinces = URL+'v1/shipment/provinces'
    const urlCities = URL+'v1/shipment/city/province/'
    const urlKecamatan = URL+'v1/shipment/subdistrict/city/'
    const urlProvincesDetail = URL+'v1/shipment/province/'
    const urlKotaDetail = URL+'v1/shipment/city/'
    const urlUpdateUser = URL+'v1/user/'
    const urlUpdateAddress = URL+'v1/address'
    const urlGetAddress = URL+'v1/address/me'
    const urlProfile = URL+'v1/my-profile'
    
    useEffect(() => {
        getProvinsi()
        getAlamat()
        getProfile()
    },[])

    const getProfile = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlProfile, {headers})
            .then(response => response.json())
            .then(async(responseData) => {
                setFullName(responseData.data.fullname)
                setPhone(responseData.data.phone)
                setEmail(responseData.data.email)
            })
    }

    const getAlamat = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlGetAddress, {headers})
            .then(response => response.json())
            .then(async(responseData) => {
                let data = responseData.data
                data.reverse()
                await setAllAlamat(data[0])
                setAlamat(data[0].address)
                setKota(data[0].city_id)
                setProvinsi(data[0].prov_id)
                setPos(data[0].zip_code)
                console.log(data[0].zip_code)
            })
    }

    // Fungsi untuk get data provinsi
    const getProvinsi = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlProvinces, {headers})
            .then(response => response.json())
            .then(async(responseData) => {
                await setProvinces(responseData.rajaongkir.results)
                    setLoading(false)
            })
    }

    // Fungsi untuk get data kota
    const getKota = async(id_prov) => {
        setLoading(true)
        setProvinsi(id_prov)
        console.log(id_prov)

        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlCities+id_prov, {headers})
            .then(response => response.json())
            .then(async(responseData) => {
                await setCities(responseData.rajaongkir.results)

                fetch(urlProvincesDetail+id_prov, {headers})
                    .then(response => response.json())
                    .then(async(responseData) => {
                        await setProvinsiDetail(responseData.rajaongkir.results)
                        console.log("Provinsi Detail" , responseData.rajaongkir.results)
                        setLoading(false)
                    })
            })
    }

    // Fungsi untuk get data kota
    const getKecamatan = async(id_kota) => {
        setLoading(true)
        setKota(id_kota)
        console.log(id_kota)

        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlKecamatan+id_kota, {headers})
            .then(response => response.json())
            .then(async(responseData) => {
                await setSubdistrict(responseData.rajaongkir.results)
                
                fetch(urlKotaDetail+id_kota, {headers})
                    .then(response => response.json())
                    .then(async(responseData) => {
                        await setKotaDetail(responseData.rajaongkir.results)
                        console.log("Kota Detail" , responseData.rajaongkir.results)
                        setLoading(false)
                    })
            })
    }

    // Fungsi untuk get data kota
    const updateAkun = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type' : 'multipart/form-data'
        }
        
        var formdata = new FormData();
        formdata.append("username", email);
        formdata.append("fullname", fullname);
        formdata.append("email", email);
        formdata.append("phone", phone);
        // formdata.append("avatar", "Screenshot from 2020-06-20 17-45-54.png");
        formdata.append("_method", "put");
        console.log(urlUpdateUser+data.id)
        // Update User
        fetch(urlUpdateUser+data.id, {
            headers,
            method: 'POST',
            body: formdata,
        })
        .then(response => response.text())
        .then(result => {
            console.log(result)
            setLoading(false)
            alert("Data Berhasil Dirubah")
        })
        .catch(error => console.log('error', error));

        let formdataAddress = new FormData();
        formdataAddress.append("prov_id", provinsiDetail.province_id);
        formdataAddress.append("prov_name", provinsiDetail.province);
        formdataAddress.append("city_id", kotaDetail.city_id);
        formdataAddress.append("city_name", kotaDetail.city_name);
        formdataAddress.append("label", "Rumah");
        formdataAddress.append("receiver", fullname);
        formdataAddress.append("phone", phone);
        formdataAddress.append("address", alamat);
        formdataAddress.append("zip_code", pos);
        formdataAddress.append("is_main", 1);

        //Update Address User
        fetch(urlUpdateAddress, {
            headers,
            method: 'POST',
            body: formdataAddress,
        })
        .then(response => response.text())
        .then(result => {
            console.log(result)
        })
        .catch(error => console.log('error', error));
    }
    
    return (
        <View style={{flex:1, height: '100%'}}>
    <ScrollView>
        <View style={{padding:15, backgroundColor:'#F8F8F8', marginTop:height*0.01, flex:1}}>
            <TextInput
                label='Nama Lengkap'
                value={fullname}
                mode = "outlined"
                onChangeText={(val)=> setFullName(val)}
                style={{width:'90%', alignSelf:'center',  backgroundColor:'white', borderRadius:10, marginBottom:height*0.01}}
                theme={{colors: {primary: '#07A9F0', underlineColor: 'transparent'}}}
            /> 

            <TextInput
                label='Nomor HP'
                value={phone}
                mode = "outlined"
                onChangeText={(val)=> setPhone(val)}
                style={{width:'90%', alignSelf:'center',  backgroundColor:'white', borderRadius:10, marginBottom:height*0.01}}
                theme={{colors: {primary: '#07A9F0', underlineColor: 'transparent'}}}
            />

            <TextInput
                label='Email'
                value={email}
                mode = "outlined"
                onChangeText={(val)=> setEmail(val)}
                style={{width:'90%', alignSelf:'center',  backgroundColor:'white', borderRadius:10, marginBottom:height*0.01}}
                theme={{colors: {primary: '#07A9F0', underlineColor: 'transparent'}}}
            />

            <TextInput
                label='Alamat'
                value={alamat}
                multiline={true}
                mode = "outlined"
                onChangeText={(val)=> setAlamat(val)}
                style={{width:'90%', alignSelf:'center',  backgroundColor:'white', borderRadius:10, marginBottom:height*0.01}}
                theme={{colors: {primary: '#07A9F0', underlineColor: 'transparent'}}}
            />

            <View style={{borderWidth:1, borderColor:'gray', justifyContent:'center', width:'90%', alignSelf:'center', marginBottom:height*0.01, borderRadius:10, height:height*0.055}}>
                <Picker
                    selectedValue={provinsi}
                    onValueChange={(itemValue, itemIndex) => getKota(itemValue)}
                    style={{justifyContent:'center', alignItems:'center', }}
                >   
                        <Picker.Item label={"Pilih Provinsi"} value={"kosong"} />
                    {provinces.map((prov,i) => (
                        <Picker.Item key={i} label={prov.province} value={prov.province_id} />
                    ))}
                </Picker>
            </View>

            <View style={{borderWidth:1, borderColor:'gray', justifyContent:'center', width:'90%', alignSelf:'center', borderRadius:10, marginBottom:height*0.01, height:height*0.055}}>
                <Picker
                    selectedValue={kota}
                    onValueChange={(itemValue, itemIndex) => getKecamatan(itemValue)}
                >
                        <Picker.Item label={"Pilih Kota"} value={"kosong"} />
                    {cities.map((city,i) => (
                        <Picker.Item key={i} label={city.type+" "+city.city_name} value={city.city_id} />
                    ))}
                </Picker>
            </View>
            <TextInput
                label='Kode Pos'
                value={pos.toString()}
                mode = "outlined"
                onChangeText={(val)=> setPos(val)}
                style={{width:'90%', alignSelf:'center',  backgroundColor:'white', borderRadius:10, marginBottom:height*0.01}}
                theme={{colors: {primary: '#07A9F0', underlineColor: 'transparent'}}}
            />

        </View>
        {loading &&
            <Loading />
        }

      

    </ScrollView>
    <TouchableOpacity onPress={updateAkun}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                style={{padding:10,justifyContent:'center', alignItems:'center'}}
            >
                <Text style={{fontSize:14, textAlign:'center', color:'white'}}>
                    Simpan
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    </View>
    );
}

export default editKontak;