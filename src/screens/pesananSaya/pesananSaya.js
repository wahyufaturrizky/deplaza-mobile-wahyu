/* eslint-disable */

import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import moment from "moment";
import Appbar from '../../components/appbarHome'
import BottomTab from '../../components/bottomTab'
import { Title } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import {URL, formatRupiah} from '../../utils/global'
import Loading from '../../components/loading'

function produk(props) {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    let halaman = props.route.params.title

    const { height, width } = Dimensions.get("window");
    const urlOrder = URL+"/v1/orders/my-order?details=1"
    

    useEffect(() => {
        getProduct()
    },[])

    //Pergi ke Hal List Produk
    const detailProduk = (id) => {
        props.navigation.navigate('RincianPesanan',{id, title:'Rincian Pesanan'})      
    }

    const getProduct = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)


        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        console.log(data.token)

        fetch(urlOrder, {headers})
            .then(response => response.json())
            .then(responseData => {
                setOrders(responseData.data)
                setLoading(false)
                
            })
    }

    let computedSales = orders.map(x => {
        const object = Object.assign({ ...x }, x.details);
        return object
    })

console.log(computedSales[0]);
    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Appbar params={props}/>

            <ScrollView style={{flex:1, marginTop:10}}>

                {computedSales.reverse().map((data, index) => 
                    <View key={index} style={{flexDirection:'row', marginVertical:10, height:height*0.2, justifyContent:'space-between', borderWidth: 1, borderColor: '#ddd', width:'90%', paddingRight:5, alignSelf:'center', borderRadius:20, borderLeftWidth:0}}>
                        <View style={{width:width*0.35, height:height*0.2}}>
                                <View style={{height:height*0.2}}>
                                    <ImageBackground source={{uri: data.details[0].product && data.details[0].product.images[0].image_url}} resizeMode="stretch" style={{height:height*0.2, justifyContent:'flex-start', alignItems:'center', paddingTop:5, width:'100%', borderRadius:10}}>
                                        <View style={{padding:5, backgroundColor:'white', borderWidth:1, borderColor:'black'}}>
                                            <Text style={{fontSize:10}}>{data.invoice}</Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                        </View>
                        
                        <View style={{width:width*0.50}}>
                            <Title style={{fontSize:14, lineHeight:18}}>{data.details[0].product && data.details[0].product.name}</Title>
                            <View style={{flexDirection:'row', alignItems:'center', marginBottom:height*0.01}}>
                                <View style={{width:'60%'}}>
                                    <Text style={{fontSize:14}}>Rp. {formatRupiah( data.details[0] && data[0].benefit+data[0].commission+data[0].custom_commission+data[0].discount+data[0].price+data.delivery.sipping_cost)}</Text>
                                    <Text style={{color:'#949494', fontSize:10}}>Margin Rp. {formatRupiah(data.total_commission)}</Text>
                                </View>
                                <View style={{width:'30%', borderWidth:1, borderColor:(data.payment.status_label=="Blm Dibayar" || data.payment.status_label=="Ditolak") ? 'red' :'green', padding:5, borderRadius:10}}>
                                    <Text style={{textAlign:'center', fontSize:8, color:(data.payment.status_label=="Blm Dibayar" || data.payment.status_label=="Ditolak") ? 'red' :'green'}}>{data.status_label}</Text>
                                </View>
                            </View>
                            
                            <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>
                            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:10, paddingBottom:20}}>
                                <View style={{justifyContent:'space-around', width:'40%'}}>
                                    {data.delivery.tracking_id !="" ?
                                        <Text style={{fontSize:8}}>{data.delivery.tracking_id}</Text>
                                    :
                                        <Text style={{fontSize:8, color:'red'}}>Resi Belum di Input</Text>
                                    }
                                    <Text style={{color:'#949494', fontSize:10}}>{moment(data.created_at).format("MMMM D, YYYY")}</Text>
                                </View>
                                <TouchableOpacity style={{width:'50%'}}  onPress={() => detailProduk(data.id)}>
                                    <Text style={{color:'#07A9F0', fontSize:10}}>Cek Resi dan Lacak</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}

            </ScrollView>

            {loading &&
                <Loading/>
            }

            <BottomTab {...props}/>

        </View>
    );
}

export default produk;
