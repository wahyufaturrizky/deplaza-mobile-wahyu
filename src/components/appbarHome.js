/* eslint-disable */

import React, {useEffect, useState} from 'react';
import { Appbar } from 'react-native-paper';
import { Image, View, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
        props.params.navigation.navigate("PesananSaya", {title:"Pesanan Saya"})
    }

    const gotoWishlist = () => {
        props.params.navigation.navigate("Wishlist", {title:"Produk Saya"})
    }

    const { height, width } = Dimensions.get("window");

    return (
        <Appbar.Header style={[styles.shadow,{backgroundColor:(wishlist>0) ? 'transparent' :'white', width:'100%', height:(wishlist>0) ? 70 :70, position:(wishlist>0) ? 'absolute' : 'relative', top:0}]}>

            { (title!=="Home" && title!=="Jualan Anda" && title!=="Pesanan Saya") &&
                <Appbar.BackAction onPress={() => {props.params.navigation.goBack()}} />
            }

            { (title==="Home" || title==="Jualan Anda") &&
                <Image 
                    source={require(logoHorizontal)}
                    style={{width:170, height:45, resizeMode: 'contain', marginBottom: 10}}
                    width={180}
                    height={45}
                />
            }

            { (title!=="Home" && title!=="Jualan Anda") ?
                <Appbar.Content titleStyle={{fontSize:14}} title={title}/>
            :
                <Appbar.Content/>
            }

            {title==="Home" &&
                <Appbar.Action size={30} icon="bell-ring-outline"/>
            }

         

            {title!=="Home" && 
                ((title==="Jualan Anda" && haveProduk) ?
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={gotoPesanan}>
                            <Appbar.Action size={30} icon="cart" color={(haveProduk) ? 'white' :'black'}/>
                        </TouchableOpacity>
                        <Appbar.Action size={30} icon="bell-ring-outline" color={(haveProduk) ? 'white' :'black'}/>
                    </View>
                :
                    <View style={{flexDirection:'row'}}>
                        <Appbar.Action size={30} icon="magnify"/>
                        <TouchableOpacity onPress={gotoWishlist}>
                            <Appbar.Action size={30} icon="heart"/>
                        </TouchableOpacity>
                    </View>
                )
            }

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