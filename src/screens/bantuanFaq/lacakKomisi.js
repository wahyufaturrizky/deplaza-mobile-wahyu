import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

import Appbar from '../../components/appbarHome';
import { ScrollView } from 'react-native-gesture-handler';

function lacakKomisi(props) {
    
    const { height, width } = Dimensions.get("window");
    return (
        <View style={{flex:1}}>
            <Appbar params={props}/>

            <ScrollView>
                <View style={[styles.shadow,{padding:15, backgroundColor:'white'}]}>
                    <Text style={{fontSize:16, fontWeight:'bold', marginBottom:height*0.02}}>Lacak Komisi</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image source={require('../../assets/images/ask.png')} style={{width:width*0.03, height:width*0.04, marginRight:width*0.02}}/>
                        <Text>Bagaimana cara untuk mengetahui jumlah komisi perproduk yang kalian dapatkan</Text>
                    </View>
                </View>

                <View style={{padding:15, backgroundColor:'white'}}>
                    <Text>1.  Masuk ke page Home, kemudian klik button Pesanan Saya.</Text>
                </View>

                <View style={{padding:15, backgroundColor:'white'}}>
                    <Text style={{marginBottom:height*0.01}}>2.  Kalian bisa lihat jumlah komisi yang kalian dapatkan di page pesanan saya.</Text>
                    <Image source={require('../../assets/images/bantuanFaq/lacakKomisi.png')} style={{width:'100%', height:height*0.25, resizeMode:'stretch'}}/>
                </View>

            </ScrollView>
        </View>
    );
}

export default lacakKomisi;

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