import React, {useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import Appbar from '../../components/appbarHome'
import BottomTab from '../../components/bottomTab'
import { Title, ActivityIndicator } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import {URL, formatRupiah} from '../../utils/global'
import Loading from '../../components/loading'

function produk(props) {
    
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [load, setLoad] = useState(false)
    const [any, setAny] = useState(true)

    const [color, setColor] = useState(false)

    let halaman = props.route.params.title

    const { height, width } = Dimensions.get("window");
    const urlProduk = URL+"v1/product" 
    const scrollRef = useRef(); 

    useEffect(() => {
        getProduct()
    },[])

    //Pergi ke Hal List Produk
    const detailProduk = (id,name) => {
        props.navigation.navigate('ProdukDetail',{id, title:name})      
    }

    const getProduct = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)
        let param =""

        if(halaman==="Komisi Terbesar"){
            param = "&order_by=price_commission&order_direction=desc"
        }else if(props.route.params.idKategori != null){
            param = "&category="+props.route.params.idKategori
        }else{
            param = ""
        }

        console.log(urlProduk+"?limit=10&offset="+page+""+param)
        // console.log(props.route.params.idKategori)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlProduk+"?limit=10&offset="+page+""+param, {headers})
            .then(response => response.json())
            .then(async(responseData) => {
                await setProducts(responseData.data)
                // setColor
                console.log(products.data)
                setPage(2)
                setLoad(true)
                setLoading(false)
            })
            .catch(e => console.log(e))
    }

    const loadMore = async(hal) => {
        setLoading(true)
        setLoad(false)

        // scrollRef.current?.scrollTo({
        //     y: 0,
        //     animated: true,
        // });
        
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

        console.log(urlProduk+"?limit=10&offset="+off+""+param)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlProduk+"?limit=10&offset="+off+""+param, {headers})
            .then(response => response.json())
            .then(async(responseData) => {

                await setProducts(products.concat(responseData.data))

                // await setProducts([...products, responseData.data])
                // setColor
                console.log(products)
                setPage(pageNow++)
                setLoading(false)
                setLoad(true)
                if(responseData.data.length == 0){
                    setAny(false)
                }
                
            })
            .catch(e => console.log(e))
    }

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            
            <Appbar params={props}/>

            <ScrollView style={{flex:1, marginTop:10}}>
                
                {
                products.map((product, index) => {
                    
                return (
                
                <View key={product.id} style={{flexDirection:'row', marginVertical:10, height:height*0.18, justifyContent:'space-between', borderWidth: 1, borderColor: '#ddd', width:'90%', paddingRight:5, alignSelf:'center', borderRadius:20, borderLeftWidth:0}}>
                   
                        <Image
                            // source={require('../../assets/images/ex-produk.png')}
                            source={{uri : product.images[0].image_url}}
                            style={{height:'100%', width:'30%', borderRadius:10}}
                        />
                    
                    <View style={{width:'68%'}}>
                        <Title style={{fontSize:14, lineHeight:18}}>{product.name}</Title>
                        <Text style={{fontSize:14, marginBottom:height*0.01}}>Mulai Dari Rp {formatRupiah(product.price_basic)}</Text>
                        <Text style={{color:'#949494', fontSize:10}}>Stok {product.stock}</Text>
                        <TouchableOpacity style={{alignItems:'flex-end', justifyContent:'flex-end', flex:1, paddingVertical:10}}  onPress={() => detailProduk(product.id, product.name)}>
                            <Text style={{color:'#07A9F0'}}>Lihat Produk</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                )
                })}

                {/* <TouchableOpacity style={{justifyContent:'center', alignItems:'center', width:'100%',}} onPress={loadMore}>
                    <Text>Load More</Text>
                </TouchableOpacity> */}
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
