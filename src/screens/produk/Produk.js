import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import Appbar from '../../components/appbarHome'
import BottomTab from '../../components/bottomTab'
import { Title } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

function produk(props) {
    const [products, setProducts] = useState([])

    const { height, width } = Dimensions.get("window");
    const urlProduk = "http://rest-api.deplaza.id/v1/products"

    useEffect(() => {
        getProduct()
    },[])

    //Pergi ke Hal List Produk
    const detailProduk = (id) => {
        props.navigation.navigate('ProdukDetail',{id, title:'Lihat Produk'})      
    }

    const getProduct = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlProduk, {headers})
            .then(response => response.json())
            .then(responseData => {
                setProducts(responseData.data)
                // let image = responseData.data[1].variation
                // console.log(image)
            })
    }


    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Appbar params={props}/>

            <ScrollView style={{flex:1, marginTop:10}}>

                {products.map((product, index) => (
                
                <View key={product.id} style={{flexDirection:'row', marginVertical:10, justifyContent:'space-between', borderWidth: 1, borderColor: '#ddd', width:'90%', paddingRight:5, alignSelf:'center', borderRadius:20, borderLeftWidth:0}}>
                    <Image
                        source={require('../../assets/images/ex-produk.png')}
                        // source={{uri:product.images}}
                        style={{height:'100%', width:'30%', borderRadius:10}}
                    />
                    <View style={{width:'68%'}}>
                        <Title style={{fontSize:16, lineHeight:18}}>{product.name}</Title>
                        <Text style={{fontSize:14}}>Mulai Dari Rp {product.price_basic}</Text>
                        <Text style={{color:'#949494'}}>Stok = {product.stock}</Text>
                        <Text style={{color:'#949494'}}>Varian Warna</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10, paddingBottom:20}}>
                            <View style={{flexDirection:'row', justifyContent:'space-around', width:'50%'}}>
                                { product.variation != "ssss" && product.variation != "json variation" ? JSON.parse(products[index].variation).color.map((color,i) => (
                                    <View key={i} style={{width:width*0.05, height:height*0.03, backgroundColor: color}}></View>
                                )) : 
                                    <View></View>
                                }
                            </View>
                            <TouchableOpacity style={{width:'38%'}}  onPress={() => detailProduk(product.id)}>
                                <Text style={{color:'#07A9F0'}}>Lihat Produk</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                ))}

                

            </ScrollView>

            <BottomTab/>

        </View>
    );
}

export default produk;
