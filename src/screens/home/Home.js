/* eslint-disable */

import React,{useEffect, useRef, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {name as app_name, version as app_version}  from '../../../package.json';
import VersionCheck from 'react-native-version-check';

//Untuk Linear Gradient
import LinearGradient from 'react-native-linear-gradient'

//Untuk Header Var
import Appbar from '../../components/appbarHome'

//Untuk Bottom Bar
import BottomTab from '../../components/bottomTab'

function Home(props) {
    useEffect(() => {
        getVersion()
    }, [])
    const logoStore = '../../assets/images/store.png'
    const { height, width } = Dimensions.get("window");

    //Pergi ke Hal Jualan Anda
    const mulaiJualan = () => {
        props.navigation.navigate('JualanAnda',{title:'Jualan Anda'})      
    }
    const getVersion = () => {
        VersionCheck.getLatestVersion({
            provider: 'playStore'  // for Android
          })
          .then(latestVersion => {
            console.log(latestVersion);    // 0.1.2
          });
  }
    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Appbar params={props}/>
            
            <View style={{backgroundColor:'blue'}}>
                <Image
                    source={require('../../assets/images/banner-home.png')}
                    style={{width:width*1, height:height*0.3, alignSelf: 'stretch',}}
                    width={width*1}
                    height={height*0.3}
                />
            </View>

            <View style={{width:'80%',marginTop:height*0.08, alignSelf:'center', flex:1}}>
                <Image 
                    source={require(logoStore)}
                    style={{width:80, height:80, alignSelf:'center'}}
                />
                <Text style={{fontWeight:"bold", textAlign:'center', fontSize:18, marginBottom:10}}>Mari Bergabung!</Text>
                <Text style={{textAlign:'center' , fontSize:14}}>Klik Tombol Di Bawah ini Untuk Ikut</Text>
                <Text style={{textAlign:'center' , fontSize:14, marginBottom:height*0.01}}>Bergabung Menjadi Reseller</Text>
            </View>

            <TouchableOpacity  onPress={mulaiJualan} style={{width:'90%', alignSelf:'center', marginBottom:height*0.01}}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                    style={{padding:15, borderRadius:10}}
                >
                    <Text style={{fontSize:24, textAlign:'center', color:'white'}}>
                        Mulai Jualan Anda
                    </Text>
                </LinearGradient>
            </TouchableOpacity>

            <BottomTab {...props}/>

            

        </View>
    );
}

export default Home;