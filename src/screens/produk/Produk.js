/* eslint-disable */

import React, {useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import BottomTab from '../../components/bottomTab'
import { Title, Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import {URL, formatRupiah} from '../../utils/global'
import Loading from '../../components/loading'
import InputNormal from '../../components/inputNormal';

function produk(props) {
    
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [any, setAny] = useState(true)
    const [search, setSearch] = useState(false)

    // Untuk Dapetin lagi di page mana
    let halaman = props.route.params.title

    const { height, width } = Dimensions.get("window");
    const urlProduk = URL+"v1/product" 

    useEffect(() => {
        if(halaman=="Cari Produk"){
            searchProduk(props.route.params.search)
        }else{
            getProduct()
        }
    },[])

    //Pergi ke Hal List Produk
    const detailProduk = (id,name) => {
        props.navigation.navigate('ProdukDetail',{id, title:name})      
    }

    const gotoWishlist = () => {
        props.navigation.navigate("Wishlist", {title:"Produk Saya"})
    }

    const getProduct = async() => {
        setLoading(true)
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)
        let param =""

        if(halaman==="Komisi Terbesar"){
            param = "&order_by=price_commission&order_direction=desc"
        }else if(props.route.params.idKategori != null){
            param = "&category="+props.route.params.idKategori
        }else if(halaman==="Paling Disukai"){
            param = "&order_by=wishlist_qty&order_direction=desc"
        }else{
            param = ""
        }

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlProduk+"?limit=10&offset=0"+param, {headers})
            .then(response => response.json())
            .then(async(responseData) => {
                await setProducts(responseData.data)
                console.log(products.data)
                setPage(1)
                setLoading(false)
            })
            .catch(e => console.log(e))
    }

    const loadMore = async(hal) => {
        setLoading(true)
        
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let pageNow = hal
        let param =""

        let off = 10*pageNow

        if(halaman==="Komisi Terbesar"){
            param = "&order_by=price_commission&order_direction=desc"
        }else if(props.route.params.idKategori != null){
            param = "&category="+props.route.params.idKategori
        }else{
            param = ""
        }

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlProduk+"?limit=10&offset="+off+""+param, {headers})
            .then(response => response.json())
            .then(async(responseData) => {
                await setProducts(products.concat(responseData.data))
                setPage(pageNow++)
                setLoading(false)
                setLoad(true)
                if(responseData.data.length == 0){
                    setAny(false)
                }
                
            })
            .catch(e => console.log(e))
    }

    const OpenSearchTrigger = async() => {
        setSearch(true)
    }

    const CloseSearchTrigger = async() => {
        setSearch(false)
        getProduct()
    }

    const searchProduk = async(search) => {
        setLoading(true)
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)
        let param =""

        if(halaman==="Komisi Terbesar"){
            param += "&order_by=price_commission&order_direction=desc"
        }else if(props.route.params.idKategori != null){
            param += "&category="+props.route.params.idKategori
        }else if(halaman==="Paling Disukai"){
            param += "&order_by=wishlist_qty&order_direction=desc"
        }else{
            param += ""
        }
        param +="&keyword="+search

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlProduk+"?limit=10&offset="+page+""+param, {headers})
            .then(response => response.json())
            .then(async(responseData) => {
                await setProducts(responseData.data)
                setPage(2)
                setLoading(false)
            })
            .catch(e => console.log(e))
    }

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            

            <Appbar.Header style={[styles.shadow,{backgroundColor:'white', width:'100%', height: 70}]}>

                    <Appbar.BackAction onPress={() => {props.navigation.goBack()}} />

                   

                    {search ?
                        <View style={{borderBottomColor:'gray', borderBottomWidth:1, width:width*0.4}}>
                            <InputNormal
                                placeholder="Cari Produk"
                                onChangeText={(val) => searchProduk(val)}
                                
                            />
                        </View>
                    :
                        <Text>{halaman}</Text>
                    }

                    <Appbar.Content/>

                    <View style={{flexDirection:'row'}}>
                        {search ?
                            <TouchableOpacity onPress={CloseSearchTrigger}>
                                <Appbar.Action size={30} icon="close"/>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity onPress={OpenSearchTrigger}>
                                <Appbar.Action size={30} icon="magnify"/>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity onPress={gotoWishlist}>
                            <Appbar.Action size={30} icon="heart"/>
                        </TouchableOpacity>
                    </View>

            </Appbar.Header>

            <ScrollView style={{flex:1, marginTop:10}}>
                
                {
                products.map((product, index) => {
                    
                return (
                
                <View key={product.id} style={{flexDirection:'row', marginVertical:10, height:height*0.18, justifyContent:'space-between', borderWidth: 1, borderColor: '#ddd', width:'90%', paddingRight:5, alignSelf:'center', borderRadius:20, borderLeftWidth:0}}>
                   
                        <Image
                            source={{uri : product.images[0].image_url}}
                            style={{height:'100%', width:'30%', borderRadius:10}}
                        />
                    
                    <View style={{width:'68%'}}>
                        <Title style={{fontSize:14, lineHeight:18}}>{product.name}</Title>
                        <Text style={{fontSize:14, marginBottom:height*0.01}}>Mulai Dari Rp {formatRupiah(product.price_basic)}</Text>
                        <Text style={{color:'#949494', fontSize:12}}>Stok {product.stock}</Text>
                        <TouchableOpacity style={{alignItems:'flex-end', justifyContent:'flex-end', flex:1, paddingVertical:10}}  onPress={() => detailProduk(product.id, product.name)}>
                            <Text style={{color:'#07A9F0'}}>Lihat Produk</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                )
                })}

                {any ?
                    <TouchableOpacity style={{justifyContent:'center', alignItems:'center', width:'100%',}} onPress={() => loadMore(page+1)}>
                        <Text>Produk Selanjutnya</Text>
                    </TouchableOpacity>
                :
                    <Text style={{textAlign:'center'}}>Tidak Ada Produk lagi</Text>
                }

            </ScrollView>

            {loading &&
                <Loading/>
            }

            <BottomTab {...props}/>

        </View>
    );
}

export default produk;

const styles=StyleSheet.create({
    shadow : {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    }
})
