import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import InputNormal from '../../components/inputNormal';
import { TouchableOpacity } from 'react-native-gesture-handler';

function bantuanFaqDetail(props) {

    const { height, width } = Dimensions.get("window");

    const gotoMulaiJualan = () => {
        props.navigation.navigate("MulaiBerjualan", {title:"Bantuan Mulai Jualan"})
    }

    const gotoCaraPembayaran = () => {
        props.navigation.navigate("CaraPembayaran", {title:"Cara Pembayaran"})
    }

    const gotoLacakKomisi = () => {
        props.navigation.navigate("LacakKomisi", {title:"Lacak Komisi"})
    }

    const gotoBagikanProduk = () => {
        props.navigation.navigate("BagikanProduk", {title:"Bagikan Produk"})
    }

    const gotoReturKembali = () => {
        props.navigation.navigate("ReturKembali", {title:"Retur dan Kembalikan"})
    }
    
    return (
    <View style={{flex:1}}>

        <View style={{backgroundColor:'#F8F8F8', marginTop:height*0.01, flex:1}}>
            <View style={{flexDirection:'row', width:'90%', alignSelf:'center', padding:5, borderWidth:1, borderColor:'gray', borderRadius:10, justifyContent:'flex-start', alignItems:'center'}}>
                <Icon name="magnify" size={20} style={{marginRight:width*0.01, marginLeft:width*0.01}}/>
                <InputNormal
                    placeholder="Cari FAQ"
                />
            </View>

            <TouchableOpacity onPress={gotoMulaiJualan}>
                <View style={[styles.shadow,{backgroundColor:'white', marginTop:height*0.02, padding:20, flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}]}>
                    <Image 
                        source={require('../../assets/images/store2.png')}
                        style={{width:width*0.08, height:width*0.08, marginRight:width*0.02}}
                    />
                    <Text style={{fontSize:16}}>Mulai Berjualan</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={gotoCaraPembayaran}>
                <View style={[styles.shadow,{backgroundColor:'white', marginTop:height*0.02, padding:20, flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}]}>
                    <Image 
                        source={require('../../assets/images/bill2.png')}
                        style={{width:width*0.07, height:width*0.08, marginRight:width*0.02}}
                    />
                    <Text style={{fontSize:16}}>Cara pembayaran pembelian barang</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={gotoLacakKomisi}>
                <View style={[styles.shadow,{backgroundColor:'white', marginTop:height*0.02, padding:20, flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}]}>
                    <Image 
                        source={require('../../assets/images/newsletter.png')}
                        style={{width:width*0.07, height:width*0.08, marginRight:width*0.02}}
                    />
                    <Text style={{fontSize:16}}>Lacak komisi</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={gotoBagikanProduk}>
                <View style={[styles.shadow,{backgroundColor:'white', marginTop:height*0.02, padding:20, flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}]}>
                    <Image 
                        source={require('../../assets/images/delivery_box.png')}
                        style={{width:width*0.08, height:width*0.08, marginRight:width*0.02}}
                    />
                    <Text style={{fontSize:16}}>Temukan produk untuk dibagikan</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={gotoReturKembali}>
                <View style={[styles.shadow,{backgroundColor:'white', marginTop:height*0.02, padding:20, flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}]}>
                    <Image 
                        source={require('../../assets/images/exchange.png')}
                        style={{width:width*0.08, height:width*0.08, marginRight:width*0.02}}
                    />
                    <Text style={{fontSize:16}}>Retur dan kembalikan</Text>
                </View>
            </TouchableOpacity>

        </View>

    </View>
    );
}

export default bantuanFaqDetail;

const styles=StyleSheet.create({
    shadow : {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 1.41,

        elevation: 8,
    }
})