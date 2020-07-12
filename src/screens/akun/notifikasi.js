import React,{useState} from 'react';
import { View, Text, Dimensions, StyleSheet, } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Appbar from '../../components/appbarHome'
function notifikasi(props) {
    const [modal, setModal] = useState(false)

    const { height, width } = Dimensions.get("window");

    const modalTrigger = () =>{
        setModal(!modal)
    }
    return (
        <View style={{flex:1}}>
            <Appbar params={props}/>
            <ScrollView style={{backgroundColor:'white'}}>
                <View style={{width:'90%', alignSelf:'center', paddingVertical:10}}>
                    <Text style={{fontWeight:'bold', marginBottom:height*0.01}}>20 May 2020, 11:42 AM</Text>
                    <Text style={{marginBottom:height*0.02}}>
                        Total rp. 87.000 telah di proses ke rekening Anda pada 20 May 2020. Ini akan tercermin di rekening Bank Anda dalam 2 - 3 hari kerja.
                    </Text>
                    <TouchableOpacity style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
                        <Text style={{color:'#07A9F0'}}>Lihat Lebih Banyak</Text>
                    </TouchableOpacity>
                </View>

                <View style={{borderTopWidth:1, borderColor:'#D5D5D5', marginVertical:height*0.01}}></View>

                <View style={{width:'90%', alignSelf:'center', paddingVertical:10}}>
                    <Text style={{fontWeight:'bold', marginBottom:height*0.01}}>20 May 2020, 11:42 AM</Text>
                    <Text style={{marginBottom:height*0.02}}>
                        Total rp. 87.000 telah di proses ke rekening Anda pada 20 May 2020. Ini akan tercermin di rekening Bank Anda dalam 2 - 3 hari kerja.
                    </Text>
                    <TouchableOpacity onPress={modalTrigger} style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
                        <Text style={{color:'#07A9F0'}}>Lihat Lebih Banyak</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{borderTopWidth:1, borderColor:'#D5D5D5', marginVertical:height*0.01}}></View>
            </ScrollView>

            { modal &&
            <View style={{position:'absolute', flex:1, zIndex:1, width:width, height:height, bottom:0, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'center', alignItems:'center'}}>
                    <View style={[styles.shadow,{alignSelf:'center', width:width*0.8, backgroundColor:'rgba(255,255,255,1)', padding:15}]}>
                        <Text style={{fontSize:16, fontWeight:'bold', marginBottom:height*0.01}}>20 May 2020, 11:42 AM</Text>
                        <Text style={{fontSize:14, marginBottom:height*0.01}}>Total Rp. 87.000 telah di proses ke rekening Anda pada 20 May 2020. Ini akan tercermin di rekening Bank Anda dalam 2 - 3 hari kerja.</Text>
                        <View style={{marginBottom:height*0.01}}>
                            <Text>Uang Masuk:</Text>
                            <Text>#ID17491480 - Rp. 30.000</Text>
                            <Text>#ID17491480 - Rp. 30.000</Text>
                            <Text>#ID17491480 - Rp. 30.000</Text>
                            <Text>#ID17491480 - Rp. 30.000</Text>
                            <Text>#ID17491480 - Rp. 30.000</Text>
                            <Text>#ID17491480 - Rp. 30.000</Text>
                        </View>

                        <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={modalTrigger}>
                            <Text style={{fontSize:14, color:'#07A9F0'}}>Tutup</Text>
                        </TouchableOpacity>
                        
                    </View>
            </View>
            }
            
        </View>
    );
}

export default notifikasi;

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
    },
    shadowBlue : {
        shadowColor: "#07A9F0",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        
        elevation: 22,
    }
})