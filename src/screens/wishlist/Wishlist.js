/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'
import Loading from '../../components/loading'
import { ScrollView } from 'react-native-gesture-handler';
import { Title, Appbar } from 'react-native-paper';

// import Appbar from '../../components/appbarHome'
import BottomTab from '../../components/bottomTab'
import InputNormal from '../../components/inputNormal';

import { URL, formatRupiah } from '../../utils/global'

function wishlist(props) {
    const [wishlist, setWishlist] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [any, setAny] = useState(true)
    const [search, setSearch] = useState(false)

    const { height, width } = Dimensions.get("window");
    const urlWishlist = URL + "v1/wishlist/me"
    let halaman = props.route.params.title


    useEffect(() => {
        getWishlist()
    }, [])

    const getWishlist = async () => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlWishlist+"?limit=10&offset=0&order_direction=desc", { headers })
            .then(response => response.json())
            .then(responseData => {
                setWishlist(responseData.data)
                setLoading(false)
                setPage(1)
            })
            .catch(e => console.log(e))
    }

    //Pergi ke Hal List Produk
    const detailProduk = (id, name) => {
        props.navigation.navigate('ProdukDetail', { id, title: name })
    }

    const loadMore = async(hal) => {
        setLoading(true)
        
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let pageNow = hal

        let off = 10*pageNow

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlWishlist+"?limit=10&offset="+off+"&order_direction=desc", {headers})
            .then(response => response.json())
            .then(async(responseData) => {
                await setWishlist(wishlist.concat(responseData.data))
                setPage(pageNow++)
                setLoading(false)
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
        getWishlist()
    }

    const searchProduk = async(search) => {
        setLoading(true)
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)
        let param =""
        // let param ="&invoice="+search
        // console.log(urlOrder+"?limit=10&offset="+page+""+param)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlOrder+"?limit=10&offset=0&order_direction=desc"+param, {headers})
            .then(response => response.json())
            .then(async(responseData) => {
                await setOrders(responseData.data)
                setPage(1)
                setLoading(false)
            })
            .catch(e => console.log(e))
    }

    const gotoWishlist = () => {
        props.navigation.navigate("Wishlist", {title:"Produk Saya"})
    }

    // filter if have null object
    const cleanEmpty = obj => {
        if (Array.isArray(obj)) {
            return obj
                .map(v => (v && typeof v === 'object') ? cleanEmpty(v) : v)
                .filter(v => !(v == null));
        } else {
            return Object.entries(obj)
                .map(([k, v]) => [k, v && typeof v === 'object' ? cleanEmpty(v) : v])
                .reduce((a, [k, v]) => (v == null ? a : (a[k] = v, a)), {});
        }
    }
    const nextFilter = cleanEmpty(wishlist).filter(i => i.product ? i : null)
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

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

            <ScrollView style={{ flex: 1, marginTop: 10 }}>

                {cleanEmpty(wishlist) && nextFilter.map((data, index) => {

                    return (

                        <View key={index} style={{ flexDirection: 'row', marginVertical: 10, height: height * 0.18, justifyContent: 'space-between', borderWidth: 1, borderColor: '#ddd', width: '90%', paddingRight: 5, alignSelf: 'center', borderRadius: 20, borderLeftWidth: 0 }}>

                            <Image
                                source={{ uri: data.product && data.product.images[0].image_url }}
                                style={{ height: '100%', width: '30%', borderRadius: 10 }}
                            />

                            <View style={{ width: '68%' }}>
                                <Title style={{ fontSize: 14, lineHeight: 18 }}>{data.product && data.product.name}</Title>
                                <Text style={{ fontSize: 14, marginBottom: height * 0.01 }}>Mulai Dari Rp {data.product ? formatRupiah(data.product.price_basic + data.product.price_benefit + data.product.price_commission) : '0'}</Text>
                                <Text style={{ color: '#949494', fontSize: 12 }}>Stok {data.product && data.product.stock}</Text>
                                <TouchableOpacity style={{ alignItems: 'flex-end', justifyContent: 'flex-end', flex: 1, paddingVertical: 10 }} onPress={() => detailProduk(data.product.id, data.product.name)}>
                                    <Text style={{ color: '#07A9F0' }}>Lihat Produk</Text>
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
                <Loading />
            }

            <BottomTab {...props} />

        </View>
    );
}

export default wishlist;

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