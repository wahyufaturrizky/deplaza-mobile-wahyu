import React,{useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'
import Loading from '../../components/loading'
import { ScrollView } from 'react-native-gesture-handler';
import { Title, ActivityIndicator } from 'react-native-paper';

import Appbar from '../../components/appbarHome'
import BottomTab from '../../components/bottomTab'

import {URL, formatRupiah} from '../../utils/global'

function wishlist(props) {
    const [wishlist, setWishlist] = useState([])
    const [gambar, setGambar] = useState(false)
    const [loading, setLoading] = useState(true)
    
    const { height, width } = Dimensions.get("window");
    const urlWishlist = URL+"v1/wishlist/me" 

    useEffect(() => {
        getWishlist()
    },[])

    const getWishlist = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlWishlist, {headers})
            .then(response => response.json())
            .then(responseData => {
                setWishlist(responseData.data)
                // setColor
                setLoading(false)
            })
            .catch(e => console.log(e))
    }

    //Pergi ke Hal List Produk
    const detailProduk = (id) => {
        props.navigation.navigate('ProdukDetail',{id, title:'Lihat Produk'})      
    }

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            
            <Appbar params={props}/>

            <ScrollView style={{flex:1, marginTop:10}}>
                
                {wishlist.map((data, index) => {

                return (
                
                <View key={index} style={{flexDirection:'row', marginVertical:10, justifyContent:'space-between', borderWidth: 1, borderColor: '#ddd', width:'90%', paddingRight:5, alignSelf:'center', borderRadius:20, borderLeftWidth:0}}>

                        <Image
                            // source={require('../../assets/images/ex-produk.png')}
                            source={{uri : data.product.images[0].image_url}}
                            style={{height:height*0.15, width:'30%', borderRadius:10, resizeMode:'stretch'}}
                        />
                    
                    <View style={{width:'68%'}}>
                        <Title style={{fontSize:16, lineHeight:18}}>{data.product.name}</Title>
                        <Text style={{fontSize:14}}>Mulai Dari Rp. {formatRupiah(data.product.price_basic)}</Text>
                        <Text style={{color:'#949494'}}>Stok {data.product.stock}</Text>
                        {/* { data.product.variation_data != null ?
                        <View>
                            <Text style={{color:'#949494'}}>Varian Warna</Text>
                            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10, paddingBottom:20}}>
                                <View style={{flexDirection:'row', justifyContent:'space-around', width:'50%'}}>
                                {data.variation_data.color.map((color,i) => (
                                    <View key={i} style={{backgroundColor:'white', borderWidth:1, borderColor:'gray', padding:5, marginBottom:height*0.005, borderRadius:5}}><Text>{color}</Text></View>
                                ))}
                                </View>
                                <TouchableOpacity style={{width:'38%'}}  onPress={() => detailProduk(product.id)}>
                                    <Text style={{color:'#07A9F0'}}>Lihat Produk</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :  */}
                            <TouchableOpacity style={{width:'38%', paddingVertical:10}}  onPress={() => detailProduk(data.product.id)}>
                                <Text style={{color:'#07A9F0'}}>Lihat Produk</Text>
                            </TouchableOpacity>
                        {/* } */}
                    </View>
                </View>

                )
                })}

            </ScrollView>
            {loading &&
                <Loading/>
            }

            <BottomTab {...props}/>

        </View>
    );
}

export default wishlist;