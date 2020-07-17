import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

import Appbar from '../../components/appbarHome';
import { ScrollView } from 'react-native-gesture-handler';

function bagikanProduk(props) {
    
    const { height, width } = Dimensions.get("window");
    return (
        <View style={{flex:1}}>
            <Appbar params={props}/>

            <ScrollView>
                <View style={[styles.shadow,{padding:15, backgroundColor:'white'}]}>
                    <Text style={{fontSize:16, fontWeight:'bold', marginBottom:height*0.02}}>Temukan Produk untuk dibagikan</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image source={require('../../assets/images/ask.png')} style={{width:width*0.03, height:width*0.04, marginRight:width*0.02}}/>
                        <Text>Bagaimana caranya menemukan produk untuk dibagikan</Text>
                    </View>
                </View>

                <View style={{padding:15, backgroundColor:'white'}}>
                    <Text>1.  Masuk ke page Home, kemudian klik button Kategori.</Text>
                </View>

                <View style={{padding:15, backgroundColor:'white'}}>
                    <Text>2.  Kemudian kalian klik kategori yang diinginkan, cari produknya.</Text>
                </View>

                <View style={{padding:15, backgroundColor:'white'}}>
                    <Text>3.  Selanjutnya klik produk yang kalian inginkan dan klik button Jual sekarang</Text>
                    <Image source={require('../../assets/images/bantuanFaq/lacakKomisi.png')} style={{width:'100%', height:height*0.25, resizeMode:'stretch'}}/>
                </View>

                <View style={[styles.shadow,{padding:15, backgroundColor:'white'}]}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image source={require('../../assets/images/ask.png')} style={{width:width*0.03, height:width*0.04, marginRight:width*0.02}}/>
                        <Text>Bagaimana caranya menemukan produk untuk dibagikan</Text>
                    </View>
                </View>

                <View style={{padding:15, backgroundColor:'white'}}>
                    <Text style={{marginBottom:height*0.01}}>1.  Pertama, jika kalian ingin mengecek ketersediaan stok di produk yang kalian tandai kalian klik button Produk Saya di page Home.</Text>
                    <Text style={{marginBottom:height*0.01}}>Kemudain kalian bisa langsung melihat stok dibagian informasi produk.</Text>
                    <Image source={require('../../assets/images/bantuanFaq/lacakKomisi.png')} style={{width:'100%', height:height*0.25, resizeMode:'stretch'}}/>
                </View>

                <View style={{padding:15, backgroundColor:'white'}}>
                    <Text style={{marginBottom:height*0.01}}>2.  Kedua, jika kalian ingin mengecek ketersediaan stok di produk yang lain selain yang kalian tandai.</Text>
                    <Text style={{marginBottom:height*0.01}}>Kalian klik button Kategori di bagian page Home, lalu cari produk yang kalian ingin ketahui jumlah stoknya. Kemudian diinformasi produk stok barang sudah bisa kalian lihat.</Text>
                    <Image source={require('../../assets/images/bantuanFaq/lacakKomisi.png')} style={{width:'100%', height:height*0.25, resizeMode:'stretch'}}/>
                </View>

                <View style={{padding:15, backgroundColor:'white'}}>
                    <Text style={{marginBottom:height*0.01}}>3.  Jika stok habis maka kalian akan mendapatkan notifikasi untuk ketersediaan stok pada produk yang sudah kalian tandai.</Text>
                </View>

            </ScrollView>
        </View>
    );
}

export default bagikanProduk;

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