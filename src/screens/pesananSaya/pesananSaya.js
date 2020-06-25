import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import Appbar from '../../components/appbarHome'
import BottomTab from '../../components/bottomTab'
import { Title } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

function produk(props) {
    const [products, setProducts] = useState([])
    let halaman = props.route.params.title

    const { height, width } = Dimensions.get("window");
    const urlProduk = "http://rest-api.deplaza.id/v1/product"

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

        // fetch(urlProduk, {headers})
        //     .then(response => response.json())
        //     .then(responseData => {
        //         setProducts(responseData.data)
                // console.log(JSON.parse(products[3].variation).color)
                // let image = JSON.parse(responseData.data.brand)
                // console.log(image)
            // })
    }


    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Appbar params={props}/>

            <ScrollView style={{flex:1, marginTop:10}}>

                {/* {products.map((product, index) => (
                
                <View key={product.id} style={{flexDirection:'row', marginVertical:10, height:height*0.15, justifyContent:'space-between', borderWidth: 1, borderColor: '#ddd', width:'90%', paddingRight:5, alignSelf:'center', borderRadius:20, borderLeftWidth:0}}>
                    <View style={{width:'30%'}}>
                        <ImageBackground source={require('../../assets/images/ex-produk.png')} resizeMode="cover" style={{height:'100%', justifyContent:'flex-start', alignItems:'center', padding:5, width:'100%', borderRadius:10}}>
                            <View style={{padding:5, backgroundColor:'white', borderWidth:1, borderColor:'black'}}>
                                <Text>#ID495993635</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    
                    <View style={{width:'68%'}}>
                        <Title style={{fontSize:16, lineHeight:18}}>{product.name}</Title>
                        <View style={{flexDirection:'row', alignItems:'center', marginBottom:height*0.01}}>
                            <View style={{width:'60%'}}>
                                <Text style={{fontSize:14}}>Rp. 70.000 - Ayu</Text>
                                <Text style={{color:'#949494'}}>COD Margin Rp. 8000</Text>
                            </View>
                            <View style={{width:'30%', borderWidth:1, borderColor:'green', padding:5, borderRadius:20}}>
                                <Text style={{textAlign:'center', fontSize:12, color:'green'}}>Pembayaran Sudah di Konfirmasi</Text>
                            </View>
                        </View>
                        
                        <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:10, paddingBottom:20}}>
                            <View style={{justifyContent:'space-around', width:'50%'}}>
                                <Text style={{fontSize:14}}>JNE JN534120N101</Text>
                                <Text style={{fontSize:14, color:'red'}}>Resi Belum di Input</Text>
                                <Text style={{color:'#949494'}}>15 May, 09:15pm</Text>
                            </View>
                            <TouchableOpacity style={{width:'38%'}}  onPress={() => detailProduk(product.id)}>
                                <Text style={{color:'#07A9F0'}}>Cek Pesanan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                ))} */}

                <View style={{flexDirection:'row', marginVertical:10, height:height*0.25, justifyContent:'space-between', borderWidth: 1, borderColor: '#ddd', width:'90%', paddingRight:5, alignSelf:'center', borderRadius:20, borderLeftWidth:0}}>
                    <View style={{width:width*0.35}}>
                        <ImageBackground source={require('../../assets/images/ex-produk.png')} resizeMode="cover" style={{height:'100%', justifyContent:'flex-start', alignItems:'center', paddingTop:5, width:'100%', borderRadius:10}}>
                            <View style={{padding:5, backgroundColor:'white', borderWidth:1, borderColor:'black'}}>
                                <Text>#ID495993635</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    
                    <View style={{width:width*0.50}}>
                        <Title style={{fontSize:16, lineHeight:18}}>Topi Anti Corona/Pelindung Wajah</Title>
                        <View style={{flexDirection:'row', alignItems:'center', marginBottom:height*0.01}}>
                            <View style={{width:'60%'}}>
                                <Text style={{fontSize:14}}>Rp. 70.000 - Ayu</Text>
                                <Text style={{color:'#949494'}}>COD Margin Rp. 8000</Text>
                            </View>
                            <View style={{width:'30%', borderWidth:1, borderColor:'green', padding:5, borderRadius:10}}>
                                <Text style={{textAlign:'center', fontSize:8, color:'green'}}>Pembayaran Sudah di Konfirmasi</Text>
                            </View>
                        </View>
                        
                        <View style={{borderTopWidth:1, borderColor:'#D5D5D5'}}></View>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:10, paddingBottom:20}}>
                            <View style={{justifyContent:'space-around', width:'50%'}}>
                                <Text style={{fontSize:10}}>JNE JN534120N101</Text>
                                {/* <Text style={{fontSize:14, color:'red'}}>Resi Belum di Input</Text> */}
                                <Text style={{color:'#949494', fontSize:10}}>15 May, 09:15pm</Text>
                            </View>
                            <TouchableOpacity style={{width:'40%'}}  onPress={() => detailProduk("1")}>
                                <Text style={{color:'#07A9F0', fontSize:12}}>Cek Pesanan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                

            </ScrollView>

            <BottomTab/>

        </View>
    );
}

export default produk;
