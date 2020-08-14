/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'
import Loading from '../../components/loading'
import { ScrollView } from 'react-native-gesture-handler';
import { Title, } from 'react-native-paper';

import Appbar from '../../components/appbarHome'
import BottomTab from '../../components/bottomTab'

import { URL, formatRupiah } from '../../utils/global'

function wishlist(props) {
    const [wishlist, setWishlist] = useState([])
    const [loading, setLoading] = useState(true)

    const { height, width } = Dimensions.get("window");
    const urlWishlist = URL + "v1/wishlist/me"

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

        fetch(urlWishlist, { headers })
            .then(response => response.json())
            .then(responseData => {
                setWishlist(responseData.data)
                setLoading(false)
            })
            .catch(e => console.log(e))
    }

    //Pergi ke Hal List Produk
    const detailProduk = (id, name) => {
        props.navigation.navigate('ProdukDetail', { id, title: name })
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

            <Appbar params={props} />

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

            </ScrollView>
            {loading &&
                <Loading />
            }

            <BottomTab {...props} />

        </View>
    );
}

export default wishlist;