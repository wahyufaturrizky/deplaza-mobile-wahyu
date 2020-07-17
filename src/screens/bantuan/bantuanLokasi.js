import React from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

import Appbar from '../../components/appbarHome';
import { ScrollView } from 'react-native-gesture-handler';

function bantuanLokasi(props) {

    const { height, width } = Dimensions.get("window");
    return (
        <View style={{flex:1}}>
           <Appbar params={props}/>
            
                <ScrollView>

                    <View style={{alignItems:'center', flex:1}}>

                        <Image
                            source={require('../../assets/images/location.png')}
                            style={{width:width*0.2, height:width*0.2, resizeMode:'stretch', marginBottom:height*0.02}}
                        />
                        <View style={{alignItems:'center', width:'90%', alignSelf:'center'}}>
                            <Text style={{fontSize:26, fontWeight:'bold', marginBottom:height*0.02, textAlign:'center'}}>Lokasi Anda Belum Tepat ?</Text>  
                        </View>

                        <View>
                            <Image 
                                source={require('../../assets/images/caraLokasi.png')}
                                style={{width:width*0.5, alignSelf:'center', }}
                            />
                        </View>

                        <View>
                            <TouchableOpacity>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                                    style={{padding:height*0.01, flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderRadius:10}}
                                >
                                    <Image 
                                        source={require('../../assets/images/aplikasi.png')}
                                        style={{height:12, width:12, alignSelf:'center', }}
                                    />
                                    <Text style={{fontSize:14, textAlign:'center', color:'white', marginLeft:width*0.01}}>
                                        Aplikasi ini
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity onPress={() => changeBantu(1)}>
                                <ImageBackground source={require('../../assets/images/aplikasiFoto.png')} style={{justifyContent:'flex-end', padding:20, alignItems:'center', marginVertical:height*0.005, height:height*0.2}}>
                                    <Text style={{color:'white', marginVertical:5, fontSize:14, textAlign:'center'}}>Klik Trik Disini</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    
                    </View>
                    
                </ScrollView>

        </View>
    );
}

export default bantuanLokasi;