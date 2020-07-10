import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import {URL} from '../../utils/global'

import Appbar from '../../components/appbarHome'
import BottomTab from '../../components/bottomTab'
import Loading from '../../components/loading'
import { TouchableOpacity } from 'react-native-gesture-handler';

function Kategori(props) {
    const [kategori,setKategori] = useState([])
    const [loading,setLoading] = useState([true])

    const { height, width } = Dimensions.get("window");
    const urlWishlist = URL+"v1/category" 

    useEffect(() => {
        getKategori()
    }, [])

    const listProduk = (title, idKategori) => {
        props.navigation.navigate('Produk',{title, idKategori})      
    }

    const getKategori = async() => {
        const value = await AsyncStorage.getItem('data');
        const data = JSON.parse(value)

        let headers = {
            Authorization: `Bearer ${data.token}`,
            'Access-Control-Allow-Origin': '*',
        }

        fetch(urlWishlist, {headers})
            .then(response => response.json())
            .then(responseData => {
                setLoading(false)
                let totalData = responseData.data.length
                console.log(totalData)
                setKategori(responseData.data)
            })
            .catch(e => console.log(e))
    }

    return (
       <View style={{flex:1}}>
           <Appbar params={props}/>
           <View style={{backgroundColor:'white', padding:15, flexWrap:"wrap",  flex:1, alignItems:'center', flexDirection:'row'}}>
               
               {kategori.map((data,i) => (
                <View key={i} style={[styles.shadow,{width:'30%', height:height*0.2, marginVertical:height*0.01, borderRadius:10, padding:2, }]}>
                    <TouchableOpacity onPress={() => {listProduk("Produk Kategori "+data.name,data.id)}} style={{width:'100%', alignItems:'center'}}>
                        <Image
                            source={{uri:data.image_url}}
                            style={{width:'100%', resizeMode:'cover', height:height*0.17, borderBottomRightRadius:0, borderBottomLeftRadius:0, borderTopLeftRadius:10, borderTopRightRadius:10}}
                        />
                        <Text style={{textAlign:'center'}}>{data.name}</Text>
                    </TouchableOpacity>
                </View>
               ))}

           </View>
            {loading &&
                <Loading/>
            }
           <BottomTab {...props}/>


       </View>
    );
}

export default Kategori;

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