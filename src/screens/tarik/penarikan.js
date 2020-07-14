import React,{useState} from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-community/async-storage'

import Appbar from '../../components/appbarHome'
import {URL} from '../../utils/global'
import Loading from '../../components/loading'

function penarikan(props) {
    const [check, setCheck] = useState(false);
    const [ammount, setAmmount] = useState("");
    const [loading,setLoading] = useState(false)


    const { height, width } = Dimensions.get("window");
    const urlSaldo = URL+"v1/withdrawal" 

    const postWithDraw = async() => {
        setLoading(true)
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        var formdata = new FormData();
        formdata.append("account_id", data.id);
        formdata.append("amount", ammount);

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        var requestOptions = {
            headers,
            method: 'POST',
            body: formdata,
        };

        fetch(URL+"/v1/withdrawal", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setLoading(false)
                alert("Penarikan Dana Berhasil")
            })
            .catch(error => console.log('error', error));
    }

    return (
        <View style={{flex:1}}>
            <Appbar params={props}/>

            <View style={{flex:1}}>
                <View style={{width:'90%', alignSelf:'center', marginVertical:height*0.01}}>
                    <Text>Tarik Saldo dari Saldo Penjual Ke</Text>
                </View>

                <View style={{backgroundColor:'white'}}>
                    <View style={{width:'90%', alignSelf:'center', marginVertical:height*0.01, justifyContent:'space-between', flexDirection:'row'}}>
                        <View>
                            <Image 
                                source={require('../../assets/images/Logo_BCA.png')}
                                style={{width:width*0.12, height:width*0.05, resizeMode:'stretch'}}
                                width={width*0.12}
                                height={width*0.05}
                            />
                            <Text>Bank BCA</Text>
                        </View>
                        <Text>20202033</Text>
                    </View>
                </View>

                <View style={{width:'90%', alignSelf:'center', marginVertical:height*0.01}}>
                    <Text>Jumlah Penarikan Dana</Text>
                </View>

                <View style={{backgroundColor:'white'}}>
                    <View style={{width:'90%', alignSelf:'center', flexDirection:'row', alignItems:'center', marginVertical:height*0.01}}>
                        <Text style={{fontSize:24}}>Rp.</Text>
                        <TextInput
                            placeholder={"0"}
                            value={ammount}
                            onChangeText={(val) => setAmmount(val)}
                            style={{fontSize:24}}
                        />
                    </View>
                    <View style={{borderTopWidth:1, borderColor:'#D5D5D5', marginVertical:height*0.01}}></View>
                    {/* <View style={{width:'90%', alignSelf:'center', flexDirection:'row', alignItems:'center', marginVertical:height*0.01}}>
                        <Checkbox
                            status={check ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setCheck(!check);
                            }}
                        />
                        <Text> Saya Setuju untuk Mengembalikan Sesuai Kondisi Semula.</Text>
                    </View> */}
                </View>

                <View style={{backgroundColor:'white', marginTop:height*0.01}}>
                    <View style={{width:'90%', alignSelf:'center', marginVertical:height*0.01, flexDirection:'row', justifyContent:'space-between'}}>
                        <View>
                            <Text>Biaya Penarikan Dana</Text>
                            <Text style={{fontSize:10, color:'gray'}}>Diterapkan ke Penarikan Dana yang Sukses</Text>
                        </View>
                        <Text>Tanpa Biaya</Text>
                    </View>
                    <View style={{borderTopWidth:1, borderColor:'#D5D5D5', marginVertical:height*0.01}}></View>
                </View>

                <View style={{width:'90%', alignSelf:'center', marginVertical:height*0.01}}>
                    <Text>Jumlah Transfer ke Bank</Text>
                </View>
                
                <View style={{backgroundColor:'#E0F5FE',}}>
                    <View style={{width:'90%', alignSelf:'center', flexDirection:'row', flexWrap:'wrap', alignItems:'center', marginVertical:height*0.01}}>
                        <Icon name="alert" size={20} color="#07A9F0" />
                        <Text> Kamu hanya dapat melakukan penarikan 1x/hari</Text>
                    </View> 
                </View>
            </View>

            {loading &&
                <Loading/>
            }

            <TouchableOpacity  onPress={() => postWithDraw()}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                    style={{padding:15, flexDirection:"row", justifyContent:'center', alignItems:'center'}}
                >
                    <Text style={{fontSize:18, textAlign:'center', color:'white'}}>
                        Tarik Dana
                    </Text>
                </LinearGradient>
            </TouchableOpacity>

        </View>
    );
}

export default penarikan;