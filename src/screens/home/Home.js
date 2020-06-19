import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native'

//Untuk Linear Gradient
import LinearGradient from 'react-native-linear-gradient'

//Untuk Video
import Video from 'react-native-video'

//Untuk Header Var
import Appbar from '../../components/appbarHome'

//Untuk Bottom Bar
import BottomTab from '../../components/bottomTab'

function Home(props) {
    const logoStore = '../../assets/images/store.png'

    //Pergi ke Hal Jualan Anda
    const mulaiJualan = () => {
        props.navigation.navigate('JualanAnda')      
    }

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Appbar/>
            <Video 
                source={{uri:'../../assets/video/babastudio.mp4'}}  
                style={{width:'100%', height:300}} />

            <View style={{width:'80%', alignSelf:'center', flex:1}}>
                <Image 
                    source={require(logoStore)}
                    style={{width:100, height:100, alignSelf:'center'}}
                />
                <Text style={{fontWeight:"bold", textAlign:'center', fontSize:22, marginBottom:10}}>Mari Bergabung!</Text>
                <Text style={{textAlign:'center' , fontSize:22}}>Klik Tombol Di Bawah ini Untuk Ikut</Text>
                <Text style={{textAlign:'center' , fontSize:22, marginBottom:10}}>Bergabung Menjadi Reseller</Text>
            </View>

            <TouchableOpacity  onPress={mulaiJualan} style={{width:'90%', alignSelf:'center', marginBottom:20}}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0956C6', '#0879D8', '#07A9F0']}
                    style={{padding:30, borderRadius:10}}
                >
                    <Text style={{fontSize:24, textAlign:'center', color:'white'}}>
                        Mulai Jualan Anda
                    </Text>
                </LinearGradient>
            </TouchableOpacity>

            <BottomTab/>

        </View>
    );
}

export default Home;