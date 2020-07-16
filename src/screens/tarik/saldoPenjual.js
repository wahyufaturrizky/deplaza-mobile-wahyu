import React, {useState, useEffect} from 'react';
import { View, Text, Dimensions, Image } from 'react-native'
import {URL, formatRupiah} from '../../utils/global'
import AsyncStorage from '@react-native-community/async-storage'

import Appbar from '../../components/appbarHome'
import BottomTab from '../../components/bottomTab'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../../components/loading'

function saldoPenjual(props) {
    const [saldo, setSaldo] = useState("0")
    const [loading,setLoading] = useState(true)

    const { height, width } = Dimensions.get("window");
    const urlSaldo = URL+"v1/saldo/my" 


    useEffect(() => {
        getSaldo()
    }, [])

    const gotoPenarikan = () => {
        props.navigation.navigate('Penarikan',{title:"Penarikan"})      
    }

    const gotoPembayaran = () => {
        props.navigation.navigate("Transaksi", {title:"Transaksi Saya"})
    }

    const getSaldo = async() => {
        setLoading(true)
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlSaldo, {headers})
            .then(response => response.json())
            .then(responseData => {
                setLoading(false)
                setSaldo(responseData.data)
                console.log(responseData.data)
            })
            .catch(e => console.log(e))
    }

    return (
        <View style={{flex:1}}>
            <Appbar params={props}/>
            <View style={{justifyContent:'center', alignItems:'center', padding:30, backgroundColor:'#93DCFC'}}>
                <Text style={{marginBottom:height*0.01}}>Saldo</Text>
                <Text style={{marginBottom:height*0.01, fontSize:width*0.05, fontWeight:'bold', color:'#0A56C3'}}>Rp. {formatRupiah(saldo)}</Text>
            </View>

            <View style={{flex:1, flexDirection:'row', justifyContent:'space-around', padding:15}}>
                <View style={{backgroundColor:'white', padding:20, width:width*0.4, height:height*0.18}}>
                    <TouchableOpacity onPress={gotoPenarikan} style={{justifyContent:'center', alignItems:'center'}}>
                        <Image 
                            source={require('../../assets/images/penarikan.png')}
                            style={{width:width*0.15, height:width*0.2,marginBottom:height*0.01}}
                        />
                        <Text>Penarikan</Text>
                    </TouchableOpacity>
                </View>

                <View style={{backgroundColor:'white', padding:20, width:width*0.4, height:height*0.18}}>
                    <TouchableOpacity onPress={gotoPembayaran} style={{justifyContent:'center', alignItems:'center'}}>
                        <Image 
                            source={require('../../assets/images/transaksi.png')}
                            style={{width:width*0.2,height:width*0.2,marginBottom:height*0.01}}
                        />
                        <Text>Transaksi</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {loading &&
                <Loading/>
            }
        </View>
    );
}

export default saldoPenjual;