import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

import Appbar from '../../components/appbarHome';
import { ScrollView } from 'react-native-gesture-handler';
function mulaiBerjualan(props) {
    
    const { height, width } = Dimensions.get("window");
    return (
        <View style={{flex:1}}>
            <Appbar params={props}/>

            <ScrollView>
                <View style={[styles.shadow,{padding:15, backgroundColor:'white'}]}>
                    <Text style={{fontSize:16, fontWeight:'bold', marginBottom:height*0.02}}>Mulai Berjualan</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image source={require('../../assets/images/ask.png')} style={{width:width*0.03, height:width*0.04, marginRight:width*0.02}}/>
                        <Text>Bagaimana Cara Memulai Jualan</Text>
                    </View>
                </View>

                <View style={{padding:15, backgroundColor:'white'}}>
                    <Text>1. Klik kategori barang yang ingin kalian jual.</Text>
                    <Image source={require('../../assets/images/bantuanFaq/bantuanJualan1.png')} style={{width:'70%', height:height*0.2, resizeMode:'stretch'}}/>
                </View>

                <View style={{padding:15, backgroundColor:'white'}}>
                    <Text>2.  Pilih produk yang kalian inginkan.</Text>
                    <Image source={require('../../assets/images/bantuanFaq/bantuanJualan2.png')} style={{width:'100%', height:height*0.25, resizeMode:'stretch'}}/>
                </View>

                <View style={{padding:15, backgroundColor:'white'}}>
                    <Text>3.  Kemudian, klik button jual sekarang. Gambar akan langsung terdownload diperangkat kalianserta deskripsi sudah tercopy.</Text>
                    <Image source={require('../../assets/images/bantuanFaq/bantuanJualan4.png')} style={{width:'100%', height:height*0.25, resizeMode:'stretch'}}/>
                </View>

                <View style={{padding:15, backgroundColor:'white'}}>
                    <Text>4.  Step terakhir adalah kalian pilih target customer dan kirim gambar serta deskripsinya. </Text>
                    <Image source={require('../../assets/images/bantuanFaq/bantuanJualan3.png')} style={{width:'100%', height:height*0.25, resizeMode:'stretch'}}/>
                </View>

                <View style={{padding:15, backgroundColor:'white', marginBottom:height*0.1}}>
                    <Text>5.  Tips: Kalian bisa berjualan di Facebook Marketplace dan WhatsApp.</Text>
                    {/* <Image source={require('../../assets/images/bantuanFaq/bantuanJualan3.png')} style={{width:'100%', height:height*0.25, resizeMode:'stretch'}}/> */}
                </View>

            </ScrollView>
        </View>
    );
}

export default mulaiBerjualan;

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