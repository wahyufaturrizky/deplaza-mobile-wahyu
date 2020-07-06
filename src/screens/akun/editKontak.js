import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, Picker } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage'

import Loading from '../../components/loading'

import {URL, formatRupiah} from '../../utils/global'

function editKontak(props) {
    const [fullname,setFullName] = useState("")
    const [phone,setPhone] = useState("")
    const [alamat,setAlamat] = useState("")
    const [email,setEmail] = useState("")
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
                console.log(responseData.rajaongkir.results)
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
    
    return (
    <View>
        <View style={{padding:15}}>
            <TextInput
                label='Nama Lengkap'
                value={fullname}
                mode = "outlined"
                onChangeText={(val)=> setFullName(val)}
                style={{width:'90%', alignSelf:'center',  backgroundColor:'white', borderRadius:10, marginBottom:height*0.01}}
            /> 

            <TextInput
                label='Nomor HP'
                value={phone}
                mode = "outlined"
                onChangeText={(val)=> setPhone(val)}
                style={{width:'90%', alignSelf:'center',  backgroundColor:'white', borderRadius:10, marginBottom:height*0.01}}
            />

            <TextInput
                label='Email'
                value={email}
                mode = "outlined"
                onChangeText={(val)=> setEmail(val)}
                style={{width:'90%', alignSelf:'center',  backgroundColor:'white', borderRadius:10, marginBottom:height*0.01}}
            />

            <TextInput
                label='Alamat'
                value={alamat}
                multiline={true}
                mode = "outlined"
                onChangeText={(val)=> setAlamat(val)}
                style={{width:'90%', alignSelf:'center',  backgroundColor:'white', borderRadius:10, marginBottom:height*0.01}}
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
            />


        </View>
        {loading &&
            <Loading />
        }
    </View>
    );
}

export default editKontak;