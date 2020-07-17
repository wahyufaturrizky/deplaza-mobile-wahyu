import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, Picker, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-community/async-storage'

import Loading from '../../components/loading'
import { URL } from '../../utils/global';

function editKontak(props) {
    const [tanggal,setTanggal] = useState("")
    const [jenisKelamin,setjenisKelamin] = useState("kosong")
    const [pendidikan,setPendidikan] = useState("")
    const [loading,setLoading] = useState(false)

    const urlUpdateUser = URL+'v1/user/'
    const urlProfile = URL+'v1/my-profile'

    const { height, width } = Dimensions.get("window");

    useEffect(() => {
        getProfile()
    },[])

    const getProfile = async() => {
        setLoading(true)
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlProfile, {headers})
            .then(response => response.json())
            .then(async(responseData) => {
                setLoading(false)
                setTanggal(responseData.data.birth_date)
                setjenisKelamin(responseData.data.gender)
                setPendidikan(responseData.data.educational_stage)
            })
    }

    const updateAkun = async() => {
        setLoading(true)
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type' : 'multipart/form-data'
        }
        
        var formdata = new FormData();
        formdata.append("birth_date", tanggal);
        formdata.append("gender", jenisKelamin);
        formdata.append("educational_stage", pendidikan);
        formdata.append("_method", "put");

        var requestOptions = {
            headers,
            method: 'POST',
            body: formdata,
        };

        fetch(urlUpdateUser+data.id, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            setLoading(false)
            alert("Data Berhasil di Update")
        })
        .catch(error => console.log('error', error));
    }
    return (
    <View style={{flex:1}}>
        <View style={{padding:15, flex:1, backgroundColor:'#F8F8F8', marginTop:height*0.02}}>

            <DatePicker
                style={{width:'90%', alignSelf:'center', backgroundColor:'white', marginBottom:height*0.02}}
                date={tanggal}
                mode="date"
                placeholder="Tanggal lahir"
                format="DD-MM-YYYY"
                maxDate="31-08-2020"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36, borderRadius:10, height:50
                },
                }}
                onDateChange={(date) => {setTanggal(date)}}
            />

            <View style={{borderWidth:1, borderColor:'gray', justifyContent:'center', width:'90%', alignSelf:'center', marginBottom:height*0.01, borderRadius:10, height:height*0.055}}>
                <Picker
                    selectedValue={jenisKelamin}
                    onValueChange={(itemValue, itemIndex) => setjenisKelamin(itemValue)}
                    style={{justifyContent:'center', alignItems:'center', }}
                >   
                        <Picker.Item label={"Pilih Jenis Kelamin"} value={"kosong"} />
                        <Picker.Item label={"Laki-Laki"} value={"Laki-Laki"} />
                        <Picker.Item label={"Perempuan"} value={"Perempuan"} />
                </Picker>
            </View>

            <View style={{borderWidth:1, borderColor:'gray', justifyContent:'center', width:'90%', alignSelf:'center', marginBottom:height*0.01, borderRadius:10, height:height*0.055}}>
                <Picker
                    selectedValue={pendidikan}
                    onValueChange={(itemValue, itemIndex) => setPendidikan(itemValue)}
                    style={{justifyContent:'center', alignItems:'center', }}
                >   
                        <Picker.Item label={"Pilih Pendidikan"} value={"kosong"} />
                        <Picker.Item label={"SMP"} value={"SMP"} />
                        <Picker.Item label={"SMA"} value={"SMA"} />
                        <Picker.Item label={"Kuliah"} value={"Kuliah"} />
                </Picker>
            </View>

            {loading &&
                <Loading />
            }

        </View>

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