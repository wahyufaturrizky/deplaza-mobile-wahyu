import React from 'react';
import { View, Text, Dimensions, Image } from 'react-native'

import Appbar from '../../components/appbarHome'
import BottomTab from '../../components/bottomTab'
import { TouchableOpacity } from 'react-native-gesture-handler';

function saldoPenjual(props) {

    const { height, width } = Dimensions.get("window");

    const gotoPenarikan = () => {
        props.navigation.navigate('Penarikan',{title:"Penarikan"})      
    }

    return (
        <View style={{flex:1}}>
            <Appbar params={props}/>
            <View style={{justifyContent:'center', alignItems:'center', padding:30, backgroundColor:'#93DCFC'}}>
                <Text style={{marginBottom:height*0.01}}>Saldo</Text>
                <Text style={{marginBottom:height*0.01, fontSize:width*0.05, fontWeight:'bold', color:'#0A56C3'}}>Rp. 21.000</Text>
            </View>

            <View style={{flex:1, flexDirection:'row', justifyContent:'space-around', padding:15}}>
                <View style={{backgroundColor:'white', padding:20, width:width*0.4, height:height*0.18}}>
                    <TouchableOpacity onPress={gotoPenarikan} style={{justifyContent:'center', alignItems:'center'}}>
                        <Image 
                            source={require('../../assets/images/penarikan.png')}
                            style={{width:width*0.15, height:width*0.2,marginBottom:height*0.01}}
                        />
                        <Text>Penarikan</Text>
                    </TouchableOpacity>
                </View>

                <View style={{backgroundColor:'white', padding:20, width:width*0.4, height:height*0.18}}>
                    <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}>
                        <Image 
                            source={require('../../assets/images/transaksi.png')}
                            style={{width:width*0.2,height:width*0.2,marginBottom:height*0.01}}
                        />
                        <Text>Transaksi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default saldoPenjual;