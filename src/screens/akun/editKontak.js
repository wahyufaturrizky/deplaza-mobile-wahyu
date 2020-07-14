import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage'
import {Picker} from '@react-native-community/picker'
import LinearGradient from 'react-native-linear-gradient'

import Loading from '../../components/loading'

import {URL, formatRupiah} from '../../utils/global'

function editKontak(props) {
    const [fullname,setFullName] = useState(props.fullname)
    const [phone,setPhone] = useState(props.phone)
    const [alamat,setAlamat] = useState("")
    const [email,setEmail] = useState(props.email)
    const [pos,setPos] = useState("")

    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [subdistricts, setSubdistrict] = useState([])

    const [provinsi, setProvinsi] = useState("kosong");
    const [kecamatan, setKecamatan] = useState("kosong");
    const [kota, setKota] = useState("kosong");

    const [provinsiDetail, setProvinsiDetail] = useState({})
    const [kotaDetail, setKotaDetail] = useState({})
    const [kecamatanDetail, setKecamatanDetail] = useState({})

    const [loading, setLoading] = useState(true)


    const { height, width } = Dimensions.get("window");
    
    const urlProvinces = URL+'v1/shipment/provinces'
    const urlCities = URL+'v1/shipment/city/province/'
    const urlKecamatan = URL+'v1/shipment/subdistrict/city/'
    const urlProvincesDetail = URL+'v1/shipment/province/'
    const urlKotaDetail = URL+'v1/shipment/city/'
    const urlUpdateUser = URL+'v1/user/'

    // let data = props.data
    console.log(props)

    useEffect(() => {
        getProvinsi()
    },[])

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
                // if(priceBasic>0){
                    setLoading(false)
                // }
                // console.log(responseData.rajaongkir.results)
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
                        
                        setLoading(false)
                    })
            })
    }

    // Fungsi untuk get data kota
    const updateAkun = async() => {
        setLoading(true)
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }
        
        var formdata = new FormData();
        formdata.append("username", email);
        formdata.append("fullname", fullname);
        formdata.append("email", email);
        formdata.append("phone", phone);
        formdata.append("avatar", "Screenshot from 2020-06-20 17-45-54.png");
        formdata.append("_method", "put");

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(urlUpdateUser+data.id, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    
    return (
    <View style={{flex:1}}>
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
                        <Picker.Item key={i} label={city.city_name} value={city.city_id} />
                    ))}
                </Picker>
            </View>

            <TextInput
                label='Kode Pos'
                value={pos}
                mode = "outlined"
                onChangeText={(val)=> setPos(val)}
                style={{width:'90%', alignSelf:'center',  backgroundColor:'white', borderRadius:10, marginBottom:height*0.01}}
                theme={{colors: {primary: '#07A9F0', underlineColor: 'transparent'}}}
            />


        </View>
        {loading &&
            <Loading />
        }

        <TouchableOpacity onPress={updateAkun}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                style={{borderRadius:10, padding:8,justifyContent:'center', alignItems:'center'}}
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