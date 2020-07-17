import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

import Appbar from '../../components/appbarHome';
import { ScrollView } from 'react-native-gesture-handler';

function caraPembayaran(props) {
    
    const { height, width } = Dimensions.get("window");
    return (
        <View style={{flex:1}}>
            <Appbar params={props}/>

            <ScrollView>
                <View style={[styles.shadow,{padding:15, backgroundColor:'white'}]}>
                    <Text style={{fontSize:16, fontWeight:'bold', marginBottom:height*0.02}}>Cara pembayaran pembelian barang</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image source={require('../../assets/images/ask.png')} style={{width:width*0.03, height:width*0.04, marginRight:width*0.02}}/>
                        <Text>Bagaimana cara pembayaran</Text>
                    </View>
                </View>

                <View style={{padding:15, backgroundColor:'white'}}>
                    <Text style={{marginVertical:height*0.01}}>DePlaza memiliki dua metode pembayaran pembelian barang:</Text>
                    <Text style={{fontWeight:'bold'}}>1. COD (Cash on Delivery)</Text>
                    <Text>Pembayaran dilakukan saat barang telah sampai ke customer melalui kurir.</Text>
                </View>

                <View style={{padding:15, backgroundColor:'white', marginBottom:height*0.1}}>
                    <Text style={{fontWeight:'bold'}}>2. Transfer Bank</Text>
                    <Text style={{marginBottom:height*0.01}}>Pembayaran dilakukan dengan membayarkan ke rekening Bank dePlaza.</Text>
                    <Text style={{marginBottom:height*0.01}}>Kemudian jika sudah transfer maka silahkan upload bukti transfernya pada bagian seperti berikut ini:</Text>
                    <Image source={require('../../assets/images/bantuanFaq/caraPembayaran1.png')} style={{width:'100%', height:height*0.25, marginBottom:height*0.01, resizeMode:'stretch'}}/>
                    <Text style={{marginBottom:height*0.01}}>Jika sudah upload silahkan menunggu untuk dikonfirmasi oleh admin dePlaza.</Text>
                    <Image source={require('../../assets/images/bantuanFaq/caraPembayaran2.png')} style={{width:'100%', height:height*0.25, marginBottom:height*0.01, resizeMode:'stretch'}}/>
                </View>

            </ScrollView>
        </View>
    );
}

export default caraPembayaran;

const styles=StyleSheet.create({
    shadow : {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 1.41,

        elevation: 2,
    }
})