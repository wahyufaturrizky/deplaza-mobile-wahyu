/* eslint-disable */

import React, {useEffect, useState} from 'react';
import { Appbar } from 'react-native-paper';
import { Image, View, StyleSheet, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function appbarHome(props) {
    const [haveProduk, setHaveProduk] = useState(false)
    const [wishlist, setWishlist] = useState(0)

    const logoHorizontal = '../assets/images/dplaza2.png'
    let title =""
    let notif =0
    

    if(props.params.route!=null){
        title = props.params.route.params.title
    }


    if(props.notif!=null){
        notif = props.notif
        console.log(props)
    }


    // console.log(props.params.route.params)

    // console.log(props)

    useEffect(() => {
        if(props.wishlist > 0){
            console.log(props.wishlist)
            setWishlist(props.wishlist)
            setHaveProduk(true)
        }
    },[])

    const gotoPesanan = () => {
        props.params.navigation.navigate("PesananSaya", {title:"Pesanan Saya"})
    }

    const gotoNotifikasi = () => {
        props.params.navigation.navigate("Notifikasi", {title:"Notifikasi"})
    }

    const { height, width } = Dimensions.get("window");

    return (
        <Appbar.Header style={[styles.shadow,{backgroundColor:'transparent', width:'100%', height:70, zIndex: 1, position:'absolute', top:0}]}>

                <Image 
                    source={require(logoHorizontal)}
                    style={{width:170, height:45}}
                    width={180}
                    height={45}
                />

                <Appbar.Content/>

                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={gotoPesanan}>
                        <Appbar.Action size={30} icon="cart" color={'white'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={gotoNotifikasi}>
                        <View style={{flexDirection:'row'}}>
                            <Appbar.Action size={30} icon="bell-ring-outline" color={'white'}/>
                            <Text style={{color:'white', fontSize:10, marginLeft:-25, height:25, opacity:0.8, borderRadius:20, fontWeight:'bold', padding:5, backgroundColor:'red'}}>{notif}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

        </Appbar.Header>
    );
}

export default appbarHome;

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