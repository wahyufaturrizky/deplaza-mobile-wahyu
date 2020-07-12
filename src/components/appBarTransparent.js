import React, {useEffect, useState} from 'react';
import { Appbar } from 'react-native-paper';
import { Image, View, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function appbarHome(props) {
    const [haveProduk, setHaveProduk] = useState(false)
    const [wishlist, setWishlist] = useState(0)

    const logoHorizontal = '../assets/images/dplaza2.png'
    let title =""
    

    if(props.params.route!=null){
        title = props.params.route.params.title
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
        alert("ok")
        props.params.navigation.navigate("PesananSaya", {title:"Pesanan Saya"})
    }

    const gotoWishlist = () => {
        props.params.navigation.navigate("Wishlist", {title:"Produk Saya"})
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
                    <Appbar.Action size={30} icon="bell-ring-outline" color={'white'}/>
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